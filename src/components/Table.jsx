export default function Table({ headers, children }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-200 bg-white">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="border px-4 py-3 text-left font-semibold text-gray-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {children}
        </tbody>
      </table>
    </div>
  );
}
