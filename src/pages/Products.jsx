import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import PageHeader from "../components/PagesHeader";
import Modal from "../components/Modal";
import InputField from "../components/InputField";
import Alert from "../components/Alert";

const Products = () => {
  const { profile } = useAuth();
  const isAdmin = profile?.role === "admin";

  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Form states
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error: fetchErr } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchErr) throw fetchErr;
      setProductsList(data || []);
    } catch (err) {
      setError("Gagal memuat produk: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const { data, error: insertErr } = await supabase.from("products").insert([
        {
          name: formData.name,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
        },
      ]).select();

      if (insertErr) throw insertErr;

      setSuccess("Produk berhasil ditambahkan!");
      setIsAddModalOpen(false);
      setFormData({ name: "", price: "", stock: "" });
      fetchProducts();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Gagal menambahkan produk: " + err.message);
    }
  };

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const { error: updateErr } = await supabase
        .from("products")
        .update({
          name: formData.name,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
        })
        .eq("id", currentProduct.id);

      if (updateErr) throw updateErr;

      setSuccess("Produk berhasil diperbarui!");
      setIsEditModalOpen(false);
      fetchProducts();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Gagal memperbarui produk: " + err.message);
    }
  };

  const handleDeleteClick = (product) => {
    setCurrentProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setError("");
    setSuccess("");

    try {
      const { error: deleteErr } = await supabase
        .from("products")
        .delete()
        .eq("id", currentProduct.id);

      if (deleteErr) throw deleteErr;

      setSuccess("Produk berhasil dihapus!");
      setIsDeleteModalOpen(false);
      fetchProducts();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Gagal menghapus produk: " + err.message);
    }
  };

  return (
    <div id="products-container" className="mt-6">
      <PageHeader title="Products" breadcrumb="Inventory">
        {isAdmin && (
          <button
            onClick={() => {
              setFormData({ name: "", price: "", stock: "" });
              setIsAddModalOpen(true);
            }}
            className="px-5 py-2.5 bg-hijau hover:bg-emerald-600 text-white rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md"
          >
            + Add Product
          </button>
        )}
      </PageHeader>

      {error && <div className="mb-4"><Alert type="danger">{error}</Alert></div>}
      {success && <div className="mb-4"><Alert type="success">{success}</Alert></div>}

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="p-4 font-semibold text-gray-600">Product ID</th>
                <th className="p-4 font-semibold text-gray-600">Product Name</th>
                <th className="p-4 font-semibold text-gray-600 text-right">Price</th>
                <th className="p-4 font-semibold text-gray-600 text-center">Stock</th>
                <th className="p-4 font-semibold text-gray-600 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500 font-medium">
                    Loading products...
                  </td>
                </tr>
              ) : productsList.length > 0 ? (
                productsList.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="p-4 text-xs font-mono text-gray-400">
                      {item.id.slice(0, 8)}...
                    </td>
                    <td className="p-4 text-sm font-bold text-gray-800">
                      <Link
                        to={`/products/${item.id}`}
                        className="text-hijau hover:underline"
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="p-4 text-sm font-semibold text-gray-700 text-right">
                      Rp {parseFloat(item.price).toLocaleString("id-ID")}
                    </td>
                    <td className="p-4 text-sm text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.stock < 10
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {item.stock}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-2">
                        <Link
                          to={`/products/${item.id}`}
                          className="px-3 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-semibold transition-colors"
                        >
                          Detail
                        </Link>
                        {isAdmin && (
                          <>
                            <button
                              onClick={() => handleEditClick(item)}
                              className="px-3 py-1 bg-yellow-50 text-yellow-600 hover:bg-yellow-100 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteClick(item)}
                              className="px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500 font-medium">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Product"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <InputField
            label="Product Name"
            id="add-name"
            name="name"
            placeholder="e.g. Nasi Goreng Spesial"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Price (Rp)"
            id="add-price"
            name="price"
            type="number"
            placeholder="e.g. 25000"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Initial Stock"
            id="add-stock"
            name="stock"
            type="number"
            placeholder="e.g. 100"
            value={formData.stock}
            onChange={handleInputChange}
            required
          />
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
              Add Product
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Product Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Product"
      >
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <InputField
            label="Product Name"
            id="edit-name"
            name="name"
            placeholder="e.g. Nasi Goreng Spesial"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Price (Rp)"
            id="edit-price"
            name="price"
            type="number"
            placeholder="e.g. 25000"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Stock"
            id="edit-stock"
            name="stock"
            type="number"
            placeholder="e.g. 100"
            value={formData.stock}
            onChange={handleInputChange}
            required
          />
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

      {/* Delete Product Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Product"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Apakah Anda yakin ingin menghapus produk <strong>{currentProduct?.name}</strong>? Tindakan ini tidak dapat dibatalkan.
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
};

export default Products;
