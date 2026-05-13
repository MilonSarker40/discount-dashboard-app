"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import AddShopModal from "@/components/Modals/AddShopModal";

import { Store, Eye } from "lucide-react";

import { useShopStore } from "@/store/shopStore";

export default function AllShopPage() {
  const [modalOpen, setModalOpen] = useState<
    "shop" | null
  >(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const {
    shops,
    fetchShops,
    loading,
  } = useShopStore();

  useEffect(() => {
    fetchShops();
  }, []);

  const filteredShops = shops.filter(
    (shop) =>
      shop.name
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        ) ||
      shop.email
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        ) ||
      shop.address
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        ) ||
      shop.mobile_number
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f7f7fc]">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 overflow-x-auto">
        <Topbar />

        <div className="mt-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#1d1b4b]">
                All Shops
              </h2>

              <p className="text-[#6f6c99] mt-2">
                Manage all partner shops and their details
              </p>
            </div>

            <button
              onClick={() =>
                setModalOpen("shop")
              }
              className="bg-violet-700 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-violet-800 transition flex items-center gap-2"
            >
              <Store size={20} />
              Add New Shop
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 border border-[#f0ebff]">
              <p className="text-[#7a7699]">
                Total Shops
              </p>

              <h2 className="text-2xl font-bold text-[#1d1b4b] mt-2">
                {shops.length}
              </h2>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#f0ebff]">
              <p className="text-[#7a7699]">
                Active Shops
              </p>

              <h2 className="text-2xl font-bold text-[#1d1b4b] mt-2">
                {
                  shops.filter(
                    (shop) => shop.is_active
                  ).length
                }
              </h2>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#f0ebff]">
              <p className="text-[#7a7699]">
                Inactive Shops
              </p>

              <h2 className="text-2xl font-bold text-[#1d1b4b] mt-2">
                {
                  shops.filter(
                    (shop) => !shop.is_active
                  ).length
                }
              </h2>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#f0ebff]">
              <p className="text-[#7a7699]">
                Total Categories
              </p>

              <h2 className="text-2xl font-bold text-[#1d1b4b] mt-2">
                {
                  new Set(
                    shops.map(
                      (shop) =>
                        shop.category_id
                    )
                  ).size
                }
              </h2>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-[32px] border border-[#f0ebff] overflow-hidden">
            {/* Top */}
            <div className="p-6 border-b border-[#f0ebff]">
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  placeholder="Search shops..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(
                      e.target.value
                    )
                  }
                  className="px-5 py-3 rounded-xl border border-[#e0d9ff] w-80 focus:outline-none focus:border-violet-500"
                />

                <button className="text-violet-600 font-semibold">
                  Export List →
                </button>
              </div>
            </div>

            {/* Table */}
            <table className="w-full">
              <thead className="bg-[#faf9ff] border-b border-[#f0ebff]">
                <tr className="text-left text-[#8a86b3]">
                  <th className="p-6 font-semibold">
                    Shop
                  </th>

                  <th className="p-6 font-semibold">
                    Email
                  </th>

                  <th className="p-6 font-semibold">
                    Phone
                  </th>

                  <th className="p-6 font-semibold">
                    Address
                  </th>

                  <th className="p-6 font-semibold">
                    Status
                  </th>

                  <th className="p-6 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredShops.length ===
                  0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-10 text-[#8a86b3]"
                    >
                      No shops found
                    </td>
                  </tr>
                )}

                {filteredShops.map(
                  (shop) => (
                    <tr
                      key={shop.id}
                      className="border-b border-[#f7f5ff] hover:bg-[#faf9ff] transition"
                    >
                      {/* Shop */}
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              shop.shop_image_url ||
                              "/shop.png"
                            }
                            alt={shop.name}
                            className="w-12 h-12 rounded-xl object-cover"
                          />

                          <div>
                            <h2 className="font-semibold text-[#1d1b4b]">
                              {shop.name}
                            </h2>

                            <p className="text-sm text-[#8a86b3] mt-1">
                              {shop.about ||
                                "No description"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="p-6 text-[#6f6c99]">
                        {shop.email ||
                          "N/A"}
                      </td>

                      {/* Phone */}
                      <td className="p-6 text-[#6f6c99]">
                        {
                          shop.mobile_number
                        }
                      </td>

                      {/* Address */}
                      <td className="p-6 text-[#6f6c99]">
                        {shop.address}
                      </td>

                      {/* Status */}
                      <td className="p-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            shop.is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {shop.is_active
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-6">
                        <Link
                          href={`/all-shop/${shop.id}`}
                        >
                          <button className="text-violet-600 hover:text-violet-800 flex items-center gap-1">
                            <Eye size={16} />
                            View
                          </button>
                        </Link>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>

            {/* Footer */}
            <div className="p-6 border-t border-[#f0ebff] flex items-center justify-between">
              <p className="text-[#8a86b3] text-sm">
                Showing{" "}
                {
                  filteredShops.length
                }{" "}
                shops
              </p>

              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg border border-[#e0d9ff] hover:bg-violet-50">
                  Previous
                </button>

                <button className="px-4 py-2 rounded-lg bg-violet-600 text-white">
                  1
                </button>

                <button className="px-4 py-2 rounded-lg border border-[#e0d9ff] hover:bg-violet-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AddShopModal
        isOpen={modalOpen === "shop"}
        onClose={() =>
          setModalOpen(null)
        }
      />
    </div>
  );
}