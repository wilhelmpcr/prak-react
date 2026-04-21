import { MdAdd, MdRefresh } from "react-icons/md";

export default function PagesHeader(props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          {props.title}
        </h1>
        <div className="flex items-center gap-2 text-sm text-teks-samping mt-1">
          <span className="hover:text-hijau cursor-pointer transition-colors">Dashboard</span>
          <span>/</span>
          <span className="text-gray-600 font-medium">Overview</span>
        </div>
      </div>
      
      <div className="flex gap-3">
        <button className="px-5 py-2.5 border border-garis rounded-xl text-teks-samping hover:bg-gray-50 hover:border-hijau hover:text-hijau transition-all duration-300 flex items-center gap-2">
          <MdRefresh className="text-lg" />
          Refresh
        </button>
        <button className="px-5 py-2.5 bg-gradient-to-r from-hijau to-emerald-600 text-white rounded-xl hover:shadow-lg hover:shadow-hijau/30 transition-all duration-300 flex items-center gap-2">
          <MdAdd className="text-lg" />
          Add New
        </button>
      </div>
    </div>
  );
}