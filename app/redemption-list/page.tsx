// app/redemption-list/page.tsx
"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { Ticket, Store, Calendar, CheckCircle, XCircle, Eye, Filter, Search, Clock, Download, ChevronLeft, ChevronRight, X } from "lucide-react";

const initialRedemptions = [
  { id: 1, customer: "Rahim", customerEmail: "rahim@gmail.com", offer: "50% OFF Pizza", shop: "Pizza Hut", date: "May 20, 2024", time: "2:30 PM", status: "Completed", points: 50, location: "Gulshan, Dhaka" },
  { id: 2, customer: "Karim", customerEmail: "karim@gmail.com", offer: "Buy 1 Get 1", shop: "KFC", date: "May 20, 2024", time: "6:45 PM", status: "Completed", points: 30, location: "Uttara, Dhaka" },
  { id: 3, customer: "Fatema", customerEmail: "fatema@yahoo.com", offer: "Free Coffee", shop: "Coffee House", date: "May 19, 2024", time: "10:15 AM", status: "Completed", points: 20, location: "Mirpur, Dhaka" },
  { id: 4, customer: "Hasan", customerEmail: "hasan@gmail.com", offer: "20% Cashback", shop: "Burger King", date: "May 19, 2024", time: "8:00 PM", status: "Pending", points: 40, location: "Dhanmondi, Dhaka" },
  { id: 5, customer: "Nadia", customerEmail: "nadia@outlook.com", offer: "Whopper Combo", shop: "Burger King", date: "May 18, 2024", time: "1:20 PM", status: "Completed", points: 60, location: "Banani, Dhaka" },
  { id: 6, customer: "Rafiq", customerEmail: "rafiq@gmail.com", offer: "Pizza Meal", shop: "Pizza Hut", date: "May 18, 2024", time: "7:30 PM", status: "Failed", points: 0, location: "Mohakhali, Dhaka" },
  { id: 7, customer: "Sadia", customerEmail: "sadia@gmail.com", offer: "30% OFF Burger", shop: "Burger King", date: "May 17, 2024", time: "1:00 PM", status: "Completed", points: 45, location: "Uttara, Dhaka" },
  { id: 8, customer: "Tanvir", customerEmail: "tanvir@yahoo.com", offer: "Free Fries", shop: "KFC", date: "May 16, 2024", time: "8:30 PM", status: "Completed", points: 15, location: "Gulshan, Dhaka" },
];

