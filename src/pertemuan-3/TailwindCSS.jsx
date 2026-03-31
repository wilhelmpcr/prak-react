export default function TailwindCSS() {
  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* Navbar Section */}
      <FlexboxGrid />

      <div className="max-w-4xl mx-auto px-4 space-y-8 mt-6">
        {/* Header Section */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tight italic">
            Belajar Tailwind CSS 4
          </h1>
          <p className="text-gray-500 mb-4">Eksperimen komponen dengan utility classes.</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-full shadow-md transition-all active:scale-95">
            Click Me
          </button>
        </section>

        {/* Grid Layout untuk Komponen Kecil */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Spacing
            title="Sistem Spacing"
            content="Mengatur margin (m-4) dan padding (p-6) sangat mudah dengan Tailwind."
          />
          <BackgroundColors />
        </div>

        <Typography />

        <div className="flex flex-wrap items-center gap-4 p-6 bg-white rounded-lg shadow-sm">
          <span className="text-sm font-semibold text-gray-400 uppercase">Border Style:</span>
          <BorderRadius />
        </div>

        <ShadowEffects />
      </div>
    </div>
  );
}

// --- Sub Komponen ---

function FlexboxGrid() {
  return (
    <nav className="flex justify-between items-center bg-gray-900 p-4 text-white sticky top-0 z-50 shadow-md px-6">
      {/* Bagian Kiri (Logo) */}
      <div className="flex-1">
        <h1 className="text-xl font-extrabold tracking-widest text-blue-400">
          MY<span className="text-white">UI</span>
        </h1>
      </div>

      {/* Bagian Tengah (Navigation) */}
      <ul className="flex space-x-8 text-sm font-medium flex-none justify-center">
        <li><a href="#" className="hover:text-blue-400 transition">Home</a></li>
        <li><a href="#" className="hover:text-blue-400 transition">About</a></li>
      </ul>

      {/* Bagian Kanan (Login) */}
      <div className="flex-1 text-right">
        <a href="#" className="text-sm font-medium hover:text-blue-400 transition">Login</a>
      </div>
    </nav>
  );
}

function Spacing({ title, content }) {
  return (
    <div className="bg-white border-l-4 border-blue-500 shadow-lg p-6 rounded-r-lg">
      <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      <p className="mt-2 text-gray-600 leading-relaxed">{content}</p>
    </div>
  );
}

function Typography() {
  return (
    <div className="py-4 text-center md:text-left">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
        Tailwind Typography
      </h1>
      <p className="text-gray-500 text-lg mt-2 italic">
        "Belajar Tailwind sangat menyenangkan dan cepat!"
      </p>
    </div>
  );
}

function BorderRadius() {
  return (
    <button className="border-2 border-blue-500 text-blue-500 font-bold px-6 py-2 rounded-xl hover:bg-blue-500 hover:text-white transition-colors duration-300">
      Hover Saya
    </button>
  );
}

function BackgroundColors() {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-xl transform hover:-rotate-1 transition-transform">
      <h3 className="text-xl font-bold">Tailwind Colors</h3>
      <p className="mt-2 opacity-90">Gunakan gradient untuk tampilan lebih modern dan hidup.</p>
    </div>
  );
}

function ShadowEffects() {
  return (
    <div className="bg-white shadow-md p-8 rounded-2xl border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
      <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Hover me!</h3>
      <p className="text-gray-500 mt-2">Kartu ini menggunakan efek elevasi dan transisi smooth.</p>
    </div>
  );
}