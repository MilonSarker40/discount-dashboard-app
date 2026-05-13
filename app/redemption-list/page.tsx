"use client";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

import RedemptionTable from "@/components/RedemptionTable";

export default function RedemptionListPage() {
  return (
    <div className="flex min-h-screen bg-[#f7f7fc]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <main className="flex-1 p-6 lg:p-8 overflow-x-auto">
        {/* Topbar */}
        <Topbar />

        <div className="mt-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-black text-[#1d1b4b]">
              Redemption List
            </h1>

            <p className="text-[#8a86b3] mt-2">
              Track all offer
              redemptions and reward
              history
            </p>
          </div>

          {/* Redemption Table */}
          <RedemptionTable />
        </div>
      </main>
    </div>
  );
}