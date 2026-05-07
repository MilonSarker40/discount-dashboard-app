// components/ShopCardGrid.tsx
const shops = [
  { name: "Burger King", owner: "Nayeem", location: "Dhaka, Bangladesh" },
  { name: "Coffee House", owner: "Jihad", location: "Mirpur, Dhaka" },
];

export default function ShopCardGrid() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold text-[#1d1b4b]">Shop Details</h1>
        <button className="text-violet-600 text-sm font-semibold">View Details →</button>
      </div>
      <div className="space-y-4">
        {shops.map((shop, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-[#faf9ff] border border-[#f0ebff] flex justify-between items-center">
            <div>
              <h2 className="text-xl font-black text-[#1d1b4b]">{shop.name}</h2>
              <p className="text-violet-500 mt-1 text-sm">Owner: {shop.owner}</p>
              <p className="text-violet-400 text-xs">{shop.location}</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center text-2xl">
              🍔
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}