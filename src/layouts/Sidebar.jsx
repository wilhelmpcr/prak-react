import { MdDashboard, MdAdd } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";
import { NavLink } from "react-router-dom";

export default function Sidebar() {

  const menus = [
    { id: "menu-1", name: "Dashboard", icon: MdDashboard, path: "/" },
    { id: "menu-2", name: "Orders", icon: AiOutlineShoppingCart, path: "/orders" },
    { id: "menu-3", name: "Customers", icon: HiOutlineUserGroup, path: "/customers" },
  ];
      const menuClass = ({ isActive }) =>
        `flex cursor-pointer items-center rounded-xl p-4  space-x-2
        ${isActive ? 
            "text-hijau bg-green-200 font-extrabold" : 
            "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
        }`

  return (
    <div className="flex flex-col min-h-screen w-72 bg-white shadow-2xl sticky top-0">
      
      {/* Logo */}
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

      {/* Menu */}
      <div className="flex-1 px-4 py-8">
        <p className="text-xs font-semibold text-teks-samping px-4 mb-4 tracking-wider">
          MAIN MENU
        </p>

        <ul className="space-y-2">
          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <li key={menu.id}>
                <NavLink
                  to={menu.path}
                  className={({ isActive }) =>
                    `flex items-center rounded-xl p-4 font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-green-200 text-hijau font-extrabold"
                        : "text-gray-600 hover:bg-green-200 hover:text-hijau"
                    }`
                  }
                >
                  <Icon className="mr-4 text-xl" />
                  {menu.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-garis">
        <div className="bg-gradient-to-r from-hijau to-emerald-600 rounded-2xl p-5 shadow-xl">
          <p className="text-white text-sm font-medium mb-3">
            Organize your menus!
          </p>
          <button className="w-full bg-white/20 backdrop-blur rounded-xl py-2.5 text-white font-semibold text-sm hover:bg-white/30 transition-all flex items-center justify-center gap-2">
            <MdAdd className="text-lg" />
            Add Menus
          </button>
        </div>

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