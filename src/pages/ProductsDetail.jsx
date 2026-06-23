import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductDetail = async () => {
            setLoading(true);
            try {
                const { data, error: fetchErr } = await supabase
                    .from("products")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (fetchErr) throw fetchErr;
                setProduct(data);
            } catch (err) {
                setError(err.message || "Gagal memuat detail produk");
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetail();
    }, [id]);

    if (error) return <div className="text-red-600 p-6 bg-white rounded-xl shadow-lg max-w-lg mx-auto mt-6 border border-red-100">{error}</div>;
    if (loading) return <div className="p-6 text-center text-gray-500 font-medium">Loading detail produk...</div>;
    if (!product) return <div className="p-6 text-center text-gray-500 font-medium">Produk tidak ditemukan.</div>;

    return (
        <div className="p-6 bg-white rounded-3xl shadow-lg max-w-lg mx-auto mt-6 border border-gray-100 animate-slide-in">
            <div className="w-full h-48 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4 text-emerald-600 font-bold text-4xl uppercase">
                {product.name.slice(0, 2)}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>
            <div className="space-y-2 mb-6">
                <p className="text-sm text-gray-500">Product ID: <span className="font-mono text-gray-400">{product.id}</span></p>
                <p className="text-sm text-gray-700 font-medium">
                    Stok: <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${product.stock < 10 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>{product.stock} pcs</span>
                </p>
                <p className="text-gray-800 font-extrabold text-xl mt-4">
                    Harga: Rp {parseFloat(product.price).toLocaleString("id-ID")}
                </p>
            </div>
            <Link
                to="/products"
                className="inline-block w-full text-center px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
            >
                ← Kembali ke Daftar Produk
            </Link>
        </div>
    )
}