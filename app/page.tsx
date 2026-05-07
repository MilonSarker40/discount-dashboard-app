// app/page.tsx
"use client";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import StatCard from "@/components/StatCard";
import OfferList from "@/components/OfferList";
import UserTable from "@/components/UserTable";
import FreelancerApproval from "@/components/FreelancerApproval";
import ShopCardGrid from "@/components/ShopCardGrid";
import RedemptionTable from "@/components/RedemptionTable";
import { Store, Users, Gift, Ticket } from "lucide-react";

export default function Home() {
  const stats = [
    { title: "Total Shops", value: "120", change: "+12", color: "purple" as const, icon: <Store size={28} /> },
    { title: "Total Customers", value: "4,540", change: "+320", color: "blue" as const, icon: <Users size={28} /> },
    { title: "Total Offers", value: "85", change: "+8", color: "pink" as const, icon: <Gift size={28} /> },
    { title: "Daily Redemption", value: "230", change: "+28", color: "green" as const, icon: <Ticket size={28} /> },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8 overflow-x-auto">
        <Topbar />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </div>

        {/* Middle Section: Offer List + User Table + Freelancer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <OfferList />
          </div>
          <div className="lg:col-span-1">
            <UserTable />
          </div>
          <div className="lg:col-span-1">
            <FreelancerApproval />
          </div>
        </div>

        {/* Bottom Section: Shop Details + Redemption List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ShopCardGrid />
          <RedemptionTable />
        </div>
      </main>
    </div>
  );
}