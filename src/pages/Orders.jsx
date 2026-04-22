import PageHeader from "../components/PagesHeader";

const ordersData = Array.from({ length: 30 }, (_, i) => ({
  id: `#ORD-${5001 + i}`,
  customer: ["Andi Wijaya", "Rina Rose", "Eko Prasetyo", "Maya Putri", "Gani Malik"][i % 5],
  status: ["Pending", "Completed", "Cancelled"][i % 3],
  total: (Math.random() * 500000 + 50000).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }),
  date: `2024-03-${(i % 28 + 1).toString().padStart(2, '0')}`,
}));

export default function Orders() {
  return (
    <div id="dashboard-container">
      <PageHeader title="Orders" breadcrumb="Sales Report" />
      
      <div className="mt-6 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 font-semibold text-gray-600">Order ID</th>
                <th className="p-4 font-semibold text-gray-600">Customer</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
                <th className="p-4 font-semibold text-gray-600">Total Price</th>
                <th className="p-4 font-semibold text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {ordersData.map((order) => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors">
                  <td className="p-4 text-sm font-bold text-gray-800">{order.id}</td>
                  <td className="p-4 text-sm text-gray-600">{order.customer}</td>
                  <td className="p-4 text-sm">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-600' :
                      order.status === 'Pending' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-semibold text-gray-700">{order.total}</td>
                  <td className="p-4 text-sm text-gray-400 font-medium">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