export default function RedemptionListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All time");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedRedemption, setSelectedRedemption] = useState<any>(null);
  
  const itemsPerPage = 5;

  // Filter redemptions
  const filteredRedemptions = initialRedemptions.filter(redemption => {
    const matchesSearch = redemption.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         redemption.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         redemption.offer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         redemption.shop.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || redemption.status === statusFilter;
    
    // Date filtering logic
    let matchesDate = true;
    if (dateFilter !== "All time") {
      const redemptionDate = new Date(redemption.date);
      const today = new Date();
      const daysDiff = Math.floor((today.getTime() - redemptionDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (dateFilter === "Last 7 days") matchesDate = daysDiff <= 7;
      else if (dateFilter === "Last 30 days") matchesDate = daysDiff <= 30;
      else if (dateFilter === "Last 90 days") matchesDate = daysDiff <= 90;
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRedemptions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRedemptions = filteredRedemptions.slice(startIndex, startIndex + itemsPerPage);

  // Stats
  const stats = {
    total: initialRedemptions.length,
    completed: initialRedemptions.filter(r => r.status === "Completed").length,
    pending: initialRedemptions.filter(r => r.status === "Pending").length,
    failed: initialRedemptions.filter(r => r.status === "Failed").length,
    totalPoints: initialRedemptions.reduce((sum, r) => sum + r.points, 0),
    todayRedemptions: initialRedemptions.filter(r => r.date === "May 20, 2024").length
  };

  const getStatusConfig = (status: string) => {
    switch(status) {
      case "Completed":
        return { bg: "bg-green-100", text: "text-green-700", icon: <CheckCircle size={12} />, label: "Completed" };
      case "Pending":
        return { bg: "bg-orange-100", text: "text-orange-700", icon: <Clock size={12} />, label: "Pending" };
      case "Failed":
        return { bg: "bg-red-100", text: "text-red-700", icon: <XCircle size={12} />, label: "Failed" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-700", icon: null, label: status };
    }
  };

  const handleExport = () => {
    // Create CSV content
    const headers = ["Customer", "Email", "Offer", "Shop", "Date", "Time", "Status", "Points", "Location"];
    const csvData = filteredRedemptions.map(r => [
      r.customer, r.customerEmail, r.offer, r.shop, r.date, r.time, r.status, r.points, r.location
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `redemptions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8 overflow-x-auto">
        <Topbar />
        
        <div className="mt-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[#1d1b4b]">Redemption List</h2>
              <p className="text-[#6f6c99] mt-2">Track all offer redemptions and customer rewards</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowFilterModal(true)}
                className="border border-[#e0d9ff] text-violet-700 px-6 py-3 rounded-2xl font-semibold hover:bg-violet-50 transition flex items-center gap-2"
              >
                <Filter size={20} />
                Filter
              </button>
              <button 
                onClick={handleExport}
                className="bg-violet-700 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-violet-800 transition flex items-center gap-2"
              >
                <Download size={20} />
                Export Report
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-5 border border-[#f0ebff]">
              <p className="text-[#7a7699] text-sm">Total Redemptions</p>
              <h2 className="text-2xl font-bold text-[#1d1b4b] mt-1">{stats.total}</h2>
              <p className="text-green-500 text-xs mt-2">↑ {stats.todayRedemptions} today</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-[#f0ebff]">
              <p className="text-[#7a7699] text-sm">Completed</p>
              <h2 className="text-2xl font-bold text-green-600 mt-1">{stats.completed}</h2>
              <p className="text-green-500 text-xs mt-2">{Math.round((stats.completed/stats.total)*100)}% success rate</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-[#f0ebff]">
              <p className="text-[#7a7699] text-sm">Pending</p>
              <h2 className="text-2xl font-bold text-orange-600 mt-1">{stats.pending}</h2>
              <p className="text-orange-500 text-xs mt-2">Awaiting approval</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-[#f0ebff]">
              <p className="text-[#7a7699] text-sm">Failed</p>
              <h2 className="text-2xl font-bold text-red-600 mt-1">{stats.failed}</h2>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-[#f0ebff]">
              <p className="text-[#7a7699] text-sm">Total Points Given</p>
              <h2 className="text-2xl font-bold text-purple-600 mt-1">{stats.totalPoints.toLocaleString()}</h2>
              <p className="text-purple-500 text-xs mt-2">Rewards distributed</p>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-white rounded-[32px] border border-[#f0ebff] overflow-hidden">
            <div className="p-6 border-b border-[#f0ebff]">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8a86b3]" size={18} />
                    <input 
                      type="text" 
                      placeholder="Search by customer name, email, or offer..." 
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#e0d9ff] focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                    />
                  </div>
                </div>
                <select 
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-5 py-3 rounded-xl border border-[#e0d9ff] bg-white focus:outline-none focus:border-violet-500"
                >
                  <option>All Status</option>
                  <option>Completed</option>
                  <option>Pending</option>
                  <option>Failed</option>
                </select>
                <select 
                  value={dateFilter}
                  onChange={(e) => {
                    setDateFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-5 py-3 rounded-xl border border-[#e0d9ff] bg-white focus:outline-none focus:border-violet-500"
                >
                  <option>All time</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
                {(searchTerm || statusFilter !== "All" || dateFilter !== "All time") && (
                  <button 
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("All");
                      setDateFilter("All time");
                      setCurrentPage(1);
                    }}
                    className="px-5 py-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 flex items-center gap-2 transition"
                  >
                    <X size={16} />
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
            
            {/* Redemptions Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-[#faf9ff] border-b border-[#f0ebff]">
                  <tr className="text-left text-[#8a86b3]">
                    <th className="p-6 font-semibold">Customer</th>
                    <th className="p-6 font-semibold">Offer</th>
                    <th className="p-6 font-semibold">Shop</th>
                    <th className="p-6 font-semibold">Date & Time</th>
                    <th className="p-6 font-semibold">Points</th>
                    <th className="p-6 font-semibold">Status</th>
                    <th className="p-6 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRedemptions.length > 0 ? (
                    paginatedRedemptions.map((redemption) => {
                      const statusConfig = getStatusConfig(redemption.status);
                      return (
                        <tr key={redemption.id} className="border-b border-[#f7f5ff] hover:bg-[#faf9ff] transition cursor-pointer" onClick={() => setSelectedRedemption(redemption)}>
                          <td className="p-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white font-bold">
                                {redemption.customer.charAt(0)}
                              </div>
                              <div>
                                <p className="font-semibold text-[#1d1b4b]">{redemption.customer}</p>
                                <p className="text-xs text-[#8a86b3]">{redemption.customerEmail}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-6">
                            <div>
                              <p className="font-medium text-[#1d1b4b]">{redemption.offer}</p>
                              <p className="text-xs text-[#8a86b3]">📍 {redemption.location}</p>
                            </div>
                           </td>
                          <td className="p-6">
                            <div className="flex items-center gap-2">
                              <Store size={14} className="text-[#8a86b3]" />
                              <span className="text-[#6f6c99]">{redemption.shop}</span>
                            </div>
                           </td>
                          <td className="p-6">
                            <div className="space-y-1">
                              <p className="text-sm text-[#6f6c99] flex items-center gap-1">
                                <Calendar size={12} /> {redemption.date}
                              </p>
                              <p className="text-xs text-[#8a86b3]">{redemption.time}</p>
                            </div>
                           </td>
                          <td className="p-6">
                            <span className="font-semibold text-purple-600">{redemption.points} pts</span>
                           </td>
                          <td className="p-6">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}>
                              {statusConfig.icon}
                              {statusConfig.label}
                            </span>
                           </td>
                          <td className="p-6">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedRedemption(redemption);
                              }}
                              className="p-2 rounded-lg hover:bg-violet-50 text-violet-600 transition"
                            >
                              <Eye size={16} />
                            </button>
                           </td>
                         </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} className="p-12 text-center text-[#8a86b3]">
                        No redemptions found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            {filteredRedemptions.length > 0 && (
              <div className="p-6 border-t border-[#f0ebff] flex items-center justify-between flex-wrap gap-4">
                <p className="text-[#8a86b3] text-sm">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredRedemptions.length)} of {filteredRedemptions.length} redemptions
                </p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-[#e0d9ff] hover:bg-violet-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) pageNum = i + 1;
                    else if (currentPage <= 3) pageNum = i + 1;
                    else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                    else pageNum = currentPage - 2 + i;
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-4 py-2 rounded-lg transition ${
                          currentPage === pageNum
                            ? "bg-violet-600 text-white"
                            : "border border-[#e0d9ff] hover:bg-violet-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-[#e0d9ff] hover:bg-violet-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowFilterModal(false)}>
          <div className="bg-white rounded-[32px] max-w-md w-full" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-[#f0ebff] flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#1d1b4b]">Advanced Filters</h2>
              <button onClick={() => setShowFilterModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-[#1d1b4b] font-semibold mb-2">Status</label>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#e0d9ff] focus:outline-none focus:border-violet-500"
                >
                  <option>All Status</option>
                  <option>Completed</option>
                  <option>Pending</option>
                  <option>Failed</option>
                </select>
              </div>
              <div>
                <label className="block text-[#1d1b4b] font-semibold mb-2">Date Range</label>
                <select 
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#e0d9ff] focus:outline-none focus:border-violet-500"
                >
                  <option>All time</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-[#f0ebff] flex gap-3">
              <button 
                onClick={() => {
                  setStatusFilter("All");
                  setDateFilter("All time");
                }}
                className="flex-1 px-6 py-3 rounded-xl border border-[#e0d9ff] font-semibold hover:bg-gray-50"
              >
                Reset
              </button>
              <button 
                onClick={() => setShowFilterModal(false)}
                className="flex-1 px-6 py-3 rounded-xl bg-violet-700 text-white font-semibold hover:bg-violet-800"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedRedemption && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedRedemption(null)}>
          <div className="bg-white rounded-[32px] max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-[#f0ebff] flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#1d1b4b]">Redemption Details</h2>
              <button onClick={() => setSelectedRedemption(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b border-[#f0ebff]">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                  {selectedRedemption.customer.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1d1b4b]">{selectedRedemption.customer}</h3>
                  <p className="text-[#8a86b3]">{selectedRedemption.customerEmail}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[#8a86b3]">Offer</p>
                  <p className="font-semibold text-[#1d1b4b]">{selectedRedemption.offer}</p>
                </div>
                <div>
                  <p className="text-xs text-[#8a86b3]">Shop</p>
                  <p className="font-semibold text-[#1d1b4b]">{selectedRedemption.shop}</p>
                </div>
                <div>
                  <p className="text-xs text-[#8a86b3]">Location</p>
                  <p className="font-semibold text-[#1d1b4b]">{selectedRedemption.location}</p>
                </div>
                <div>
                  <p className="text-xs text-[#8a86b3]">Points Earned</p>
                  <p className="font-semibold text-purple-600 text-xl">{selectedRedemption.points} pts</p>
                </div>
                <div>
                  <p className="text-xs text-[#8a86b3]">Date</p>
                  <p className="font-semibold text-[#1d1b4b]">{selectedRedemption.date}</p>
                </div>
                <div>
                  <p className="text-xs text-[#8a86b3]">Time</p>
                  <p className="font-semibold text-[#1d1b4b]">{selectedRedemption.time}</p>
                </div>
              </div>
              <div className="pt-4">
                <p className="text-xs text-[#8a86b3]">Status</p>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold mt-1 ${getStatusConfig(selectedRedemption.status).bg} ${getStatusConfig(selectedRedemption.status).text}`}>
                  {getStatusConfig(selectedRedemption.status).icon}
                  {getStatusConfig(selectedRedemption.status).label}
                </span>
              </div>
            </div>
            <div className="p-6 border-t border-[#f0ebff]">
              <button 
                onClick={() => setSelectedRedemption(null)}
                className="w-full px-6 py-3 rounded-xl bg-violet-700 text-white font-semibold hover:bg-violet-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}