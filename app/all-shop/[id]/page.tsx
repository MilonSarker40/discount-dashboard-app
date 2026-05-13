// app/all-shop/[id]/page.tsx

"use client";

import { useState } from "react";

import Link from "next/link";
import { useParams } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Gift,
  Ticket,
  Users,
  Edit,
  Trash2,
  Store,
  Eye,
} from "lucide-react";

const shopDetails = {
  1: {
    id: 1,
    name: "Burger King",
    owner: "Nayeem",
    email: "nayeem@burgerking.com",
    phone: "+880123456789",
    location: "Dhaka, Bangladesh",
    address: "Gulshan Avenue, Dhaka",
    joinDate: "15 January 2023",
    status: "Active",
    rating: 4.8,

    totalOffers: 12,
    activeOffers: 8,
    totalRedemptions: 1240,
    totalCustomers: 3240,

    outlets: [
      {
        id: 1,
        name: "Burger King Dhanmondi",
        manager: "Rahim",
        phone: "+880111111111",
        location: "Dhanmondi, Dhaka",
        status: "Active",
      },
      {
        id: 2,
        name: "Burger King Mirpur",
        manager: "Karim",
        phone: "+880222222222",
        location: "Mirpur, Dhaka",
        status: "Active",
      },
    ],

    offers: [
      {
        id: 1,
        title: "Whopper Combo",
        discount: "30% OFF",
        validUntil: "30 June 2024",
        status: "Active",
        redemptions: 320,
      },
      {
        id: 2,
        title: "Family Pack",
        discount: "Buy 1 Get 1",
        validUntil: "25 June 2024",
        status: "Pending",
        redemptions: 180,
      },
    ],

    recentRedemptions: [
      {
        customer: "Rahim",
        offer: "Whopper Combo",
        date: "20 May 2024",
        status: "Completed",
      },
      {
        customer: "Karim",
        offer: "Family Pack",
        date: "19 May 2024",
        status: "Completed",
      },
    ],
  },
};

