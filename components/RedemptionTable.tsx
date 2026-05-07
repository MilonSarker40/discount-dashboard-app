// components/RedemptionTable.tsx
const redemptions = [
  { customer: "Rahim", offer: "50% OFF Pizza", date: "20 May 2024", status: "Completed" },
  { customer: "Karim", offer: "Buy 1 Get 1", date: "20 May 2024", status: "Completed" },
];

export default function RedemptionTable() {
  return (
    <div className="glass-card overflow-hidden">
      <div className="bg-gradient-to-r from-violet-700 to-violet-600 px-6 py-4">
        <h2 className="text-white text-xl font-bold">Redemption List</h2>
      </div>
      <table className="w-full">
        <thead className="bg-[#f4f1ff] border-b border-[#e9e4ff]">
          <tr className="text-left text-violet-800 text-sm">
            <th className="p-5 font-semibold">Customer</th>
            <th className="p-5 font-semibold">Offer</th>
            <th className="p-5 font-semibold">Date</th>
            <th className="p-5 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {redemptions.map((item, idx) => (
            <tr key={idx} className="border-b border-[#f0ebff] hover:bg-violet-50/40 transition">
              <td className="p-5 font-medium text-[#1d1b4b]">{item.customer}</td>
              <td className="p-5 text-[#6f6c99]">{item.offer}</td>
              <td className="p-5 text-[#6f6c99]">{item.date}</td>
              <td className="p-5">
                <span className="badge-completed text-xs px-3 py-1 rounded-full font-semibold">
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}