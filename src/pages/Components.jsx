import React, { useState } from "react";
import PageHeader from "../components/PagesHeader";
import Button from "../components/Button";
import Avatar from "../components/Avatar";
import Card from "../components/Card";
import ProductCard from "../components/ProductCard";
import Table from "../components/Table";
import Container from "../components/Container";
import Footer from "../components/Footer";

// New Component Imports
import InputField from "../components/InputField";
import TextArea from "../components/TextArea";
import SelectField from "../components/SelectField";
import Alert from "../components/Alert";
import Modal from "../components/Modal";
import HeroSection from "../components/HeroSection";

export default function Components() {
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [category, setCategory] = useState("elektronik");
  const [feedback, setFeedback] = useState("");

  const headers = [
    "No",
    "Nama Produk",
    "Kategori",
    "Harga",
    "Aksi"
  ];

  const products = [
    {
      id: 1,
      name: "Laptop Asus",
      category: "Elektronik",
      price: "Rp 8.000.000"
    },
    {
      id: 2,
      name: "Sepatu Sport",
      category: "Fashion",
      price: "Rp 450.000"
    },
    {
      id: 3,
      name: "Jam Tangan",
      category: "Aksesoris",
      price: "Rp 799.000"
    }
  ];

  const categoryOptions = [
    { label: "Elektronik", value: "elektronik" },
    { label: "Fashion", value: "fashion" },
    { label: "Aksesoris", value: "aksesoris" }
  ];

  return (
    <Container className="bg-gray-50 rounded-3xl p-6 shadow-sm">
      <PageHeader title="Components" breadcrumb={["Dashboard", "Components"]} />
      
      <div className="space-y-10 mt-6">
        
        {/* SECTION COMPONENTS */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">6. Section Component</h3>
          <HeroSection
            title="Temukan Sepatu Impian Anda"
            subtitle="Dapatkan koleksi sepatu sport terbaru dengan kualitas terbaik dan harga terjangkau sekarang juga."
            ctaText="Mulai Belanja"
            onCtaClick={() => setIsModalOpen(true)}
          />
        </div>

        {/* BASIC COMPONENTS */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">1. Basic Component</h3>
          <div className="space-y-6">
            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium">Buttons</p>
              <div className="flex flex-wrap gap-3">
                <Button type="primary">Edit</Button>
                <Button type="success">Simpan</Button>
                <Button type="danger">Hapus</Button>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium">Avatars</p>
              <div className="flex gap-3">
                <Avatar name="Fikri" />
                <Avatar name="Hendra" />
                <Avatar name="Suci" />
              </div>
            </div>
          </div>
        </div>

        {/* LAYOUT COMPONENTS */}
        {/* (Container wraps this page, and Footer is shown at the bottom) */}

        {/* DATA DISPLAY COMPONENTS */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">3. Data Display Component</h3>
          <div className="space-y-6">
            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium">Card Wrapper</p>
              <Card>
                <h2 className="text-xl font-bold text-gray-800">Judul Card</h2>
                <p className="text-gray-600 mt-2">Ini adalah isi dari card.</p>
              </Card>
            </div>
            
            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium">Product Cards</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                <ProductCard
                  image="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                  title="Sepatu Sport"
                  category="Fashion"
                  price="Rp 450.000"
                  description="Sepatu sport modern dengan desain nyaman dan ringan untuk aktivitas sehari-hari."
                />
                <ProductCard
                  image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
                  title="Smartphone"
                  category="Elektronik"
                  price="Rp 4.500.000"
                  description="Smartphone dengan performa cepat, kamera jernih, dan baterai tahan lama."
                />
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium">Table Grid</p>
              <Table headers={headers}>
                {products.map((product, index) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors bg-white">
                    <td className="border px-4 py-3 text-sm text-gray-800 font-medium">
                      {index + 1}
                    </td>
                    <td className="border px-4 py-3 text-sm text-gray-800">
                      {product.name}
                    </td>
                    <td className="border px-4 py-3 text-sm text-gray-600">
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700 font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="border px-4 py-3 text-sm text-gray-800 font-semibold">
                      {product.price}
                    </td>
                    <td className="border px-4 py-3 text-sm">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors text-xs font-semibold">
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </Table>
            </div>
          </div>
        </div>

        {/* FORM COMPONENTS */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">4. Form Component</h3>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm max-w-xl">
            <InputField
              label="Nama Produk"
              id="product-name"
              placeholder="Masukkan nama produk..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <SelectField
              label="Kategori Produk"
              id="product-category"
              options={categoryOptions}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <TextArea
              label="Deskripsi / Catatan"
              id="product-description"
              placeholder="Masukkan deskripsi produk..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <div className="mt-4 flex gap-2">
              <div onClick={() => setIsModalOpen(true)}>
                <Button type="primary">Kirim Form</Button>
              </div>
            </div>
          </div>
        </div>

        {/* FEEDBACK COMPONENTS */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">5. Feedback Component</h3>
          <div className="space-y-4 max-w-xl">
            <Alert type="success">Form berhasil dikirim secara lokal!</Alert>
            <Alert type="info">Klik tombol "Kirim Form" atau "Mulai Belanja" untuk mencoba komponen Modal.</Alert>
            <div className="flex gap-2">
              <div onClick={() => setIsModalOpen(true)}>
                <Button type="warning">Buka Modal</Button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Modal Dialog */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Modal Demo Component"
      >
        <p className="text-sm text-gray-600 mb-4">
          Ini adalah contoh <strong>Feedback Modal Component</strong> yang interaktif!
        </p>
        <div className="space-y-2 mb-4">
          <p className="text-xs text-gray-500"><strong>Data Form saat ini:</strong></p>
          <ul className="text-xs text-gray-700 list-disc list-inside">
            <li>Nama: {name || "-"}</li>
            <li>Kategori: {category}</li>
            <li>Deskripsi: {feedback || "-"}</li>
          </ul>
        </div>
        <div className="flex justify-end gap-2">
          <div onClick={() => setIsModalOpen(false)}>
            <Button type="secondary">Tutup</Button>
          </div>
          <div onClick={() => {
            alert("Terima kasih!");
            setIsModalOpen(false);
          }}>
            <Button type="primary">Konfirmasi</Button>
          </div>
        </div>
      </Modal>

      {/* Footer Layout Component */}
      <div className="mt-12">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">2. Layout Component (Footer)</h3>
        <Footer />
      </div>
    </Container>
  );
}
