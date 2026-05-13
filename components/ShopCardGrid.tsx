"use client";

import Link from "next/link";

import {
  Trash2,
  Edit,
  Store,
  MapPin,
  Eye,
} from "lucide-react";

import { useShopStore } from "@/store/shopStore";

export default function ShopCardGrid() {
  const {
    shops,
    deleteShop,
  } = useShopStore();

  return (
    <div className="glass-card p-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1d1b4b]">
            Shop 
          </h2>

          <p className="text-[#8a86b3] mt-1 text-sm">
            Latest registered shops
          </p>
        </div>

        <Link href="/all-shop">
          <button className="bg-violet-500 hover:bg-violet-700 text-white px-5 py-2 rounded-xl font-semibold transition">
            View All
          </button>
        </Link>
      </div>

      {/* Empty */}
      {shops.length === 0 && (
        <div className="bg-[#faf9ff] border border-[#f0ebff] rounded-3xl p-10 text-center">
          <Store className="w-14 h-14 text-violet-300 mx-auto mb-4" />

          <h2 className="text-xl font-bold text-[#1d1b4b]">
            No Shops Found
          </h2>

          <p className="text-[#8a86b3] mt-2">
            Shops will appear here
          </p>
        </div>
      )}

      {/* Shop List */}
      <div className="space-y-5">
        {shops
          .slice(0, 3)
          .map((shop) => (
            <div
              key={shop.id}
              className="group relative p-5 rounded-[30px] border border-[#ece8ff] bg-white hover:shadow-[0_15px_40px_rgba(115,103,240,0.08)] hover:border-violet-200 transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-5">
                {/* LEFT */}
                <div className="flex items-center gap-5 flex-1 min-w-0">
                  {/* Image */}
                  <div className="relative shrink-0">
                    <img
                      src={
                        shop.shop_image_url ||
                        "/shop.png"
                      }
                      alt={
                        shop.name
                      }
                      className="w-24 h-24 rounded-[24px] object-cover border border-[#ece8ff]"
                    />

                    {/* Active Dot */}
                    <div
                      className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-[3px] border-white ${
                        shop.is_active
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    />
                  </div>

                  {/* INFO */}
                  <div className="min-w-0 flex-1">
                    {/* Name */}
                    <h3 className="text-2xl font-black text-[#1d1b4b] truncate">
                      {shop.name}
                    </h3>

                    {/* Phone */}
                    <p className="text-violet-500 mt-2 text-lg font-medium">
                      {
                        shop.mobile_number
                      }
                    </p>

                    {/* Address */}
                    <div className="flex items-center gap-2 mt-3 text-[#8a86b3]">
                      <MapPin
                        size={15}
                      />

                      <span className="text-sm truncate">
                        {
                          shop.address
                        }
                      </span>
                    </div>

                    {/* Status */}
                    <div className="mt-4">
                      <span
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
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
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-3 shrink-0">
                  {/* Edit */}
                  <button className="w-12 h-12 rounded-2xl bg-violet-50 hover:bg-violet-100 text-violet-600 flex items-center justify-center transition-all duration-200 hover:scale-105">
                    <Edit size={18} />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() =>
                      deleteShop(
                        shop.id
                      )
                    }
                    className="w-12 h-12 rounded-2xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-all duration-200 hover:scale-105"
                  >
                    <Trash2
                      size={18}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}