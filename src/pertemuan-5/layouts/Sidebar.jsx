import { MdDashboard } from "react-icons/md";
import { MdShoppingCart } from "react-icons/md";
import { MdPeople } from "react-icons/md";
import { MdAdd } from "react-icons/md";

export default function Sidebar() {
  return (
    <div
      id="sidebar"
      className="flex flex-col min-h-screen w-90 bg-white p-10 shadow-lg"
    >
      {/* Logo */}
      <div id="sidebar-logo" className="flex flex-col">
        <span
          id="logo-title"
          className="font-poppins text-[48px] text-gray-900"
        >
          Sedap <b id="logo-dot" className="text-hijau">.</b>
        </span>
        <span
          id="logo-subtitle"
          className="font-semibold text-gray-400"
        >
          Modern Admin Dashboard
        </span>
      </div>

      {/* List Menu */}
      <div id="sidebar-menu" className="mt-10">
        <ul id="menu-list" className="space-y-3">
          <li>
            <div
              id="menu-1"
              className="flex items-center rounded-xl p-4 font-medium text-gray-500 hover:bg-green-200 hover:text-hijau hover:font-extrabold cursor-pointer"
            >
              <MdDashboard className="mr-4 text-xl" />
              <span>Dashboard</span>
            </div>
          </li>

          <li>
            <div
              id="menu-2"
              className="flex items-center rounded-xl p-4 font-medium text-gray-500 hover:bg-green-200 hover:text-hijau hover:font-extrabold cursor-pointer"
            >
              <MdShoppingCart className="mr-4 text-xl" />
              <span>Orders</span>
            </div>
          </li>

          <li>
            <div
              id="menu-3"
              className="flex items-center rounded-xl p-4 font-medium text-gray-500 hover:bg-green-200 hover:text-hijau hover:font-extrabold cursor-pointer"
            >
              <MdPeople className="mr-4 text-xl" />
              <span>Customers</span>
            </div>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div id="sidebar-footer" className="mt-auto">
        <div
          id="footer-card"
          className="bg-hijau px-4 py-2 rounded-md shadow-lg mb-10 flex items-center"
        >
          <div id="footer-text" className="text-white text-sm">
            <span>
              Please organize your menus through button below!
            </span>

            <div
              id="add-menu-button"
              className="flex justify-center items-center p-2 mt-2 bg-white rounded-md space-x-2"
            >
              <MdAdd className="text-gray-500" />
              <span className="text-gray-500">Add Menus</span>
            </div>
          </div>

          <img
            id="footer-avatar"
            className="w-20 h-20 rounded-full ml-4"
            src="https://avatar.iran.liara.run/public/28"
          />
        </div>

        <span
          id="footer-brand"
          className="font-bold text-gray-400"
        >
          Sedap Restaurant Admin Dashboard
        </span>

        <p
          id="footer-copyright"
          className="font-light text-gray-400"
        >
          &copy; 2025 All Right Reserved
        </p>
      </div>
    </div>
  );
}