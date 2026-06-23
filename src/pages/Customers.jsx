import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import PageHeader from "../components/PagesHeader";
import Modal from "../components/Modal";
import InputField from "../components/InputField";
import Alert from "../components/Alert";

// Helper function to determine tier based on points
const determineTier = (points) => {
  const pts = parseInt(points) || 0;
  if (pts >= 10000) return "Platinum";
  if (pts >= 5000) return "Gold";
  if (pts >= 1000) return "Silver";
  return "Bronze";
};

export default function Customers() {
  const { profile } = useAuth();
  const isAdmin = profile?.role === "admin";

  const [customersData, setCustomersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Form states
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    role: "member",
    points: "0",
  });

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      // Fetch profiles with role 'member' or 'guest'
      const { data, error: fetchErr } = await supabase
        .from("profiles")
        .select("*")
        .in("role", ["member", "guest"])
        .order("created_at", { ascending: false });

      if (fetchErr) throw fetchErr;
      setCustomersData(data || []);
    } catch (err) {
      setError("Gagal memuat data pelanggan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const calculatedTier = determineTier(formData.points);

    try {
      const { error: insertErr } = await supabase.from("profiles").insert([
        {
          full_name: formData.fullName,
          role: formData.role,
          points: parseInt(formData.points) || 0,
          tier: calculatedTier,
        },
      ]);

      if (insertErr) throw insertErr;

      setSuccess("Pelanggan berhasil ditambahkan!");
      setIsAddModalOpen(false);
      setFormData({ fullName: "", role: "member", points: "0" });
      fetchCustomers();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Gagal menambahkan pelanggan: " + err.message);
    }
  };

  const handleEditClick = (cus) => {
    setCurrentCustomer(cus);
    setFormData({
      fullName: cus.full_name,
      role: cus.role,
      points: cus.points.toString(),
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const calculatedTier = determineTier(formData.points);

    try {
      const { error: updateErr } = await supabase
        .from("profiles")
        .update({
          full_name: formData.fullName,
          role: formData.role,
          points: parseInt(formData.points) || 0,
          tier: calculatedTier,
        })
        .eq("id", currentCustomer.id);

      if (updateErr) throw updateErr;

      setSuccess("Pelanggan berhasil diperbarui!");
      setIsEditModalOpen(false);
      fetchCustomers();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Gagal memperbarui pelanggan: " + err.message);
    }
  };

  const handleDeleteClick = (cus) => {
    setCurrentCustomer(cus);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setError("");
    setSuccess("");

    try {
      const { error: deleteErr } = await supabase
        .from("profiles")
        .delete()
        .eq("id", currentCustomer.id);

      if (deleteErr) throw deleteErr;

      setSuccess("Pelanggan berhasil dihapus!");
      setIsDeleteModalOpen(false);
      fetchCustomers();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Gagal menghapus pelanggan: " + err.message);
    }
  };

  return (
    <div id="dashboard-container" className="mt-6">
      <PageHeader title="Customers" breadcrumb="Management">
        {isAdmin && (
          <button
            onClick={() => {
              setFormData({ fullName: "", role: "member", points: "0" });
              setIsAddModalOpen(true);
            }}
            className="px-5 py-2.5 bg-hijau hover:bg-emerald-600 text-white rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md"
          >
            + Add Customer
          </button>
        )}
      </PageHeader>

      {error && <div className="mb-4"><Alert type="danger">{error}</Alert></div>}
      {success && <div className="mb-4"><Alert type="success">{success}</Alert></div>}

      <div className="mt-6 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="p-4 font-semibold text-gray-600">Customer ID</th>
                <th className="p-4 font-semibold text-gray-600">Name</th>
                <th className="p-4 font-semibold text-gray-600">Role</th>
                <th className="p-4 font-semibold text-gray-600">Points</th>
                <th className="p-4 font-semibold text-gray-600">Loyalty Tier</th>
                {isAdmin && <th className="p-4 font-semibold text-gray-600 text-center">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={isAdmin ? 6 : 5} className="text-center py-8 text-gray-500 font-medium">
                    Loading customers...
                  </td>
                </tr>
              ) : customersData.length > 0 ? (
                customersData.map((cus) => (
                  <tr
                    key={cus.id}
                    className="border-b border-gray-55 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="p-4 text-xs font-mono text-gray-400">
                      {cus.id.slice(0, 8)}...
                    </td>
                    <td className="p-4 text-sm font-bold text-gray-800">
                      {cus.full_name}
                    </td>
                    <td className="p-4 text-sm text-gray-500">
                      <span className="capitalize">{cus.role}</span>
                    </td>
                    <td className="p-4 text-sm font-semibold text-gray-700">
                      {cus.points.toLocaleString("id-ID")}
                    </td>
                    <td className="p-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          cus.tier === "Platinum"
                            ? "bg-purple-100 text-purple-600"
                            : cus.tier === "Gold"
                            ? "bg-amber-100 text-amber-600"
                            : cus.tier === "Silver"
                            ? "bg-slate-100 text-slate-600"
                            : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {cus.tier}
                      </span>
                    </td>
                    {isAdmin && (
                      <td className="p-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEditClick(cus)}
                            className="px-3 py-1 bg-yellow-50 text-yellow-600 hover:bg-yellow-100 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(cus)}
                            className="px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={isAdmin ? 6 : 5} className="text-center py-8 text-gray-500 font-medium">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Customer Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Customer Profile"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <InputField
            label="Full Name"
            id="add-fullname"
            name="fullName"
            placeholder="e.g. John Doe"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-xl shadow-sm text-sm"
            >
              <option value="member">Member</option>
              <option value="guest">Guest</option>
            </select>
          </div>
          <InputField
            label="Points"
            id="add-points"
            name="points"
            type="number"
            placeholder="e.g. 1500"
            value={formData.points}
            onChange={handleInputChange}
            required
          />
          <div className="text-xs text-gray-500 mt-1">
            Tier yang terdeteksi: <strong>{determineTier(formData.points)}</strong>
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
              Add Customer
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Customer Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Customer Profile"
      >
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <InputField
            label="Full Name"
            id="edit-fullname"
            name="fullName"
            placeholder="e.g. John Doe"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-xl shadow-sm text-sm"
            >
              <option value="member">Member</option>
              <option value="guest">Guest</option>
            </select>
          </div>
          <InputField
            label="Points"
            id="edit-points"
            name="points"
            type="number"
            placeholder="e.g. 1500"
            value={formData.points}
            onChange={handleInputChange}
            required
          />
          <div className="text-xs text-gray-500 mt-1">
            Tier yang terdeteksi: <strong>{determineTier(formData.points)}</strong>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 border rounded-xl hover:bg-gray-50 text-sm font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-hijau hover:bg-emerald-600 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Customer Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Customer Profile"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Apakah Anda yakin ingin menghapus profil pelanggan <strong>{currentCustomer?.full_name}</strong>? Tindakan ini tidak dapat dibatalkan.
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
