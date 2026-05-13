// components/ShopCardGrid.tsx (Updated with delete)
"use client";

import { Trash2, Edit } from "lucide-react";
import { useDataStore } from "@/store/dataStore";

export default function ShopCardGrid() {
  const shops = useDataStore((state) => state.shops);
  const deleteShop = useDataStore((state) => state.deleteShop);

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold text-[#1d1b4b]">Shop Details</h2>
        <button className="text-violet-600 text-sm font-semibold">View Details →</button>
      </div>
      <div className="space-y-4">
        {shops.slice(0, 3).map((shop) => (
          <div key={shop.id} className="p-5 rounded-2xl bg-[#faf9ff] border border-[#f0ebff]">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-base font-black text-[#1d1b4b]">{shop.name}</h3>
                <p className="text-violet-500 mt-1 text-sm">Owner: {shop.owner}</p>
                <p className="text-violet-400 text-xs">{shop.location}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg hover:bg-violet-50 text-violet-600">
                  <Edit size={16} />
                </button>
                <button 
                  onClick={() => deleteShop(shop.id)}
                  className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}