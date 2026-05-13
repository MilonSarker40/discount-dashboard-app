// app/all-offer/page.tsx
"use client";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { Gift, Calendar, Store, Eye, Edit, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { useDataStore } from "@/store/dataStore";
import AddOfferModal from "@/components/Modals/AddOfferModal";


const offers = [
  { id: 1, title: "50% OFF Pizza", shop: "Pizza Hut", discount: "50% OFF", code: "PIZZA50", validFrom: "May 20, 2024", validTo: "May 30, 2024", status: "Active", totalRedemptions: 120, usedCount: 78, limit: 200, type: "Percentage" },
  { id: 2, title: "Buy 1 Get 1", shop: "KFC", discount: "BOGO", code: "KFCBOGO", validFrom: "May 18, 2024", validTo: "May 25, 2024", status: "Expired", totalRedemptions: 85, usedCount: 85, limit: 100, type: "BOGO" },
  { id: 3, title: "Free Coffee", shop: "Coffee House", discount: "100% OFF", code: "COFFEE100", validFrom: "May 25, 2024", validTo: "June 10, 2024", status: "Active", totalRedemptions: 45, usedCount: 12, limit: 50, type: "Free Item" },
  { id: 4, title: "20% Cashback", shop: "Burger King", discount: "20% OFF", code: "BK20", validFrom: "May 22, 2024", validTo: "June 5, 2024", status: "Active", totalRedemptions: 67, usedCount: 34, limit: 150, type: "Percentage" },
];

export default function AllOfferPage() {

   const [modalOpen, setModalOpen] = useState<"offer" | null>(null);
   const offers = useDataStore((state) => state.offers);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8 overflow-x-auto">
        <Topbar />
        
        <div className="mt-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#1d1b4b]">All Offers</h2>
              <p className="text-[#6f6c99] mt-2">Manage and track promotional offers</p>
            </div>
            <button onClick={() => setModalOpen("offer")} className="bg-violet-700 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-violet-800 transition flex items-center gap-2">
              <Plus size={20} />
              Create New Offer
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 border border-[#f0ebff]">
              <p className="text-[#7a7699]">Total Offers</p>
              <h2 className="text-2xl font-bold text-[#1d1b4b] mt-2">85</h2>
              <p className="text-green-500 text-sm mt-2">↑ 8 this month</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#f0ebff]">
              <p className="text-[#7a7699]">Active Offers</p>
              <h2 className="text-2xl font-bold text-[#1d1b4b] mt-2">32</h2>
              <p className="text-blue-500 text-sm mt-2">37.6% active</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#f0ebff]">
              <p className="text-[#7a7699]">Total Redemptions</p>
              <h2 className="text-2xl font-bold text-[#1d1b4b] mt-2">1,234</h2>
              <p className="text-purple-500 text-sm mt-2">Lifetime</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#f0ebff]">
              <p className="text-[#7a7699]">Conversion Rate</p>
              <h2 className="text-2xl font-bold text-[#1d1b4b] mt-2">68%</h2>
              <p className="text-green-500 text-sm mt-2">↑ 12% vs last month</p>
            </div>
          </div>

          {/* Offers Table */}
          <div className="bg-white rounded-[32px] border border-[#f0ebff] overflow-hidden">
            <div className="p-6 border-b border-[#f0ebff]">
              <div className="flex items-center gap-4">
                <input 
                  type="text" 
                  placeholder="Search offers by title or shop..." 
                  className="px-5 py-3 rounded-xl border border-[#e0d9ff] flex-1 focus:outline-none focus:border-violet-500"
                />
                <select className="px-5 py-3 rounded-xl border border-[#e0d9ff] bg-white">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Expired</option>
                  <option>Upcoming</option>
                </select>
                <select className="px-5 py-3 rounded-xl border border-[#e0d9ff] bg-white">
                  <option>All Shops</option>
                  <option>Pizza Hut</option>
                  <option>KFC</option>
                  <option>Burger King</option>
                </select>
              </div>
            </div>
            
            <table className="w-full">
              <thead className="bg-[#faf9ff] border-b border-[#f0ebff]">
                <tr className="text-left text-[#8a86b3]">
                  <th className="p-6 font-semibold">Offer Details</th>
                  <th className="p-6 font-semibold">Shop</th>
                  <th className="p-6 font-semibold">Valid Period</th>
                  <th className="p-6 font-semibold">Code</th>
                  <th className="p-6 font-semibold">Redemptions</th>
                  <th className="p-6 font-semibold">Status</th>
                  <th className="p-6 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {offers.map((offer) => (
                  <tr key={offer.id} className="border-b border-[#f7f5ff] hover:bg-[#faf9ff] transition">
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">
                          <Gift size={18} className="text-pink-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#1d1b4b]">{offer.title}</p>
                          <p className="text-xs text-[#8a86b3]">{offer.discount} • {offer.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <Store size={14} className="text-[#8a86b3]" />
                        <span className="text-[#6f6c99]">{offer.shop}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="space-y-1">
                        <p className="text-sm text-[#6f6c99] flex items-center gap-1"><Calendar size={12} /> From: {offer.validFrom}</p>
                        <p className="text-sm text-[#6f6c99]">To: {offer.validTo}</p>
                      </div>
                    </td>
                    <td className="p-6">
                      <code className="bg-gray-100 px-3 py-1 rounded-lg text-sm font-mono">{offer.code}</code>
                    </td>
                    <td className="p-6">
                      <div>
                        <p className="font-semibold text-[#1d1b4b]">{offer.usedCount} / {offer.limit}</p>
                        <div className="w-24 h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: `${(offer.usedCount / offer.limit) * 100}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${offer.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {offer.status}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="flex gap-2">
                        <button className="p-2 rounded-lg hover:bg-violet-50 text-violet-600"><Eye size={16} /></button>
                        <button className="p-2 rounded-lg hover:bg-violet-50 text-violet-600"><Edit size={16} /></button>
                        <button className="p-2 rounded-lg hover:bg-red-50 text-red-600"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <AddOfferModal isOpen={modalOpen === "offer"} onClose={() => setModalOpen(null)} />
    </div>
  );
}