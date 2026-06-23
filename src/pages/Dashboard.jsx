import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import { useState, useEffect } from "react";
import PagesHeader from "../components/PagesHeader";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

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

  return <span>{count.toLocaleString("id-ID")}</span>;
};

export default function Dashboard() {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState({
    totalOrders: 0,
    totalDelivered: 0,
    totalCanceled: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from("orders")
          .select(`
            *,
            profiles:customer_id (
              full_name
            )
          `)
          .order("created_at", { ascending: false });

        if (profile?.role === "member") {
          query = query.eq("customer_id", profile.id);
        }

        const { data, error } = await query;
        if (error) throw error;

        const list = data || [];
        const total = list.length;
        const delivered = list.filter((o) => o.status === "completed").length;
        const canceled = list.filter((o) => o.status === "cancelled").length;
        const revenue = list
          .filter((o) => o.status === "completed")
          .reduce((sum, o) => sum + parseFloat(o.total_final || 0), 0);

        setStatsData({
          totalOrders: total,
          totalDelivered: delivered,
          totalCanceled: canceled,
          totalRevenue: revenue,
        });

        setRecentOrders(list.slice(0, 3));
      } catch (err) {
        console.error("Dashboard fetch error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (profile) {
      fetchDashboardData();
    }
  }, [profile]);

  const stats = [
    {
      id: 1,
      title: "Total Orders",
      value: statsData.totalOrders,
      icon: FaShoppingCart,
      color: "green",
      bgGradient: "from-green-500 to-emerald-600",
      trend: "+100%",
    },
    {
      id: 2,
      title: "Total Delivered",
      value: statsData.totalDelivered,
      icon: FaTruck,
      color: "blue",
      bgGradient: "from-blue-500 to-blue-600",
      trend: "+100%",
    },
    {
      id: 3,
      title: "Total Canceled",
      value: statsData.totalCanceled,
      icon: FaBan,
      color: "red",
      bgGradient: "from-red-500 to-rose-600",
      trend: "0%",
    },
    {
      id: 4,
      title: "Total Revenue",
      value: statsData.totalRevenue,
      icon: FaDollarSign,
      color: "yellow",
      bgGradient: "from-yellow-500 to-amber-600",
      trend: "+100%",
      prefix: "Rp. ",
    },
  ];

  return (
    <div className="mt-6">
      <PagesHeader title="Dashboard" breadcrumb="Overview" />

      {loading ? (
        <div className="py-10 text-center text-gray-500 font-medium">
          Loading dashboard statistics...
        </div>
      ) : (
        <>
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
                        stat.trend.startsWith("+") || stat.trend === "100%"
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
                      <p className="text-2xl font-bold text-gray-800">
                        {stat.prefix}
                        <AnimatedCounter target={stat.value} />
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-1 bg-garis rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${stat.bgGradient} rounded-full transition-all duration-1000`}
                      style={{ width: `${Math.min(100, stat.value > 0 ? 100 : 0)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent Activity Section */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 animate-slide-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-800 text-lg">Recent Orders</h3>
              <span className="text-hijau text-sm font-medium">
                Last 3 orders
              </span>
            </div>

            <div className="space-y-4">
              {recentOrders.length > 0 ? (
                recentOrders.map((order, i) => (
                  <div key={order.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-latar transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-hijau/10 rounded-full flex items-center justify-center">
                        <FaShoppingCart className="text-hijau" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          Order #{order.id.slice(0, 8)}
                        </p>
                        <p className="text-xs text-teks-samping capitalize">
                          {order.profiles?.full_name || "Guest"} • {new Date(order.created_at).toLocaleDateString("id-ID")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                        order.status === "completed" ? "bg-green-100 text-green-600" :
                        order.status === "pending" ? "bg-blue-100 text-blue-600" : "bg-red-100 text-red-600"
                      }`}>
                        {order.status}
                      </span>
                      <span className="text-green-600 font-semibold">
                        Rp {parseFloat(order.total_final).toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500 text-sm">
                  Belum ada pesanan terbaru.
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}