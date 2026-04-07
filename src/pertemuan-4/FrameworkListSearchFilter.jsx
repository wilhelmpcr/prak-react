import { useState } from "react";
import frameworkData from "./framework.json";

export default function FrameworkListSearchFilter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const _searchTerm = searchTerm.toLowerCase();

  const filteredFrameworks = frameworkData.filter((framework) => {
    // Menambahkan pengecekan tahun rilis ke dalam matchesSearch
    const matchesSearch =
      framework.name.toLowerCase().includes(_searchTerm) ||
      framework.description.toLowerCase().includes(_searchTerm) ||
      framework.details.developer.toLowerCase().includes(_searchTerm) ||
      framework.details.releaseYear.toString().includes(_searchTerm); // <-- Perbaikan di sini

    const matchesTag = selectedTag
      ? framework.tags.includes(selectedTag)
      : true;

    return matchesSearch && matchesTag;
  });

  const allTags = [
    ...new Set(frameworkData.flatMap((framework) => framework.tags)),
  ];

  return (
    <div className="min-h-screen bg-[#f4f4f4] p-8 font-sans text-gray-900">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 uppercase tracking-tighter drop-shadow-sm">
          VIP Framework Elite
        </h1>
        <div className="h-1.5 w-40 bg-gradient-to-r from-yellow-500 to-yellow-300 mx-auto mt-2 rounded-full shadow-[0_2px_10px_rgba(234,179,8,0.4)]"></div>
      </div>

      {/* Filter Section */}
      <div className="max-w-5xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative group">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            // Placeholder diupdate agar user tahu bisa cari tahun
            placeholder="Search name, developer, or year (e.g. 2013)..." 
            className="w-full p-3 bg-white border-2 border-gray-200 rounded-xl focus:border-yellow-500 outline-none transition-all shadow-sm font-bold placeholder:text-gray-400 italic"
          />
          <div className="absolute right-3 top-3 text-yellow-600">🔍</div>
        </div>

        <select
          onChange={(e) => setSelectedTag(e.target.value)}
          className="w-full p-3 bg-white border-2 border-gray-200 rounded-xl focus:border-yellow-500 outline-none transition-all shadow-sm font-bold text-gray-700 appearance-none cursor-pointer"
        >
          <option value="">All Tags</option>
          {allTags.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {/* Grid Content */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFrameworks.length > 0 ? (
          filteredFrameworks.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden bg-white border-b-4 border-yellow-500 rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-black text-gray-800 group-hover:text-yellow-600 transition-colors uppercase italic tracking-tighter">
                      {item.name}
                    </h2>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-[10px] text-yellow-600">★★★★★</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">
                        Premium Class
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-900 text-yellow-400 text-[10px] px-3 py-1 rounded-full font-black tracking-widest shadow-lg">
                    VIP
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-6 leading-relaxed font-medium">
                  {item.description}
                </p>

                <div className="mt-auto space-y-4">
                  <div className="flex gap-2">
                    <div className="flex-1 bg-gray-50 border border-gray-100 p-2 rounded-lg text-center">
                      <p className="text-[9px] text-gray-400 font-bold uppercase">
                        Dev Team
                      </p>
                      <p className="text-xs font-black text-gray-700">
                        {item.details.developer}
                      </p>
                    </div>
                    <div className="flex-1 bg-gray-50 border border-gray-100 p-2 rounded-lg text-center">
                      <p className="text-[9px] text-gray-400 font-bold uppercase">
                        Released
                      </p>
                      <p className="text-xs font-black text-gray-700">
                        {item.details.releaseYear}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-[9px] font-bold text-yellow-700 bg-yellow-50 border border-yellow-200 px-2 py-0.5 rounded"
                        >
                          {tag.toUpperCase()}
                        </span>
                      ))}
                    </div>

                    <a
                      href={item.details.officialWebsite}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-gray-800 hover:to-gray-900 text-white text-[11px] font-black py-2.5 px-6 rounded-lg shadow-[0_4px_15px_rgba(202,138,4,0.3)] transition-all uppercase tracking-wider"
                    >
                      Launch Now
                    </a>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-yellow-400 opacity-20 group-hover:animate-shine pointer-events-none" />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 font-bold text-gray-400 italic">
            No VIP Framework found for "{searchTerm}"...
          </div>
        )}
      </div>
    </div>
  );
}
