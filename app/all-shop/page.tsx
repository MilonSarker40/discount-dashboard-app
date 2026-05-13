// app/all-shop/page.tsx
"use client";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { useState } from "react";
import Link from "next/link";
import { Store, MapPin, User, Eye, ChevronRight } from "lucide-react";
import { useDataStore } from "@/store/dataStore";
import AddShopModal from "@/components/Modals/AddShopModal";

const shops = [
  { id: 1, name: "Burger King", owner: "Nayeem", location: "Dhaka, Bangladesh", email: "nayeem@burgerking.com", phone: "+880 1234 56789", status: "Active", totalOffers: 12, redemptions: 234 },
  { id: 2, name: "Coffee House", owner: "Jihad", location: "Mirpur, Dhaka", email: "jihad@coffeehouse.com", phone: "+880 2345 67890", status: "Active", totalOffers: 8, redemptions: 156 },
  { id: 3, name: "Pizza Hut", owner: "Rahim", location: "Gulshan, Dhaka", email: "rahim@pizzahut.com", phone: "+880 3456 78901", status: "Active", totalOffers: 15, redemptions: 342 },
  { id: 4, name: "KFC", owner: "Karim", location: "Uttara, Dhaka", email: "karim@kfc.com", phone: "+880 4567 89012", status: "Pending", totalOffers: 5, redemptions: 89 },
  { id: 5, name: "Starbucks", owner: "Mahmud", location: "Banani, Dhaka", email: "mahmud@starbucks.com", phone: "+880 5678 90123", status: "Active", totalOffers: 10, redemptions: 278 },
];

export default function AllShopPage() {

  const [modalOpen, setModalOpen] = useState<"shop" | null>(null);
  const shops = useDataStore((state) => state.shops);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8 overflow-x-auto">
        <Topbar />
        
        <div className="mt-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#1d1b4b]">All Shops</h2>
              <p className="text-[#6f6c99] mt-2">Manage all partner shops and their details</p>
            </div>
            <button onClick={() => setModalOpen("shop")} className="bg-violet-700 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-violet-800 transition flex items-center gap-2">
              <Store size={20} />
              Add New Shop
            </button>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 border border-[#f0ebff]">
              <p className="text-[#7a7699]">Total Shops</p>
              <h2 className="text-2xl font-bold text-[#1d1b4b] mt-2">120</h2>
              <p className="text-green-500 text-sm mt-2">↑ 12 this month</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#f0ebff]">
              <p className="text-[#7a7699]">Active Shops</p>
              <h2 className="text-2xl font-bold text-[#1d1b4b] mt-2">95</h2>
              <p className="text-green-500 text-sm mt-2">79% active rate</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#f0ebff]">
              <p className="text-[#7a7699]">Total Offers</p>
              <h2 className="text-2xl font-bold text-[#1d1b4b] mt-2">85</h2>
              <p className="text-blue-500 text-sm mt-2">Across all shops</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#f0ebff]">
              <p className="text-[#7a7699]">Redemptions</p>
              <h2 className="text-2xl font-bold text-[#1d1b4b] mt-2">1,234</h2>
              <p className="text-purple-500 text-sm mt-2">Total redemptions</p>
            </div>
          </div>

          {/* Shops Table */}
          <div className="bg-white rounded-[32px] border border-[#f0ebff] overflow-hidden">
            <div className="p-6 border-b border-[#f0ebff]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <input 
                    type="text" 
                    placeholder="Search shops..." 
                    className="px-5 py-3 rounded-xl border border-[#e0d9ff] w-80 focus:outline-none focus:border-violet-500"
                  />
                  <select className="px-5 py-3 rounded-xl border border-[#e0d9ff] bg-white focus:outline-none">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Pending</option>
                  </select>
                </div>
                <button className="text-violet-600 font-semibold">Export List →</button>
              </div>
            </div>
            
            <table className="w-full">
              <thead className="bg-[#faf9ff] border-b border-[#f0ebff]">
                <tr className="text-left text-[#8a86b3]">
                  <th className="p-6 font-semibold">Shop Name</th>
                  <th className="p-6 font-semibold">Owner</th>
                  <th className="p-6 font-semibold">Location</th>
                  <th className="p-6 font-semibold">Offers</th>
                  <th className="p-6 font-semibold">Redemptions</th>
                  <th className="p-6 font-semibold">Status</th>
                  <th className="p-6 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {shops.map((shop) => (
                  <tr key={shop.id} className="border-b border-[#f7f5ff] hover:bg-[#faf9ff] transition">
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-xl">
                          🏪
                        </div>
                        <span className="font-semibold text-[#1d1b4b]">{shop.name}</span>
                      </div>
                    </td>
                    <td className="p-6 text-[#6f6c99]">{shop.owner}</td>
                    <td className="p-6 text-[#6f6c99]">{shop.location}</td>
                    <td className="p-6 font-semibold text-[#1d1b4b]">{shop.totalOffers}</td>
                    <td className="p-6 text-[#6f6c99]">{shop.redemptions}</td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${shop.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                        {shop.status}
                      </span>
                    </td>
                    <td className="p-6">
                      <Link href={`/all-shop/${shop.id}`}>
                        <button className="text-violet-600 hover:text-violet-800 flex items-center gap-1">
                          <Eye size={16} />
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Pagination */}
            <div className="p-6 border-t border-[#f0ebff] flex items-center justify-between">
              <p className="text-[#8a86b3] text-sm">Showing 1 to 5 of 120 shops</p>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg border border-[#e0d9ff] hover:bg-violet-50">Previous</button>
                <button className="px-4 py-2 rounded-lg bg-violet-600 text-white">1</button>
                <button className="px-4 py-2 rounded-lg border border-[#e0d9ff] hover:bg-violet-50">2</button>
                <button className="px-4 py-2 rounded-lg border border-[#e0d9ff] hover:bg-violet-50">3</button>
                <button className="px-4 py-2 rounded-lg border border-[#e0d9ff] hover:bg-violet-50">Next</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <AddShopModal isOpen={modalOpen === "shop"} onClose={() => setModalOpen(null)} />
    </div>
  );
}