import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import PageHeader from "../components/PagesHeader";
import Modal from "../components/Modal";
import InputField from "../components/InputField";
import Alert from "../components/Alert";

// Helper for Tier & Discount calculation
const getDiscountInfo = (role, points) => {
  if (role !== "member") return { tier: "None", discount: 0 };
  const pts = parseInt(points) || 0;
  if (pts >= 10000) return { tier: "Platinum", discount: 0.20 };
  if (pts >= 5000) return { tier: "Gold", discount: 0.15 };
  if (pts >= 1000) return { tier: "Silver", discount: 0.10 };
  return { tier: "Bronze", discount: 0.05 };
};

const determineTier = (points) => {
  const pts = parseInt(points) || 0;
  if (pts >= 10000) return "Platinum";
  if (pts >= 5000) return "Gold";
  if (pts >= 1000) return "Silver";
  return "Bronze";
};

export default function Orders() {
  const { profile } = useAuth();
  const isAdmin = profile?.role === "admin";

  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Form states
  // Form states
  const [currentOrder, setCurrentOrder] = useState(null);
  const [formData, setFormData] = useState({
    customerId: "",
    totalOriginal: "",
  });

  // Calculate discount dynamically
  const [selectedCustomerInfo, setSelectedCustomerInfo] = useState(null);
  const [calculatedDiscount, setCalculatedDiscount] = useState({ tier: "None", discount: 0, amount: 0, final: 0 });

  const fetchOrders = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("orders")
        .select(`
          *,
          profiles:customer_id (
            id,
            full_name,
            role,
            points,
            tier
          )
        `)
        .order("created_at", { ascending: false });

      // If user is member, filter orders to their own
      if (profile?.role === "member") {
        query = query.eq("customer_id", profile.id);
      }

      const { data, error: fetchErr } = await query;
      if (fetchErr) throw fetchErr;
      setOrders(data || []);
    } catch (err) {
      setError("Gagal memuat pesanan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      const { data, error: custErr } = await supabase
        .from("profiles")
        .select("*")
        .in("role", ["member", "guest"])
        .order("full_name");
      if (custErr) throw custErr;
      setCustomers(data || []);
    } catch (err) {
      console.error("Error fetching customers for select:", err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
    if (isAdmin) {
      fetchCustomers();
    }
  }, [profile]);

  // Recalculate discount details when customer or original price changes
  useEffect(() => {
    let customer = null;
    if (isAdmin) {
      customer = customers.find((c) => c.id === formData.customerId) || null;
    } else {
      customer = profile; // member locks customer to themselves
    }

    setSelectedCustomerInfo(customer);

    const original = parseFloat(formData.totalOriginal) || 0;
    if (customer) {
      const info = getDiscountInfo(customer.role, customer.points);
      const discountAmount = original * info.discount;
      const finalPrice = original - discountAmount;
      setCalculatedDiscount({
        tier: info.tier,
        discount: info.discount,
        amount: discountAmount,
        final: finalPrice,
      });
    } else {
      setCalculatedDiscount({
        tier: "None",
        discount: 0,
        amount: 0,
        final: original,
      });
    }
  }, [formData.customerId, formData.totalOriginal, customers, profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const customerId = isAdmin ? formData.customerId : profile.id;
    const original = parseFloat(formData.totalOriginal) || 0;

    if (isAdmin && !customerId) {
      setError("Silakan pilih customer");
      return;
    }

    try {
      // Insert new order
      const { data, error: insertErr } = await supabase
        .from("orders")
        .insert([
          {
            customer_id: customerId || null,
            total_original: original,
            total_discount: calculatedDiscount.amount,
            total_final: calculatedDiscount.final,
            status: "pending",
          },
        ])
        .select();

      if (insertErr) throw insertErr;

      setSuccess("Pesanan baru berhasil dicatat!");
      setIsAddModalOpen(false);
      setFormData({ customerId: "", totalOriginal: "" });
      fetchOrders();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Gagal mencatat pesanan: " + err.message);
    }
  };

  // Inline Admin status update handler
  const handleInlineStatusChange = async (order, newStatusValue) => {
    setError("");
    setSuccess("");

    const prevStatus = order.status;
    const finalPrice = parseFloat(order.total_final);
    const customer = order.profiles;

    try {
      // Update order status
      const { error: updateErr } = await supabase
        .from("orders")
        .update({ status: newStatusValue })
        .eq("id", order.id);

      if (updateErr) throw updateErr;

      // Handle Points adjustment if customer is a member
      if (customer && customer.role === "member") {
        let pointsDiff = 0;
        const pointsAwarded = Math.floor(finalPrice / 10000);

        if (prevStatus !== "completed" && newStatusValue === "completed") {
          pointsDiff = pointsAwarded;
        } else if (prevStatus === "completed" && newStatusValue !== "completed") {
          pointsDiff = -pointsAwarded;
        }

        if (pointsDiff !== 0) {
          const currentPoints = customer.points || 0;
          const newPoints = Math.max(0, currentPoints + pointsDiff);
          const newTier = determineTier(newPoints);

          await supabase
            .from("profiles")
            .update({ points: newPoints, tier: newTier })
            .eq("id", customer.id);
        }
      }

      setSuccess("Status pesanan berhasil diperbarui!");
      fetchOrders();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Gagal memperbarui status: " + err.message);
    }
  };



  const handleDeleteClick = (order) => {
    setCurrentOrder(order);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setError("");
    setSuccess("");

    try {
      // If we delete a completed order, we should deduct points from the customer
      if (currentOrder.status === "completed" && currentOrder.profiles && currentOrder.profiles.role === "member") {
        const finalPrice = parseFloat(currentOrder.total_final);
        const pointsDeducted = Math.floor(finalPrice / 10000);
        const newPoints = Math.max(0, (currentOrder.profiles.points || 0) - pointsDeducted);
        const newTier = determineTier(newPoints);

        await supabase
          .from("profiles")
          .update({ points: newPoints, tier: newTier })
          .eq("id", currentOrder.profiles.id);
      }

      const { error: deleteErr } = await supabase
        .from("orders")
        .delete()
        .eq("id", currentOrder.id);

      if (deleteErr) throw deleteErr;

      setSuccess("Pesanan berhasil dihapus!");
      setIsDeleteModalOpen(false);
      fetchOrders();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Gagal menghapus pesanan: " + err.message);
    }
  };

  return (
    <div id="dashboard-container" className="mt-6">
      <PageHeader title="Orders" breadcrumb="Sales Report">
        <button
          onClick={() => {
            setFormData({ customerId: "", totalOriginal: "" });
            setIsAddModalOpen(true);
          }}
          className="px-5 py-2.5 bg-hijau hover:bg-emerald-600 text-white rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md"
        >
          + Create Order
        </button>
      </PageHeader>

      {error && <div className="mb-4"><Alert type="danger">{error}</Alert></div>}
      {success && <div className="mb-4"><Alert type="success">{success}</Alert></div>}

      <div className="mt-6 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 font-semibold text-gray-600">Order ID</th>
                <th className="p-4 font-semibold text-gray-600">Customer Name</th>
                <th className="p-4 font-semibold text-gray-600 text-center">Status</th>
                <th className="p-4 font-semibold text-gray-600 text-right">Original Price</th>
                <th className="p-4 font-semibold text-gray-600 text-right">Discount</th>
                <th className="p-4 font-semibold text-gray-600 text-right">Final Price</th>
                <th className="p-4 font-semibold text-gray-600 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-500 font-medium">
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors">
                    <td className="p-4 text-xs font-mono text-gray-400">{order.id.slice(0, 8)}...</td>
                    <td className="p-4 text-sm text-gray-600 font-medium">
                      {order.profiles?.full_name || "Guest / Walk-in"}
                      {order.profiles?.role === "member" && (
                        <span className="text-[10px] text-hijau bg-emerald-50 px-2 py-0.5 rounded-full ml-2 font-bold uppercase">
                          {order.profiles.tier}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-sm text-center">
                      {isAdmin ? (
                        <select
                          value={order.status}
                          onChange={(e) => handleInlineStatusChange(order, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-bold capitalize outline-none cursor-pointer border ${
                            order.status === "completed" ? "bg-green-50 text-green-700 border-green-200 focus:border-green-400" :
                            order.status === "pending" ? "bg-blue-50 text-blue-700 border-blue-200 focus:border-blue-400" : "bg-red-50 text-red-700 border-red-200 focus:border-red-400"
                          }`}
                        >
                          <option value="pending" className="bg-white text-gray-800">Pending</option>
                          <option value="completed" className="bg-white text-gray-800">Completed</option>
                          <option value="cancelled" className="bg-white text-gray-800">Cancelled</option>
                        </select>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                          order.status === "completed" ? "bg-green-100 text-green-600" :
                          order.status === "pending" ? "bg-blue-100 text-blue-600" : "bg-red-100 text-red-600"
                        }`}>
                          {order.status}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-sm text-right font-semibold text-gray-500">
                      Rp {parseFloat(order.total_original).toLocaleString("id-ID")}
                    </td>
                    <td className="p-4 text-sm text-right font-semibold text-red-500">
                      -Rp {parseFloat(order.total_discount).toLocaleString("id-ID")}
                    </td>
                    <td className="p-4 text-sm text-right font-bold text-gray-800">
                      Rp {parseFloat(order.total_final).toLocaleString("id-ID")}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-2">
                        {isAdmin ? (
                          <>
                            <button
                              onClick={() => handleDeleteClick(order)}
                              className="px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                            >
                              Delete
                            </button>
                          </>
                        ) : (
                          <span className="text-xs text-gray-400">View Only</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-500 font-medium">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Order Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Create New Order"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          {isAdmin ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Customer
              </label>
              <select
                name="customerId"
                value={formData.customerId}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-xl shadow-sm text-sm"
                required
              >
                <option value="">-- Choose Customer --</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.full_name} ({c.role === "member" ? `${c.tier} Member` : "Guest"})
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer Name
              </label>
              <input
                type="text"
                value={profile?.full_name || ""}
                disabled
                className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-500"
              />
            </div>
          )}

          <InputField
            label="Total Original Price (Rp)"
            id="add-total-original"
            name="totalOriginal"
            type="number"
            placeholder="e.g. 150000"
            value={formData.totalOriginal}
            onChange={handleInputChange}
            required
          />

          {/* Pricing breakdown summary */}
          <div className="bg-latar/50 p-4 rounded-2xl border border-gray-100 space-y-2 mt-4 text-sm">
            <h4 className="font-bold text-gray-800 border-b border-gray-100 pb-1.5 mb-2">Perincian Transaksi</h4>
            <div className="flex justify-between text-gray-650">
              <span>Customer Tier:</span>
              <span className="font-semibold text-hijau capitalize">{calculatedDiscount.tier}</span>
            </div>
            <div className="flex justify-between text-gray-650">
              <span>Discount rate:</span>
              <span className="font-semibold text-gray-800">{calculatedDiscount.discount * 100}%</span>
            </div>
            <div className="flex justify-between text-red-600 font-medium">
              <span>Potongan Harga:</span>
              <span>-Rp {calculatedDiscount.amount.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between text-gray-800 font-extrabold border-t border-gray-100 pt-2 text-base">
              <span>Harga Akhir:</span>
              <span>Rp {calculatedDiscount.final.toLocaleString("id-ID")}</span>
            </div>
            {selectedCustomerInfo?.role === "member" && (
              <div className="text-xs text-gray-400 mt-2 italic text-center">
                *Member akan mendapatkan sekitar <strong>{Math.floor(calculatedDiscount.final / 10000)} poin</strong> setelah pesanan diselesaikan (Completed).
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 border rounded-xl hover:bg-gray-50 text-sm font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-hijau hover:bg-emerald-600 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
            >
              Save Order
            </button>
          </div>
        </form>
      </Modal>



      {/* Delete Order Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Order"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Apakah Anda yakin ingin menghapus pesanan ID <strong>#{currentOrder?.id.slice(0,8)}</strong>? Tindakan ini tidak dapat dibatalkan.
          </p>
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 border rounded-xl hover:bg-gray-50 text-sm font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirm}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
