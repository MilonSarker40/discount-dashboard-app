// app/all-customer/page.tsx
"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { Users, Mail, Phone, MapPin, Calendar, Eye, MessageCircle, Loader2 } from "lucide-react";
import { useCustomerStore, Customer } from "@/store/customers";

export default function AllCustomerPage() {
  const { customers, loading, error, fetchCustomers } = useCustomerStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [locationFilter, setLocationFilter] = useState("All Locations");

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  // Get unique locations
  const locations = Array.from(new Set(customers.map(c => c.location)));

  // Filter customers
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "All Status" || customer.status === statusFilter;
    const matchesLocation = locationFilter === "All Locations" || customer.location === locationFilter;

    return matchesSearch && matchesStatus && matchesLocation;
  });

  // Calculate stats
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'Active').length;
  const avgRedemptions = totalCustomers > 0 
    ? (customers.reduce((sum, c) => sum + (c.total_redemptions || 0), 0) / totalCustomers).toFixed(1)
    : '0';
  const avgSpent = totalCustomers > 0
    ? Math.round(customers.reduce((sum, c) => sum + (c.total_spent || 0), 0) / totalCustomers)
    : 0;

  if (loading && customers.length === 0) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8 overflow-x-auto">
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-violet-600 mx-auto" />
              <p className="mt-4 text-[#6f6c99]">Loading customers...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
              <h2 className="text-2xl font-bold text-[#1d1b4b] mt-2">{totalCustomers}</h2>
              <p className="text-green-500 text-sm mt-2">↑ {activeCustomers} active</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#f0ebff]">
              <p className="text-[#7a7699]">Active Customers</p>
              <h2 className="text-2xl font-bold text-[#1d1b4b] mt-2">{activeCustomers}</h2>
              <p className="text-green-500 text-sm mt-2">
                {totalCustomers > 0 ? `${((activeCustomers / totalCustomers) * 100).toFixed(1)}%` : '0%'} active rate
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#f0ebff]">
              <p className="text-[#7a7699]">Avg. Redemptions</p>
              <h2 className="text-2xl font-bold text-[#1d1b4b] mt-2">{avgRedemptions}</h2>
              <p className="text-purple-500 text-sm mt-2">Per customer</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#f0ebff]">
              <p className="text-[#7a7699]">Customer Lifetime</p>
              <h2 className="text-2xl font-bold text-[#1d1b4b] mt-2">৳ {avgSpent}</h2>
              <p className="text-blue-500 text-sm mt-2">Average spent</p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
              {error}
            </div>
          )}

          {/* Customers Table */}
          <div className="bg-white rounded-[32px] border border-[#f0ebff] overflow-hidden">
            <div className="p-6 border-b border-[#f0ebff]">
              <div className="flex items-center gap-4">
                <input 
                  type="text" 
                  placeholder="Search customers by name or email..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-5 py-3 rounded-xl border border-[#e0d9ff] flex-1 focus:outline-none focus:border-violet-500"
                />
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-5 py-3 rounded-xl border border-[#e0d9ff] bg-white"
                >
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <select 
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="px-5 py-3 rounded-xl border border-[#e0d9ff] bg-white"
                >
                  <option>All Locations</option>
                  {locations.map(loc => (
                    <option key={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {filteredCustomers.length === 0 ? (
              <div className="p-12 text-center">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-[#8a86b3] text-lg">No customers found</p>
                <p className="text-[#8a86b3] text-sm mt-2">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <>
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
                    {filteredCustomers.map((customer) => (
                      <tr key={customer.id} className="border-b border-[#f7f5ff] hover:bg-[#faf9ff] transition">
                        <td className="p-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white font-bold">
                              {customer.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-[#1d1b4b]">{customer.name}</p>
                              <p className="text-xs text-[#8a86b3]">
                                Joined {new Date(customer.join_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </p>
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
                        <td className="p-6 font-semibold text-[#1d1b4b]">{customer.total_redemptions || 0}</td>
                        <td className="p-6 font-semibold text-green-600">৳ {customer.total_spent || 0}</td>
                        <td className="p-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            customer.status === 'Active' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {customer.status}
                          </span>
                          {customer.last_active && (
                            <p className="text-xs text-[#8a86b3] mt-1">
                              Last: {new Date(customer.last_active).toLocaleDateString()}
                            </p>
                          )}
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
                  <p className="text-[#8a86b3] text-sm">
                    Showing {filteredCustomers.length} of {totalCustomers} customers
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}