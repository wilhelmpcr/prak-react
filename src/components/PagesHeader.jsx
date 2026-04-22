import { MdRefresh } from "react-icons/md";

export default function PageHeader({ title, breadcrumb, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          {title}
        </h1>
        <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
          <span className="hover:text-hijau cursor-pointer transition-colors">Dashboard</span>
          {/* Logika Breadcrumb: Bisa string atau array */}
          {Array.isArray(breadcrumb) ? (
            breadcrumb.map((item, index) => (
              <span key={index} className="flex gap-2">
                <span>/</span>
                <span className={index === breadcrumb.length - 1 ? "text-gray-600 font-medium" : ""}>
                  {item}
                </span>
              </span>
            ))
          ) : (
            <>
              <span>/</span>
              <span className="text-gray-600 font-medium">{breadcrumb}</span>
            </>
          )}
        </div>
      </div>
      
      <div className="flex gap-3">
        <button 
          onClick={() => window.location.reload()}
          className="px-5 py-2.5 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 hover:border-hijau hover:text-hijau transition-all duration-300 flex items-center gap-2"
        >
          <MdRefresh className="text-lg" />
          Refresh
        </button>
        {/* Children digunakan untuk tombol custom seperti 'Add New' dsb */}
        {children}
      </div>
    </div>
  );
}
