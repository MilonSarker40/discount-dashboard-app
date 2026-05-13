// components/Topbar.tsx
"use client";

import { Bell, Search, Command } from "lucide-react";
import { useDashboardStore } from "@/store/dashboardStore";

export default function Topbar() {
  const { searchQuery, setSearchQuery } = useDashboardStore();

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-2xl leading-none font-black text-[#1d1b4b] tracking-tight">
          Dashboard
        </h2>
        <p className="text-[#6f6c99] mt-2 text-xs">Welcome back, Admin! 👋</p>
      </div>

      <div className="flex items-center gap-5">
        {/* Search Bar */}
        <div className="bg-white rounded-xl px-5 py-4 flex items-center gap-3 w-[380px] soft-shadow border border-[#f0ebff]">
          <Search className="text-violet-500" size={20} />
          <input
            type="text"
            placeholder="Search anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="outline-none w-full text-base bg-transparent"
          />
          <div className="bg-[#f4f1ff] px-3 py-1.5 rounded-xl text-[#6f6c99] font-semibold text-xs flex items-center gap-1">
            <Command size={12} /> K
          </div>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <Bell size={28} className="text-[#5b21b6]" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-violet-600 rounded-full text-white text-[10px] font-bold flex items-center justify-center">
            3
          </span>
        </div>

        {/* Avatar */}
        <img
          src="https://i.pravatar.cc/100?img=12"
          alt="avatar"
          className="w-14 h-14 rounded-full border-3 border-white shadow-md"
        />
      </div>
    </div>
  );
}