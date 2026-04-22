import { useState } from "react";
import { Link } from "react-router-dom";
import { MdRefresh, MdHome } from "react-icons/md";

export default function ErrorPage({ code, message, image }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
      <div 
        className={`transition-all duration-500 transform ${isHovered ? "scale-110 -rotate-3" : "scale-100"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Menampilkan Gambar dari Props */}
        <img src={image} alt={`Error ${code}`} className="w-80 h-auto drop-shadow-2xl mb-4" />
      </div>

      <h1 className="text-7xl font-black text-gray-200 absolute -z-0 opacity-50 select-none">
        {code}
      </h1>
      
      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-gray-800 mt-2">Error {code}</h2>
        <p className="text-gray-500 mt-2 max-w-sm mx-auto">
          {message}
        </p>
      </div>

      <div className="flex gap-4 mt-8 relative z-10">
        <button 
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-100 transition-all shadow-sm"
        >
          <MdRefresh className="text-xl" />
          Muat Ulang
        </button>

        <Link 
          to="/"
          className="flex items-center gap-2 px-6 py-3 bg-hijau text-white rounded-2xl font-semibold shadow-lg shadow-hijau/30 hover:opacity-90 transition-all"
        >
          <MdHome className="text-xl" />
          Ke Dashboard
        </Link>
      </div>
    </div>
  );
}
