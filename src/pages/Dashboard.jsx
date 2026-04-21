import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import { useState, useEffect } from "react";
import PagesHeader from "../components/PagesHeader";

// Komponen Counter dengan animasi
const AnimatedCounter = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}</span>;
};

export default function Dashboard() {
  const stats = [
    {
      id: 1,
      title: "Total Orders",
      value: 75,
      icon: FaShoppingCart,
      color: "green",
      bgGradient: "from-green-500 to-emerald-600",
      trend: "+12%",
    },
    {
      id: 2,
      title: "Total Delivered",
      value: 175,
      icon: FaTruck,
      color: "blue",
      bgGradient: "from-blue-500 to-blue-600",
      trend: "+23%",
    },
    {
      id: 3,
      title: "Total Canceled",
      value: 40,
      icon: FaBan,
      color: "red",
      bgGradient: "from-red-500 to-rose-600",
      trend: "-5%",
    },
    {
      id: 4,
      title: "Total Revenue",
      value: 128,
      icon: FaDollarSign,
      color: "yellow",
      bgGradient: "from-yellow-500 to-amber-600",
      trend: "+18%",
      prefix: "Rp.",
    },
  ];

  return (
    <div className="mt-6">
      <PagesHeader  title="Dashboard"/>
      {/* Stats Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group cursor-pointer animate-slide-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`bg-gradient-to-r ${stat.bgGradient} p-3 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-white text-2xl" />
                  </div>
                  <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                    stat.trend.startsWith("+") 
                      ? "bg-green-100 text-green-600" 
                      : "bg-red-100 text-red-600"
                  }`}>
                    {stat.trend}
                  </span>
                </div>
                
                <div>
                  <p className="text-teks-samping text-sm font-medium mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-800">
                    {stat.prefix}
                    <AnimatedCounter target={stat.value} />
                  </p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="h-1 bg-garis rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${stat.bgGradient} rounded-full transition-all duration-1000`}
                  style={{ width: `${Math.min(100, (stat.value / 200) * 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Section - Bonus */}
      <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 animate-slide-in">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-gray-800 text-lg">Recent Orders</h3>
          <button className="text-hijau text-sm font-medium hover:underline">
            View All →
          </button>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-latar transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-hijau/10 rounded-full flex items-center justify-center">
                  <FaShoppingCart className="text-hijau" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Order #{1000 + i}</p>
                  <p className="text-xs text-teks-samping">2 minutes ago</p>
                </div>
              </div>
              <span className="text-green-600 font-semibold">Rp.{(i + 1) * 50},000</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}