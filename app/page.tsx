"use client";

import { useEffect } from "react";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

import StatCard from "@/components/StatCard";
import OfferList from "@/components/OfferList";
import UserTable from "@/components/UserTable";
import FreelancerApproval from "@/components/FreelancerApproval";
import ShopCardGrid from "@/components/ShopCardGrid";
import RedemptionTable from "@/components/RedemptionTable";

import {
  Store,
  Users,
  Gift,
  Ticket,
} from "lucide-react";

import { useShopStore } from "@/store/shopStore";
import { useOfferStore } from "@/store/offerStore";
import { useCustomerStore } from "@/store/customers";
import { useRedemptionStore } from "@/store/redemptionStore";

export default function DashboardPage() {
  /* -----------------------------
   STORES
  ----------------------------- */

  const {
    shops,
    fetchShops,
  } = useShopStore();

  const {
    offers,
    fetchOffers,
  } = useOfferStore();

  const {
    customers,
    fetchCustomers,
  } = useCustomerStore();

  const {
    redemptions,
    fetchRedemptions,
  } = useRedemptionStore();

  /* -----------------------------
   FETCH DATA
  ----------------------------- */

  useEffect(() => {
    fetchShops();

    fetchOffers();

    fetchCustomers();

    fetchRedemptions();
  }, []);

  /* -----------------------------
   STATS
  ----------------------------- */

  const completedRedemptions =
    redemptions.filter(
      (item) =>
        item.status ===
        "completed"
    );

  const stats = [
    {
      title: "Total Shops",

      value:
        shops.length.toString(),

      change: "+12",

      color: "purple" as const,

      icon: <Store size={28} />,
    },

    {
      title: "Total Customers",

      value:
        customers.length.toString(),

      change: "+320",

      color: "blue" as const,

      icon: <Users size={28} />,
    },

    {
      title: "Total Offers",

      value:
        offers.length.toString(),

      change: "+8",

      color: "pink" as const,

      icon: <Gift size={28} />,
    },

    {
      title: "Daily Redemption",

      value:
        completedRedemptions.length.toString(),

      change: "+28",

      color: "green" as const,

      icon: <Ticket size={28} />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#f7f7fc]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <main className="flex-1 p-6 lg:p-8 overflow-x-auto">
        {/* Topbar */}
        <Topbar />

        <div className="mt-8">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map(
              (stat, idx) => (
                <StatCard
                  key={idx}
                  {...stat}
                />
              )
            )}
          </div>

          {/* Middle Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Offers */}
            <div className="lg:col-span-1">
              <OfferList
                offers={offers.slice(
                  0,
                  3
                )}
              />
            </div>

            {/* Users */}
            <div className="lg:col-span-1">
              <UserTable />
            </div>

            {/* Freelancer */}
            <div className="lg:col-span-1">
              <FreelancerApproval />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Shops */}
            <ShopCardGrid />

            {/* Redemption */}
            <RedemptionTable />
          </div>
        </div>
      </main>
    </div>
  );
}