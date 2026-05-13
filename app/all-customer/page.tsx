// app/all-customer/page.tsx
"use client";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { Users, Mail, Phone, MapPin, Calendar, Eye, MessageCircle } from "lucide-react";

const customers = [
  { id: 1, name: "Rahim", email: "rahim@gmail.com", phone: "+880 1712 345678", location: "Dhaka", joinDate: "Jan 15, 2024", totalRedemptions: 12, totalSpent: 2450, status: "Active", lastActive: "2 hours ago" },
  { id: 2, name: "Karim", email: "karim@gmail.com", phone: "+880 1812 345679", location: "Chittagong", joinDate: "Feb 20, 2024", totalRedemptions: 8, totalSpent: 1820, status: "Active", lastActive: "Yesterday" },
  { id: 3, name: "Fatema", email: "fatema@yahoo.com", phone: "+880 1912 345680", location: "Dhaka", joinDate: "Mar 10, 2024", totalRedemptions: 15, totalSpent: 3210, status: "Active", lastActive: "5 mins ago" },
  { id: 4, name: "Hasan", email: "hasan@gmail.com", phone: "+880 1612 345681", location: "Sylhet", joinDate: "Apr 5, 2024", totalRedemptions: 5, totalSpent: 890, status: "Inactive", lastActive: "2 weeks ago" },
  { id: 5, name: "Nadia", email: "nadia@outlook.com", phone: "+880 1712 345682", location: "Dhaka", joinDate: "Jan 28, 2024", totalRedemptions: 20, totalSpent: 4350, status: "Active", lastActive: "1 hour ago" },
];

export default function AllCustomerPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8 overflow-x-auto">
        <Topbar />
        
        <div className="mt-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#1d1b4b]">All Customers</h2>
              <p className="text-[#6f6c99] mt-2">Manage and view customer details</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-violet-700 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-violet-800 transition flex items-center gap-2">
                <Users size={20} />
                Export CSV
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 border border-[#f0ebff]">
              <p className="text-[#7a7699]">Total Customers</p>
              <h2 className="text-2xl font-bold text-[#1d1b4b] mt-2">4,540</h2>
              <p className="text-green-500 text-sm mt-2">↑ 320 this month</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#f0ebff]">
              <p className="text-[#7a7699]">Active Customers</p>
              <h2 className="text-2xl font-bold text-[#1d1b4b] mt-2">3,892</h2>
              <p className="text-green-500 text-sm mt-2">85.7% active rate</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#f0ebff]">
              <p className="text-[#7a7699]">Avg. Redemptions</p>
              <h2 className="text-2xl font-bold text-[#1d1b4b] mt-2">12.5</h2>
              <p className="text-purple-500 text-sm mt-2">Per customer</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#f0ebff]">
              <p className="text-[#7a7699]">Customer Lifetime</p>
              <h2 className="text-2xl font-bold text-[#1d1b4b] mt-2">₨ 2,450</h2>
              <p className="text-blue-500 text-sm mt-2">Average spent</p>
            </div>
          </div>

          {/* Customers Table */}
          <div className="bg-white rounded-[32px] border border-[#f0ebff] overflow-hidden">
            <div className="p-6 border-b border-[#f0ebff]">
              <div className="flex items-center gap-4">
                <input 
                  type="text" 
                  placeholder="Search customers by name or email..." 
                  className="px-5 py-3 rounded-xl border border-[#e0d9ff] flex-1 focus:outline-none focus:border-violet-500"
                />
                <select className="px-5 py-3 rounded-xl border border-[#e0d9ff] bg-white">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <select className="px-5 py-3 rounded-xl border border-[#e0d9ff] bg-white">
                  <option>All Locations</option>
                  <option>Dhaka</option>
                  <option>Chittagong</option>
                  <option>Sylhet</option>
                </select>
              </div>
            </div>
            
            <table className="w-full">
              <thead className="bg-[#faf9ff] border-b border-[#f0ebff]">
                <tr className="text-left text-[#8a86b3]">
                  <th className="p-6 font-semibold">Customer</th>
                  <th className="p-6 font-semibold">Contact</th>
                  <th className="p-6 font-semibold">Location</th>
                  <th className="p-6 font-semibold">Redemptions</th>
                  <th className="p-6 font-semibold">Total Spent</th>
                  <th className="p-6 font-semibold">Status</th>
                  <th className="p-6 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-b border-[#f7f5ff] hover:bg-[#faf9ff] transition">
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white font-bold">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-[#1d1b4b]">{customer.name}</p>
                          <p className="text-xs text-[#8a86b3]">Joined {customer.joinDate}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="space-y-1">
                        <p className="text-sm text-[#6f6c99] flex items-center gap-1"><Mail size={12} /> {customer.email}</p>
                        <p className="text-sm text-[#6f6c99] flex items-center gap-1"><Phone size={12} /> {customer.phone}</p>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="flex items-center gap-1 text-[#6f6c99]">
                        <MapPin size={14} /> {customer.location}
                      </span>
                    </td>
                    <td className="p-6 font-semibold text-[#1d1b4b]">{customer.totalRedemptions}</td>
                    <td className="p-6 font-semibold text-green-600">₨ {customer.totalSpent}</td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${customer.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {customer.status}
                      </span>
                      <p className="text-xs text-[#8a86b3] mt-1">Last: {customer.lastActive}</p>
                    </td>
                    <td className="p-6">
                      <div className="flex gap-2">
                        <button className="p-2 rounded-lg hover:bg-violet-50 text-violet-600">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-violet-50 text-violet-600">
                          <MessageCircle size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="p-6 border-t border-[#f0ebff] flex items-center justify-between">
              <p className="text-[#8a86b3] text-sm">Showing 1 to 5 of 4,540 customers</p>
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
    </div>
  );
}