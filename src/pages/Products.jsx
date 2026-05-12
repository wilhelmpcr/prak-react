import PageHeader from "../components/PagesHeader";
import React from "react";
// Path disesuaikan: keluar dari pages/ untuk masuk ke data/
import products from "../data/Products.json";
import { Link } from "react-router-dom";

const Products = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Daftar Produk</h1>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
          Total: {products.length} Item
        </span>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 font-semibold text-gray-600 text-sm uppercase">
                Kode
              </th>
              <th className="p-4 font-semibold text-gray-600 text-sm uppercase">
                Nama Produk
              </th>
              <th className="p-4 font-semibold text-gray-600 text-sm uppercase">
                Kategori
              </th>
              <th className="p-4 font-semibold text-gray-600 text-sm uppercase">
                Brand
              </th>
              <th className="p-4 font-semibold text-gray-600 text-sm uppercase text-right">
                Harga
              </th>
              <th className="p-4 font-semibold text-gray-600 text-sm uppercase text-center">
                Stok
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((item) => (
              <tr
                key={item.code}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="p-4 font-medium">
                  <Link
                    to={`/products/${item.id}`}
                    className="text-emerald-400 hover:text-emerald-500 text-gray-800"
                  >
                    {item.title}
                  </Link>
                </td>
                <td className="p-4 font-medium text-gray-800">{item.title}</td>
                <td className="p-4 text-gray-600">
                  <span className="px-2 py-1 bg-gray-200 rounded text-xs">
                    {item.category}
                  </span>
                </td>
                <td className="p-4 text-gray-600">{item.brand}</td>
                <td className="p-4 text-right font-semibold text-gray-700">
                  Rp {item.price.toLocaleString("id-ID")}
                </td>
                <td className="p-4 text-center">
                  <span
                    className={`font-bold ${item.stock < 10 ? "text-red-500" : "text-green-600"}`}
                  >
                    {item.stock}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
