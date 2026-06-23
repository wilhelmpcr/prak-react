import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { profile, logout } = useAuth();

  return (
    <div
      id="header-container"
      className="flex justify-between items-center p-4 bg-white border-b border-gray-100"
    >
      {/* Search Bar */}
      <div
        id="search-bar"
        className="relative w-full max-w-lg"
      >
        <input
          id="search-input"
          type="text"
          placeholder="Search Here..."
          className="border border-gray-100 p-2 pr-10 bg-white w-full max-w-lg rounded-md outline-none"
        />
        <FaSearch
          id="search-icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300"
        />
      </div>

      {/* Icon & Profile Section */}
      <div
        id="icons-container"
        className="flex items-center space-x-4"
      >
        {/* Notification */}
        <div
          id="notification-icon"
          className="relative p-3 bg-blue-100 rounded-2xl text-blue-500 cursor-pointer"
        >
          <FaBell />
          <span
            id="notification-badge"
            className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-200 rounded-full px-2 py-1 text-xs"
          >
            50
          </span>
        </div>

        {/* Chart */}
        <div
          id="chart-icon"
          className="p-3 bg-blue-100 rounded-2xl cursor-pointer"
        >
          <FcAreaChart />
        </div>

        {/* Settings */}
        <div
          id="settings-icon"
          className="p-3 bg-red-100 rounded-2xl text-red-500 cursor-pointer"
        >
          <SlSettings />
        </div>

        {/* Profile */}
        <div
          id="profile-container"
          className="flex items-center space-x-4 border-l pl-4 border-gray-300"
        >
          <span id="profile-text" className="text-right flex flex-col">
            <span className="font-bold text-gray-800">{profile?.full_name || "Guest User"}</span>
            <span className="text-[10px] text-gray-400 capitalize">
              {profile?.role === "member"
                ? `${profile.role} (${profile.tier} - ${profile.points} pts)`
                : profile?.role || "guest"}
            </span>
          </span>
          <img
            id="profile-avatar"
            src={`https://avatar.iran.liara.run/public/${profile?.role === "admin" ? "job/designer/33" : "28"}`}
            className="w-10 h-10 rounded-full"
            alt="Avatar"
          />
          <button
            onClick={() => logout()}
            className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold cursor-pointer transition-colors border border-red-100"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}