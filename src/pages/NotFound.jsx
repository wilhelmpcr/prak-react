import { useState } from "react";
import { Link } from "react-router-dom";
import { MdReportProblem, MdRefresh, MdHome } from "react-icons/md";

export default function ErrorPage() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
      {/* Icon dengan State-based Animation */}
      <div 
        className={`transition-all duration-500 transform ${isHovered ? "scale-110 rotate-12" : "scale-100"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <MdReportProblem className="text-red-500 text-9xl drop-shadow-2xl" />
      </div>

      <h1 className="text-4xl font-bold text-gray-800 mt-6">Opps! Terjadi Kesalahan</h1>
      <p className="text-gray-500 mt-2 max-w-sm">
        Sepertinya ada masalah di dapur kami. Coba muat ulang halaman atau kembali ke dashboard.
      </p>

      <div className="flex gap-4 mt-8">
        {/* Tombol Reload */}
        <button 
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-100 transition-all"
        >
          <MdRefresh className="text-xl" />
          Muat Ulang
        </button>

        {/* Tombol Home */}
        <Link 
          to="/"
          className="flex items-center gap-2 px-6 py-3 bg-hijau text-white rounded-2xl font-semibold shadow-lg shadow-hijau/30 hover:opacity-90 transition-all"
        >
          <MdHome className="text-xl" />
          Dashboard
        </Link>
      </div>

      {/* State Debug Info (Opsional) */}
      {isHovered && (
        <p className="mt-8 text-xs text-red-400 animate-pulse">
          Sistem sedang mendeteksi masalah...
        </p>
      )}
    </div>
  );
}
