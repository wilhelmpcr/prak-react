import { MdDashboard, MdShoppingCart, MdPeople, MdAdd, MdLogout } from "react-icons/md";
import { useState } from "react";

export default function Sidebar() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const menus = [
    { name: "Dashboard", icon: MdDashboard },
    { name: "Orders", icon: MdShoppingCart },
    { name: "Customers", icon: MdPeople },
  ];

  return (
    <div className="flex flex-col min-h-screen w-72 bg-white shadow-2xl sticky top-0 animate-slide-in">
      {/* Logo Section - Enhanced */}
      <div className="p-8 border-b border-garis">
        <div className="flex items-baseline">
          <span className="font-poppins text-4xl font-bold text-gray-900">
            Sedap
          </span>
          <span className="text-hijau text-4xl font-bold">.</span>
        </div>
        <span className="text-xs text-teks-samping font-medium tracking-wide">
          PREMIUM DASHBOARD
        </span>
      </div>

      {/* Menu List */}
      <div className="flex-1 px-4 py-8">
        <p className="text-xs font-semibold text-teks-samping px-4 mb-4 tracking-wider">
          MAIN MENU
        </p>
        <ul className="space-y-2">
          {menus.map((menu) => {
            const Icon = menu.icon;
            const isActive = activeMenu === menu.name;
            return (
              <li key={menu.name}>
                <button
                  onClick={() => setActiveMenu(menu.name)}
                  className={`w-full flex items-center rounded-xl px-4 py-3 transition-all duration-300 group ${
                    isActive
                      ? "bg-hijau text-white shadow-lg shadow-hijau/30"
                      : "text-teks-samping hover:bg-hijau/10 hover:text-hijau"
                  }`}
                >
                  <Icon className={`text-xl mr-4 transition-transform duration-300 group-hover:scale-110 ${
                    isActive ? "text-white" : ""
                  }`} />
                  <span className="font-medium">{menu.name}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer Card - Enhanced */}
      <div className="p-4 border-t border-garis">
        <div className="bg-gradient-to-r from-hijau to-emerald-600 rounded-2xl p-5 shadow-xl animate-float">
          <p className="text-white text-sm font-medium mb-3">
            Organize your menus!
          </p>
          <button className="w-full bg-white/20 backdrop-blur rounded-xl py-2.5 text-white font-semibold text-sm hover:bg-white/30 transition-all duration-300 flex items-center justify-center gap-2">
            <MdAdd className="text-lg" />
            Add Menus
          </button>
        </div>

        {/* Footer Bottom */}
        <div className="mt-6 text-center">
          <p className="text-xs font-semibold text-teks-samping">
            Sedap Restaurant
          </p>
          <p className="text-xs text-teks-samping/60 mt-1">
            © 2025 All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
}