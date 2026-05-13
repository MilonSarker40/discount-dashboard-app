"use client";

import { useEffect } from "react";

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
  Edit,
  Trash2,
  Store,
  Eye,
} from "lucide-react";

import { useShopStore } from "@/store/shopStore";

import { useOutletStore } from "@/store/outletStore";

export default function ShopDetailsPage() {
  const params = useParams();

  const shopId = params.id as string;

  /* --------------------------------
   SHOP STORE
  -------------------------------- */

  const {
    selectedShop: shop,
    fetchShopById,
    loading,
  } = useShopStore();

  /* --------------------------------
   OUTLET STORE
  -------------------------------- */

  const {
    outlets,
    fetchOutletsByShopId,
  } = useOutletStore();

  /* --------------------------------
   FETCH DATA
  -------------------------------- */

  useEffect(() => {
    const loadData =
      async () => {
        if (!shopId) return;

        await fetchShopById(
          shopId
        );

        await fetchOutletsByShopId(
          shopId
        );
      };

    loadData();
  }, [shopId]);

  /* --------------------------------
   LOADING
  -------------------------------- */

  if (loading || !shop) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f7f7fc]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <main className="flex-1 px-8 py-6 overflow-x-auto">
        {/* Topbar */}
        <Topbar />

        {/* Back */}
        <Link href="/all-shop">
          <button className="flex items-center gap-2 mt-6 text-[#6f6c99] hover:text-violet-600 transition">
            <ArrowLeft size={18} />
            Back to Shops
          </button>
        </Link>

        {/* =======================================
           SHOP HEADER
        ======================================= */}

        <div className="bg-white rounded-[32px] border border-[#f0ebff] p-7 mt-5 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            {/* LEFT */}
            <div className="flex flex-col sm:flex-row gap-6">
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={
                    shop.shop_image_url ||
                    "/shop.png"
                  }
                  alt={shop.name}
                  className="w-32 h-32 rounded-[30px] object-cover border border-[#ece8ff]"
                />

                {/* STATUS DOT */}
                <div
                  className={`absolute bottom-2 right-2 w-5 h-5 rounded-full border-[3px] border-white ${
                    shop.is_active
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                />
              </div>

              {/* INFO */}
              <div>
                <h1 className="text-4xl font-black text-[#1d1b4b]">
                  {shop.name}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mt-4">
                  {/* ADDRESS */}
                  <div className="flex items-center gap-2 text-[#7e7aa7]">
                    <MapPin size={16} />

                    <span className="text-sm">
                      {
                        shop.address
                      }
                    </span>
                  </div>

                  {/* STATUS */}
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                      shop.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {shop.is_active
                      ? "Active"
                      : "Inactive"}
                  </span>
                </div>

                {/* ABOUT */}
                <p className="text-[#7e7aa7] mt-5 max-w-3xl leading-7">
                  {shop.about ||
                    "No description available"}
                </p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3">
              {/* EDIT */}
              <button className="px-5 py-3 rounded-2xl border border-[#ece8ff] text-violet-700 font-semibold flex items-center gap-2 hover:bg-violet-50 transition">
                <Edit size={18} />
                Edit
              </button>

              {/* DELETE */}
              <button className="px-5 py-3 rounded-2xl bg-red-50 text-red-600 font-semibold flex items-center gap-2 hover:bg-red-100 transition">
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* =======================================
           INFO CARDS
        ======================================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-6">
          {/* EMAIL */}
          <div className="bg-white rounded-[28px] border border-[#f0ebff] p-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
              <Mail
                size={20}
                className="text-blue-600"
              />
            </div>

            <p className="text-[#8a86b3] text-sm mt-4">
              Email Address
            </p>

            <h2 className="text-[#1d1b4b] font-bold mt-2 break-all">
              {shop.email ||
                "N/A"}
            </h2>
          </div>

          {/* PHONE */}
          <div className="bg-white rounded-[28px] border border-[#f0ebff] p-6">
            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
              <Phone
                size={20}
                className="text-green-600"
              />
            </div>

            <p className="text-[#8a86b3] text-sm mt-4">
              Mobile Number
            </p>

            <h2 className="text-[#1d1b4b] font-bold mt-2">
              {
                shop.mobile_number
              }
            </h2>
          </div>

          {/* CREATED */}
          <div className="bg-white rounded-[28px] border border-[#f0ebff] p-6">
            <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center">
              <Calendar
                size={20}
                className="text-violet-600"
              />
            </div>

            <p className="text-[#8a86b3] text-sm mt-4">
              Created At
            </p>

            <h2 className="text-[#1d1b4b] font-bold mt-2">
              {new Date(
                shop.created_at
              ).toLocaleDateString()}
            </h2>
          </div>

          {/* OUTLET COUNT */}
          <div className="bg-white rounded-[28px] border border-[#f0ebff] p-6">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
              <Store
                size={20}
                className="text-orange-600"
              />
            </div>

            <p className="text-[#8a86b3] text-sm mt-4">
              Total Outlets
            </p>

            <h2 className="text-[#1d1b4b] text-3xl font-black mt-2">
              {outlets.length}
            </h2>
          </div>
        </div>

        {/* =======================================
           LOCATION
        ======================================= */}

        <div className="bg-white rounded-[32px] border border-[#f0ebff] p-7 mt-6">
          <h2 className="text-2xl font-bold text-[#1d1b4b] mb-6">
            Shop Location
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* ADDRESS */}
            <div className="bg-[#faf9ff] rounded-3xl p-5 border border-[#f0ebff]">
              <p className="text-[#8a86b3] text-sm">
                Address
              </p>

              <h2 className="font-bold text-[#1d1b4b] mt-3">
                {shop.address}
              </h2>
            </div>

            {/* LAT */}
            <div className="bg-[#faf9ff] rounded-3xl p-5 border border-[#f0ebff]">
              <p className="text-[#8a86b3] text-sm">
                Latitude
              </p>

              <h2 className="font-bold text-[#1d1b4b] mt-3">
                {shop.latitude}
              </h2>
            </div>

            {/* LNG */}
            <div className="bg-[#faf9ff] rounded-3xl p-5 border border-[#f0ebff]">
              <p className="text-[#8a86b3] text-sm">
                Longitude
              </p>

              <h2 className="font-bold text-[#1d1b4b] mt-3">
                {
                  shop.longitude
                }
              </h2>
            </div>
          </div>
        </div>

        {/* =======================================
           OUTLETS
        ======================================= */}

        <div className="bg-white rounded-[32px] border border-[#f0ebff] p-7 mt-6">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-[#1d1b4b]">
                Shop Outlets
              </h2>

              <p className="text-[#8a86b3] mt-2">
                Total outlets:{" "}
                {
                  outlets.length
                }
              </p>
            </div>

            <div className="w-16 h-16 rounded-3xl bg-violet-100 text-violet-700 flex items-center justify-center">
              <Store size={30} />
            </div>
          </div>

          {/* EMPTY */}
          {outlets.length ===
            0 && (
            <div className="border border-dashed border-[#e6ddff] rounded-[30px] p-14 text-center">
              <Store className="w-16 h-16 text-violet-300 mx-auto mb-5" />

              <h2 className="text-2xl font-bold text-[#1d1b4b]">
                No Outlet Found
              </h2>

              <p className="text-[#8a86b3] mt-2">
                This shop has no
                outlets yet
              </p>
            </div>
          )}

          {/* OUTLET LIST */}
          <div className="space-y-5">
            {outlets.map(
              (outlet) => (
                <div
                  key={outlet.id}
                  className="border border-[#f0ebff] rounded-[30px] p-5 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* LEFT */}
                    <div className="flex items-center gap-5">
                      {/* IMAGE */}
                      <img
                        src={
                          outlet.outlet_image ||
                          "/shop.png"
                        }
                        alt={
                          outlet.name
                        }
                        className="w-28 h-28 rounded-[28px] object-cover border border-[#ece8ff]"
                      />

                      {/* INFO */}
                      <div>
                        <h2 className="text-2xl font-black text-[#1d1b4b]">
                          {
                            outlet.name
                          }
                        </h2>

                        <p className="text-violet-500 mt-3 font-medium">
                          {
                            outlet.contact_number
                          }
                        </p>

                        <div className="flex items-center gap-2 mt-3 text-[#7e7aa7] text-sm">
                          <MapPin
                            size={14}
                          />

                          <span>
                            {
                              outlet.address
                            }
                          </span>
                        </div>

                        {/* STATUS */}
                        <div className="mt-4">
                          <span
                            className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                              outlet.is_active
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {outlet.is_active
                              ? "Active"
                              : "Inactive"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* BUTTON */}
                    <Link
                      href={`/outlet/${outlet.id}`}
                    >
                      <button className="px-6 py-3 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-semibold flex items-center gap-2 transition">
                        <Eye size={18} />
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </main>
    </div>
  );
}