export default function ShopDetailsPage() {
  const params = useParams();

  const shopId = Number(params.id);

  const shop =
    shopDetails[shopId as keyof typeof shopDetails];

  const [selectedOutlet, setSelectedOutlet] =
    useState<any>(null);

  const [selectedOffer, setSelectedOffer] =
    useState<any>(null);

  const [selectedRedemption, setSelectedRedemption] =
    useState<any>(null);

  const [addOutletModal, setAddOutletModal] =
  useState(false);

  if (!shop) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 p-10">
          <h1 className="text-2xl font-bold">
            Shop Not Found
          </h1>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f7f7fc]">
      <Sidebar />

      <main className="flex-1 px-8 py-6 overflow-x-auto">
        <Topbar />

        {/* Back */}
        <Link href="/all-shop">
          <button className="flex items-center gap-2 mt-6 text-[#6f6c99] hover:text-violet-600">
            <ArrowLeft size={18} />
            Back to Shops
          </button>
        </Link>

        {/* Header */}
        <div className="bg-white rounded-[30px] border border-[#f0ebff] p-6 mt-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-5">
              <div className="w-24 h-24 rounded-[28px] bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-white text-4xl">
                🏪
              </div>

              <div>
                <h2 className="text-2xl font-black text-[#1d1b4b]">
                  {shop.name}
                </h2>

                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-2 text-[#7e7aa7] text-sm">
                    <MapPin size={16} />
                    <p>{shop.location}</p>
                  </div>

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                    {shop.status}
                  </span>

                  <span className="text-yellow-500 text-sm font-bold">
                    ⭐ {shop.rating}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-xl border border-[#ece8ff] text-violet-700 font-semibold flex items-center gap-2 text-sm">
                <Edit size={16} />
                Edit
              </button>

              <button className="px-4 py-2 rounded-xl bg-red-50 text-red-600 font-semibold flex items-center gap-2 text-sm">
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-4 gap-5 mt-5">
          {/* Email */}
          <div className="bg-white rounded-[24px] p-5 border border-[#f0ebff]">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mb-3">
              <Mail
                size={18}
                className="text-blue-600"
              />
            </div>

            <p className="text-[#8a86b3] text-sm">
              Email
            </p>

            <h2 className="text-[#1d1b4b] font-bold mt-2 text-sm">
              {shop.email}
            </h2>
          </div>

          {/* Phone */}
          <div className="bg-white rounded-[24px] p-5 border border-[#f0ebff]">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center mb-3">
              <Phone
                size={18}
                className="text-green-600"
              />
            </div>

            <p className="text-[#8a86b3] text-sm">
              Phone
            </p>

            <h2 className="text-[#1d1b4b] font-bold mt-2 text-sm">
              {shop.phone}
            </h2>
          </div>

          {/* Joined */}
          <div className="bg-white rounded-[24px] p-5 border border-[#f0ebff]">
            <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center mb-3">
              <Calendar
                size={18}
                className="text-violet-600"
              />
            </div>

            <p className="text-[#8a86b3] text-sm">
              Joined
            </p>

            <h2 className="text-[#1d1b4b] font-bold mt-2 text-sm">
              {shop.joinDate}
            </h2>
          </div>

          {/* Customers */}
          <div className="bg-white rounded-[24px] p-5 border border-[#f0ebff]">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center mb-3">
              <Users
                size={18}
                className="text-orange-600"
              />
            </div>

            <p className="text-[#8a86b3] text-sm">
              Customers
            </p>

            <h2 className="text-[#1d1b4b] font-bold mt-2 text-sm">
              {shop.totalCustomers}
            </h2>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-5 mt-5">
          <div className="bg-gradient-to-br from-violet-500 to-purple-700 rounded-[28px] p-6 text-white">
            <Gift size={24} />

            <p className="mt-4 text-sm text-violet-100">
              Total Offers
            </p>

            <h1 className="text-2xl font-bold mt-2">
              {shop.totalOffers}
            </h1>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-[28px] p-6 text-white">
            <Ticket size={24} />

            <p className="mt-4 text-sm text-blue-100">
              Redemptions
            </p>

            <h1 className="text-2xl font-bold mt-2">
              {shop.totalRedemptions}
            </h1>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-[28px] p-6 text-white">
            <Users size={24} />

            <p className="mt-4 text-sm text-green-100">
              Reach
            </p>

            <h1 className="text-2xl font-black mt-2">
              {shop.totalCustomers}
            </h1>
          </div>
        </div>

      {/* Outlet Section Component */}
      <div className="bg-white rounded-[30px] border border-[#f0ebff] p-6 mt-6 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {/* Left */}
          <div>
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className="w-16 h-16 rounded-[22px] bg-violet-100 flex items-center justify-center">
                <Store
                  size={30}
                  className="text-violet-700"
                />
              </div>

              {/* Title */}
              <div>
                <h2 className="text-2xl font-black text-[#1d1b4b]">
                  Outlet List
                </h2>

                <p className="text-[#8a86b3] mt-1 text-sm">
                  {shop.name} has{" "}
                  <span className="font-bold text-violet-700">
                    {shop.outlets.length}
                  </span>{" "}
                  outlets in Bangladesh
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4 mt-5">
              {/* Total */}
              <div className="bg-violet-50 px-5 py-3 rounded-2xl">
                <p className="text-xs text-[#8a86b3]">
                  Total Outlet
                </p>

                <h2 className="text-2xl font-black text-violet-700 mt-1">
                  {shop.outlets.length}
                </h2>
              </div>

              {/* Active */}
              <div className="bg-green-50 px-5 py-3 rounded-2xl">
                <p className="text-xs text-[#8a86b3]">
                  Active Outlet
                </p>

                <h2 className="text-2xl font-black text-green-600 mt-1">
                  {
                    shop.outlets.filter(
                      (o) => o.status === "Active"
                    ).length
                  }
                </h2>
              </div>

              {/* Pending */}
              <div className="bg-orange-50 px-5 py-3 rounded-2xl">
                <p className="text-xs text-[#8a86b3]">
                  Pending Outlet
                </p>

                <h2 className="text-2xl font-black text-orange-600 mt-1">
                  {
                    shop.outlets.filter(
                      (o) => o.status === "Pending"
                    ).length
                  }
                </h2>
              </div>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={() => setAddOutletModal(true)}
            className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-2xl font-semibold text-sm transition-all"
          >
            + Add Outlet
          </button>
        </div>

        {/* Outlet Grid */}
        <div className="grid grid-cols-2 gap-5">
          {shop.outlets.map((outlet) => (
            <div
              key={outlet.id}
              className="border border-[#f1efff] rounded-[24px] p-5 hover:bg-[#faf9ff] transition-all duration-300"
            >
              {/* Top */}
              <div className="flex items-start justify-between">
                {/* Left */}
                <div>
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center mb-4">
                    <Store
                      size={24}
                      className="text-violet-700"
                    />
                  </div>

                  {/* Name */}
                  <h2 className="text-lg font-black text-[#1d1b4b]">
                    {outlet.name}
                  </h2>

                  {/* Manager */}
                  <p className="text-[#6f6c99] mt-3 text-sm">
                    Manager :{" "}
                    <span className="font-semibold">
                      {outlet.manager}
                    </span>
                  </p>

                  {/* Phone */}
                  <p className="text-[#6f6c99] text-sm mt-1">
                    {outlet.phone}
                  </p>

                  {/* Location */}
                  <div className="flex items-center gap-2 mt-3">
                    <MapPin
                      size={16}
                      className="text-violet-500"
                    />

                    <p className="text-[#8a86b3] text-sm">
                      {outlet.location}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    outlet.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {outlet.status}
                </span>
              </div>

              {/* Bottom Buttons */}
              <div className="flex gap-3 mt-5">
                <button
                  onClick={() =>
                    setSelectedOutlet(outlet)
                  }
                  className="flex-1 bg-violet-50 hover:bg-violet-100 text-violet-700 py-3 rounded-2xl font-semibold text-sm transition-all"
                >
                  View Details
                </button>

                <button className="px-4 bg-[#f7f7fc] hover:bg-[#efecff] rounded-2xl text-[#1d1b4b] text-sm font-semibold transition-all">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

        {/* Offers */}
        <div className="bg-white rounded-[30px] border border-[#f0ebff] p-6 mt-6">
          <h2 className="text-2xl font-bold text-[#1d1b4b] mb-6">
            Offer List
          </h2>

          <div className="space-y-5">
            {shop.offers.map((offer) => (
              <div
                key={offer.id}
                className="border border-[#f1efff] rounded-[24px] p-5 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-[#1d1b4b]">
                      {offer.title}
                    </h2>

                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-violet-100 text-violet-700">
                      {offer.status}
                    </span>
                  </div>

                  <p className="text-violet-600 font-bold mt-3 text-sm">
                    {offer.discount}
                  </p>

                  <p className="text-[#8a86b3] mt-2 text-sm">
                    Valid Until {offer.validUntil}
                  </p>
                </div>

                <div className="text-right">
                  <h2 className="text-2xl font-bold text-[#1d1b4b]">
                    {offer.redemptions}
                  </h2>

                  <p className="text-[#8a86b3] text-sm">
                    Redemptions
                  </p>

                  <button
                    onClick={() =>
                      setSelectedOffer(offer)
                    }
                    className="mt-4 bg-violet-50 hover:bg-violet-100 text-violet-700 px-4 py-2 rounded-xl font-semibold text-sm"
                  >
                    Offer Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Redemption */}
        <div className="bg-white rounded-[30px] border border-[#f0ebff] p-6 mt-6 overflow-hidden">
          <h2 className="text-2xl font-bold text-[#1d1b4b] mb-6">
            Redemption List
          </h2>

          <table className="w-full">
            <thead>
              <tr className="border-b border-[#f1efff] text-left text-[#8a86b3] text-sm">
                <th className="pb-4">
                  Customer
                </th>

                <th className="pb-4">
                  Offer
                </th>

                <th className="pb-4">
                  Date
                </th>

                <th className="pb-4">
                  Status
                </th>

                <th className="pb-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {shop.recentRedemptions.map(
                (item, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#f7f5ff]"
                  >
                    <td className="py-5 font-semibold text-[#1d1b4b] text-sm">
                      {item.customer}
                    </td>

                    <td className="py-5 text-[#6f6c99] text-sm">
                      {item.offer}
                    </td>

                    <td className="py-5 text-[#6f6c99] text-sm">
                      {item.date}
                    </td>

                    <td className="py-5">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                        {item.status}
                      </span>
                    </td>

                    <td className="py-5">
                      <button
                        onClick={() =>
                          setSelectedRedemption(
                            item
                          )
                        }
                        className="bg-violet-50 hover:bg-violet-100 text-violet-700 px-4 py-2 rounded-xl font-semibold text-sm"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Outlet Modal */}
        {selectedOutlet && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <div className="bg-white w-[450px] rounded-[30px] p-7">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-black text-[#1d1b4b]">
                  Outlet Details
                </h1>

                <button
                  onClick={() =>
                    setSelectedOutlet(null)
                  }
                >
                  ✕
                </button>
              </div>

              <div className="space-y-5 mt-6">
                <div>
                  <p className="text-[#8a86b3] text-sm">
                    Outlet Name
                  </p>

                  <h2 className="font-bold text-lg">
                    {selectedOutlet.name}
                  </h2>
                </div>

                <div>
                  <p className="text-[#8a86b3] text-sm">
                    Manager
                  </p>

                  <h2 className="font-bold text-lg">
                    {selectedOutlet.manager}
                  </h2>
                </div>

                <div>
                  <p className="text-[#8a86b3] text-sm">
                    Phone
                  </p>

                  <h2 className="font-bold text-lg">
                    {selectedOutlet.phone}
                  </h2>
                </div>

                <div>
                  <p className="text-[#8a86b3] text-sm">
                    Location
                  </p>

                  <h2 className="font-bold text-lg">
                    {selectedOutlet.location}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Offer Modal */}
        {selectedOffer && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <div className="bg-white w-[450px] rounded-[30px] p-7">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-black text-[#1d1b4b]">
                  Offer Details
                </h1>

                <button
                  onClick={() =>
                    setSelectedOffer(null)
                  }
                >
                  ✕
                </button>
              </div>

              <div className="space-y-5 mt-6">
                <div>
                  <p className="text-[#8a86b3] text-sm">
                    Title
                  </p>

                  <h2 className="font-bold text-lg">
                    {selectedOffer.title}
                  </h2>
                </div>

                <div>
                  <p className="text-[#8a86b3] text-sm">
                    Discount
                  </p>

                  <h2 className="font-bold text-lg text-violet-700">
                    {selectedOffer.discount}
                  </h2>
                </div>

                <div>
                  <p className="text-[#8a86b3] text-sm">
                    Valid Until
                  </p>

                  <h2 className="font-bold text-lg">
                    {selectedOffer.validUntil}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Add Outlet Modal */}
      {addOutletModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-[560px] rounded-[32px] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#f1efff] pb-5">
              <div>
                <h1 className="text-2xl font-black text-[#1d1b4b]">
                  Add New Outlet
                </h1>

                <p className="text-sm text-[#8a86b3] mt-1">
                  Create a new outlet for {shop.name}
                </p>
              </div>

              <button
                onClick={() =>
                  setAddOutletModal(false)
                }
                className="w-10 h-10 rounded-2xl bg-[#f7f7fc] hover:bg-[#efecff] transition-all"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <div className="grid grid-cols-2 gap-5 mt-7">
              {/* Outlet Name */}
              <div className="col-span-2">
                <label className="text-sm font-semibold text-[#1d1b4b]">
                  Outlet Name
                </label>

                <input
                  type="text"
                  placeholder="Burger King Uttara"
                  className="w-full mt-2 border border-[#ece8ff] rounded-2xl px-5 py-3 outline-none focus:border-violet-500"
                />
              </div>

              {/* Manager */}
              <div>
                <label className="text-sm font-semibold text-[#1d1b4b]">
                  Manager Name
                </label>

                <input
                  type="text"
                  placeholder="Manager Name"
                  className="w-full mt-2 border border-[#ece8ff] rounded-2xl px-5 py-3 outline-none focus:border-violet-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-semibold text-[#1d1b4b]">
                  Phone Number
                </label>

                <input
                  type="text"
                  placeholder="+8801XXXXXXXXX"
                  className="w-full mt-2 border border-[#ece8ff] rounded-2xl px-5 py-3 outline-none focus:border-violet-500"
                />
              </div>

              {/* Location */}
              <div className="col-span-2">
                <label className="text-sm font-semibold text-[#1d1b4b]">
                  Outlet Location
                </label>

                <input
                  type="text"
                  placeholder="Dhaka, Bangladesh"
                  className="w-full mt-2 border border-[#ece8ff] rounded-2xl px-5 py-3 outline-none focus:border-violet-500"
                />
              </div>

              {/* Status */}
              <div className="col-span-2">
                <label className="text-sm font-semibold text-[#1d1b4b]">
                  Outlet Status
                </label>

                <select className="w-full mt-2 border border-[#ece8ff] rounded-2xl px-5 py-3 outline-none focus:border-violet-500">
                  <option>Active</option>
                  <option>Pending</option>
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-4 mt-8">
              <button className="flex-1 bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-2xl font-semibold transition-all">
                Create Outlet
              </button>

              <button
                onClick={() =>
                  setAddOutletModal(false)
                }
                className="flex-1 bg-[#f7f7fc] hover:bg-[#efecff] text-[#1d1b4b] py-3 rounded-2xl font-semibold transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}  

      {/* Redemption Modal */}
      {selectedRedemption && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-[540px] rounded-[32px] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.15)] animate-in fade-in zoom-in duration-300">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#f1efff] pb-5">
              <div>
                <h1 className="text-2xl font-black text-[#1d1b4b]">
                  Redemption Details
                </h1>

                <p className="text-sm text-[#8a86b3] mt-1">
                  Full redemption information
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedRedemption(null)
                }
                className="w-11 h-11 rounded-2xl bg-[#f7f7fc] hover:bg-[#efecff] transition-all flex items-center justify-center text-[#1d1b4b] font-bold"
              >
                ✕
              </button>
            </div>

            {/* Customer Profile */}
            <div className="flex items-center gap-4 mt-7 bg-[#faf9ff] rounded-[24px] p-5 border border-[#f1efff]">
              <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 text-2xl font-black">
                {selectedRedemption.customer?.charAt(
                  0
                )}
              </div>

              <div>
                <h2 className="text-xl font-black text-[#1d1b4b]">
                  {selectedRedemption.customer}
                </h2>

                <p className="text-sm text-[#8a86b3] mt-1">
                  Premium Customer
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4 mt-6">
              {/* Offer */}
              <div className="bg-[#faf9ff] rounded-[24px] p-5 border border-[#f1efff]">
                <p className="text-xs uppercase tracking-wide text-[#8a86b3]">
                  Offer Name
                </p>

                <h2 className="text-lg font-black text-[#1d1b4b] mt-2">
                  {selectedRedemption.offer}
                </h2>
              </div>

              {/* Date */}
              <div className="bg-[#faf9ff] rounded-[24px] p-5 border border-[#f1efff]">
                <p className="text-xs uppercase tracking-wide text-[#8a86b3]">
                  Redemption Date
                </p>

                <h2 className="text-lg font-black text-[#1d1b4b] mt-2">
                  {selectedRedemption.date}
                </h2>
              </div>

              {/* Status */}
              <div className="bg-[#faf9ff] rounded-[24px] p-5 border border-[#f1efff]">
                <p className="text-xs uppercase tracking-wide text-[#8a86b3]">
                  Status
                </p>

                <div className="mt-3">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold ${
                      selectedRedemption.status ===
                      "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {selectedRedemption.status}
                  </span>
                </div>
              </div>

              {/* Extra Info */}
              <div className="grid grid-cols-2 gap-4">
                {/* Redemption ID */}
                <div className="bg-violet-50 rounded-[24px] p-5">
                  <p className="text-xs text-[#8a86b3]">
                    Redemption ID
                  </p>

                  <h2 className="text-lg font-black text-violet-700 mt-2">
                    #RD-2024-001
                  </h2>
                </div>

                {/* Outlet */}
                <div className="bg-blue-50 rounded-[24px] p-5">
                  <p className="text-xs text-[#8a86b3]">
                    Outlet
                  </p>

                  <h2 className="text-lg font-black text-blue-700 mt-2">
                    Dhanmondi Outlet
                  </h2>
                </div>

                {/* Payment */}
                <div className="bg-green-50 rounded-[24px] p-5">
                  <p className="text-xs text-[#8a86b3]">
                    Payment Status
                  </p>

                  <h2 className="text-lg font-black text-green-700 mt-2">
                    Paid
                  </h2>
                </div>

                {/* Amount */}
                <div className="bg-orange-50 rounded-[24px] p-5">
                  <p className="text-xs text-[#8a86b3]">
                    Discount Amount
                  </p>

                  <h2 className="text-lg font-black text-orange-600 mt-2">
                    ৳500
                  </h2>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex gap-4 mt-8">
              <button className="flex-1 bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-2xl font-semibold transition-all">
                Download Invoice
              </button>

              <button className="flex-1 bg-[#f7f7fc] hover:bg-[#efecff] text-[#1d1b4b] py-3 rounded-2xl font-semibold transition-all">
                Print
              </button>

              <button
                onClick={() =>
                  setSelectedRedemption(null)
                }
                className="px-5 bg-red-50 hover:bg-red-100 text-red-600 rounded-2xl font-semibold transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      </main>
    </div>
  );
}