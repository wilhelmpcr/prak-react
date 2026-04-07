import frameworkData from "./framework.json";

export default function FrameworkList() {
  return (
  <div className="min-h-screen bg-[#0f0f0f] p-8 font-sans">
  {/* Header Section (Opsional untuk konteks) */}
  <div className="max-w-5xl mx-auto mb-10 text-center">
    <h1 className="text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 uppercase tracking-tighter">
      Premium Framework Selection
    </h1>
    <div className="h-1 w-32 bg-yellow-500 mx-auto mt-2 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.6)]"></div>
  </div>

  <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
    
    {frameworkData.map((item) => (
      
      <div
        key={item.id}
        className="group relative overflow-hidden bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] border border-gray-700 p-[1px] rounded-xl transition-all duration-300 hover:scale-[1.02] hover:border-yellow-500/50"
      >
        {/* Inner Content */}
        <div className="bg-[#1a1a1a] p-6 rounded-xl h-full flex flex-col">
          
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors uppercase italic">
              {item.name}
            </h2>
            <span className="text-[10px] bg-yellow-500 text-black px-2 py-0.5 rounded font-black">
              PRO
            </span>
          </div>

          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {item.description}
          </p>

          <div className="mt-auto">
            {/* Info Badge */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 bg-[#111] border border-gray-800 p-2 rounded flex justify-between items-center">
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Developer</span>
                <span className="text-xs text-yellow-500 font-bold">{item.details.developer}</span>
              </div>
            </div>

            {/* Action Section */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1">
                {item.tags.slice(0, 2).map((tag, index) => (
                  <span key={index} className="text-[9px] text-gray-400 border border-gray-700 px-1.5 py-0.5 rounded uppercase">
                    #{tag}
                  </span>
                ))}
              </div>
              
              <a
                href={item.details.officialWebsite}
                target="_blank"
                className="bg-gradient-to-r from-yellow-600 to-yellow-400 hover:from-yellow-500 hover:to-yellow-300 text-black text-xs font-black py-2 px-4 rounded-md shadow-[0_0_20px_rgba(202,138,4,0.3)] hover:shadow-[0_0_25px_rgba(202,138,4,0.5)] transition-all uppercase"
              >
                Play Now
              </a>
            </div>
          </div>
        </div>

        {/* Glossy Overlay Effect */}
        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-5 group-hover:animate-shine" />
      </div>
    ))}
  </div>
</div>
  );
}
