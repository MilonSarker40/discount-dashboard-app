"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

import AddOfferModal from "@/components/Modals/AddOfferModal";

import {
  Calendar,
  Eye,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";

import { useOfferStore } from "@/store/offerStore";

export default function AllOfferPage() {
  const [modalOpen, setModalOpen] =
    useState<"offer" | null>(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 5;

  const {
    offers,
    fetchOffers,
    loading,
  } = useOfferStore();

  useEffect(() => {
    fetchOffers();
  }, []);

  /* -----------------------------
   SEARCH FILTER
  ----------------------------- */

  const filteredOffers =
    offers.filter(
      (offer) =>
        offer.name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        offer.description
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
    );

  /* -----------------------------
   PAGINATION
  ----------------------------- */

  const totalPages = Math.ceil(
    filteredOffers.length /
      itemsPerPage
  );

  const startIndex =
    (currentPage - 1) *
    itemsPerPage;

  const endIndex =
    startIndex + itemsPerPage;

  const paginatedOffers =
    filteredOffers.slice(
      startIndex,
      endIndex
    );

  /* -----------------------------
   LOADING
  ----------------------------- */

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
          {/* HEADER */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#1d1b4b]">
                All Offers
              </h2>

              <p className="text-[#6f6c99] mt-2">
                Manage and track promotional offers
              </p>
            </div>

            <button
              onClick={() =>
                setModalOpen("offer")
              }
              className="bg-violet-700 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-violet-800 transition flex items-center gap-2"
            >
              <Plus size={20} />
              Create New Offer
            </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Total */}
            <div className="bg-white rounded-2xl p-6 border border-[#f0ebff]">
              <p className="text-[#7a7699]">
                Total Offers
              </p>

              <h2 className="text-2xl font-bold text-[#1d1b4b] mt-2">
                {offers.length}
              </h2>
            </div>

            {/* Active */}
            <div className="bg-white rounded-2xl p-6 border border-[#f0ebff]">
              <p className="text-[#7a7699]">
                Active Offers
              </p>

              <h2 className="text-2xl font-bold text-[#1d1b4b] mt-2">
                {
                  offers.filter(
                    (offer) =>
                      offer.is_active
                  ).length
                }
              </h2>
            </div>

            {/* Published */}
            <div className="bg-white rounded-2xl p-6 border border-[#f0ebff]">
              <p className="text-[#7a7699]">
                Published Offers
              </p>

              <h2 className="text-2xl font-bold text-[#1d1b4b] mt-2">
                {
                  offers.filter(
                    (offer) =>
                      offer.is_published
                  ).length
                }
              </h2>
            </div>

            {/* Percentage */}
            <div className="bg-white rounded-2xl p-6 border border-[#f0ebff]">
              <p className="text-[#7a7699]">
                Percentage Offers
              </p>

              <h2 className="text-2xl font-bold text-[#1d1b4b] mt-2">
                {
                  offers.filter(
                    (offer) =>
                      offer.discount_type ===
                      "percentage"
                  ).length
                }
              </h2>
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-[32px] border border-[#f0ebff] overflow-hidden">
            {/* SEARCH */}
            <div className="p-6 border-b border-[#f0ebff]">
              <input
                type="text"
                placeholder="Search offers..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(
                    e.target.value
                  );

                  setCurrentPage(1);
                }}
                className="px-5 py-3 rounded-xl border border-[#e0d9ff] w-full focus:outline-none focus:border-violet-500"
              />
            </div>

            {/* TABLE */}
            <table className="w-full">
              <thead className="bg-[#faf9ff] border-b border-[#f0ebff]">
                <tr className="text-left text-[#8a86b3]">
                  <th className="p-6 font-semibold">
                    Offer
                  </th>

                  <th className="p-6 font-semibold">
                    Discount
                  </th>

                  <th className="p-6 font-semibold">
                    Start Date
                  </th>

                  <th className="p-6 font-semibold">
                    Expiry Date
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
                {/* EMPTY */}
                {filteredOffers.length ===
                  0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-10 text-[#8a86b3]"
                    >
                      No offers found
                    </td>
                  </tr>
                )}

                {/* ROWS */}
                {paginatedOffers.map(
                  (offer) => (
                    <tr
                      key={offer.id}
                      className="border-b border-[#f7f5ff] hover:bg-[#faf9ff] transition"
                    >
                      {/* OFFER */}
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              offer.offer_image
                            }
                            alt={
                              offer.name
                            }
                            className="w-14 h-14 rounded-2xl object-cover"
                          />

                          <div>
                            <h2 className="font-semibold text-[#1d1b4b]">
                              {
                                offer.name
                              }
                            </h2>

                            <p className="text-sm text-[#8a86b3] mt-1">
                              {
                                offer.description
                              }
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* DISCOUNT */}
                      <td className="p-6">
                        <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-bold">
                          {
                            offer.discount_value
                          }

                          {offer.discount_type ===
                          "percentage"
                            ? "%"
                            : " Tk"}
                        </span>
                      </td>

                      {/* START */}
                      <td className="p-6 text-[#6f6c99]">
                        <div className="flex items-center gap-2">
                          <Calendar
                            size={15}
                          />

                          {new Date(
                            offer.start_date_time
                          ).toLocaleDateString()}
                        </div>
                      </td>

                      {/* EXPIRY */}
                      <td className="p-6 text-[#6f6c99]">
                        <div className="flex items-center gap-2">
                          <Calendar
                            size={15}
                          />

                          {new Date(
                            offer.expiry_date
                          ).toLocaleDateString()}
                        </div>
                      </td>

                      {/* STATUS */}
                      <td className="p-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            offer.is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {offer.is_active
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="p-6">
                        <div className="flex gap-2">
                          <button className="p-2 rounded-lg hover:bg-violet-50 text-violet-600">
                            <Eye size={16} />
                          </button>

                          <button className="p-2 rounded-lg hover:bg-violet-50 text-violet-600">
                            <Edit size={16} />
                          </button>

                          <button className="p-2 rounded-lg hover:bg-red-50 text-red-600">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>

            {/* PAGINATION */}
            <div className="p-6 border-t border-[#f0ebff] flex items-center justify-between">
              <p className="text-sm text-[#8a86b3]">
                Showing{" "}
                {filteredOffers.length ===
                0
                  ? 0
                  : startIndex + 1}
                -
                {Math.min(
                  endIndex,
                  filteredOffers.length
                )}{" "}
                of{" "}
                {
                  filteredOffers.length
                }{" "}
                offers
              </p>

              <div className="flex items-center gap-2">
                {/* PREVIOUS */}
                <button
                  disabled={
                    currentPage === 1
                  }
                  onClick={() =>
                    setCurrentPage(
                      currentPage - 1
                    )
                  }
                  className={`px-4 py-2 rounded-xl border transition ${
                    currentPage === 1
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-violet-50"
                  }`}
                >
                  Previous
                </button>

                {/* PAGE BUTTONS */}
                {Array.from({
                  length: totalPages,
                }).map(
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setCurrentPage(
                          index + 1
                        )
                      }
                      className={`w-10 h-10 rounded-xl font-semibold transition ${
                        currentPage ===
                        index + 1
                          ? "bg-violet-600 text-white"
                          : "border hover:bg-violet-50"
                      }`}
                    >
                      {index + 1}
                    </button>
                  )
                )}

                {/* NEXT */}
                <button
                  disabled={
                    currentPage ===
                    totalPages ||
                    totalPages === 0
                  }
                  onClick={() =>
                    setCurrentPage(
                      currentPage + 1
                    )
                  }
                  className={`px-4 py-2 rounded-xl border transition ${
                    currentPage ===
                      totalPages ||
                    totalPages === 0
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-violet-50"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AddOfferModal
        isOpen={
          modalOpen === "offer"
        }
        onClose={() =>
          setModalOpen(null)
        }
      />
    </div>
  );
}