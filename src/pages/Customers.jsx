import PageHeader from "../components/PagesHeader";

const customersData = Array.from({ length: 30 }, (_, i) => ({
  id: `CUS-${1001 + i}`,
  name: ["Ahmad Fauzi", "Siti Aminah", "Budi Santoso", "Dewi Lestari", "Rian Hidayat"][i % 5] + ` ${i + 1}`,
  email: `user${i + 1}@example.com`,
  phone: `0812-3456-78${i.toString().padStart(2, '0')}`,
  loyalty: ["Bronze", "Silver", "Gold"][i % 3],
}));

export default function Customers() {
  return (
    <div id="dashboard-container">
      <PageHeader title="Customers" breadcrumb="Management" />
      
      <div className="mt-6 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="p-4 font-semibold text-gray-600">Customer ID</th>
              <th className="p-4 font-semibold text-gray-600">Name</th>
              <th className="p-4 font-semibold text-gray-600">Contact Info</th>
              <th className="p-4 font-semibold text-gray-600">Loyalty</th>
            </tr>
          </thead>
          <tbody>
            {customersData.map((cus) => (
              <tr key={cus.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="p-4 text-sm font-medium text-hijau">{cus.id}</td>
                <td className="p-4 text-sm font-bold text-gray-800">{cus.name}</td>
                <td className="p-4 text-sm text-gray-500">
                  <div>{cus.email}</div>
                  <div className="text-xs text-gray-400">{cus.phone}</div>
                </td>
                <td className="p-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    cus.loyalty === 'Gold' ? 'bg-amber-100 text-amber-600' :
                    cus.loyalty === 'Silver' ? 'bg-slate-100 text-slate-600' : 'bg-orange-100 text-orange-600'
                  }`}>
                    {cus.loyalty}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
