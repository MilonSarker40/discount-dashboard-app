"use client";

import { useEffect } from "react";

import Link from "next/link";

import { useParams } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  Gift,
  Eye,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

import { useState } from "react";

import { useOfferStore } from "@/store/offerStore";

const supabase = createClient();

export default function OutletDetailsPage() {
  const params = useParams();

  const id = params.id as string;

  /* -----------------------------
   STATES
  ----------------------------- */

  const [outlet, setOutlet] =
    useState<any>(null);

  const {
    offers,
    fetchOffersByOutletId,
  } = useOfferStore();

  /* -----------------------------
   FETCH DATA
  ----------------------------- */

  useEffect(() => {
    const loadData =
      async () => {
        await fetchOutlet();

        await fetchOffersByOutletId(
          id
        );
      };

    loadData();
  }, []);

  const fetchOutlet =
    async () => {
      const { data } =
        await supabase
          .from("outlets")
          .select("*")
          .eq("id", id)
          .single();

      setOutlet(data);
    };

  /* -----------------------------
   LOADING
  ----------------------------- */

  if (!outlet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f7f7fc]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <main className="flex-1 p-8 overflow-x-auto">
        {/* Topbar */}
        <Topbar />

        {/* ======================================
           OUTLET DETAILS
        ====================================== */}

        <div className="bg-white rounded-[32px] border border-[#f0ebff] p-8 mt-8">
          {/* HEADER */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            {/* IMAGE */}
            <img
              src={
                outlet.outlet_image ||
                "/shop.png"
              }
              className="w-32 h-32 rounded-[30px] object-cover border border-[#ece8ff]"
            />

            {/* INFO */}
            <div>
              <h1 className="text-4xl font-black text-[#1d1b4b]">
                {outlet.name}
              </h1>

              <p className="text-[#7e7aa7] mt-3 max-w-2xl leading-7">
                {outlet.about}
              </p>

              {/* STATUS */}
              <div className="mt-4">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-bold ${
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

          {/* INFO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
            {/* PHONE */}
            <div className="bg-[#faf9ff] rounded-3xl p-5 border border-[#f0ebff]">
              <Phone className="text-violet-600 mb-3" />

              <p className="text-[#8a86b3] text-sm">
                Phone
              </p>

              <h2 className="font-bold text-[#1d1b4b] mt-2">
                {
                  outlet.contact_number
                }
              </h2>
            </div>

            {/* EMAIL */}
            <div className="bg-[#faf9ff] rounded-3xl p-5 border border-[#f0ebff]">
              <Mail className="text-violet-600 mb-3" />

              <p className="text-[#8a86b3] text-sm">
                Email
              </p>

              <h2 className="font-bold text-[#1d1b4b] mt-2 break-all">
                {outlet.email ||
                  "N/A"}
              </h2>
            </div>

            {/* ADDRESS */}
            <div className="bg-[#faf9ff] rounded-3xl p-5 border border-[#f0ebff]">
              <MapPin className="text-violet-600 mb-3" />

              <p className="text-[#8a86b3] text-sm">
                Address
              </p>

              <h2 className="font-bold text-[#1d1b4b] mt-2">
                {
                  outlet.address
                }
              </h2>
            </div>
          </div>
        </div>

        {/* ======================================
           OFFERS SECTION
        ====================================== */}

        <div className="bg-white rounded-[32px] border border-[#f0ebff] p-8 mt-8">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-[#1d1b4b]">
                Outlet Offers
              </h2>

              <p className="text-[#8a86b3] mt-2">
                Total offers:{" "}
                {offers.length}
              </p>
            </div>

            <div className="w-16 h-16 rounded-3xl bg-violet-100 text-violet-700 flex items-center justify-center">
              <Gift size={30} />
            </div>
          </div>

          {/* EMPTY */}
          {offers.length ===
            0 && (
            <div className="border border-dashed border-[#e6ddff] rounded-[30px] p-14 text-center">
              <Gift className="w-16 h-16 text-violet-300 mx-auto mb-5" />

              <h2 className="text-2xl font-bold text-[#1d1b4b]">
                No Offers Found
              </h2>

              <p className="text-[#8a86b3] mt-2">
                This outlet has no
                offers yet
              </p>
            </div>
          )}

          {/* OFFER LIST */}
          <div className="space-y-5">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="border border-[#f0ebff] rounded-[30px] p-5 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {/* LEFT */}
                  <div className="flex items-center gap-5">
                    {/* IMAGE */}
                    <img
                      src={
                        offer.offer_image
                      }
                      alt={offer.name}
                      className="w-28 h-28 rounded-[28px] object-cover border border-[#ece8ff]"
                    />

                    {/* INFO */}
                    <div>
                      <h2 className="text-2xl font-black text-[#1d1b4b]">
                        {offer.name}
                      </h2>

                      <p className="text-[#7e7aa7] mt-3 max-w-xl">
                        {
                          offer.description
                        }
                      </p>

                      {/* DISCOUNT */}
                      <div className="mt-4">
                        <span className="bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-bold">
                          {
                            offer.discount_value
                          }

                          {offer.discount_type ===
                          "percentage"
                            ? "%"
                            : " Tk"}{" "}
                          OFF
                        </span>
                      </div>

                      {/* DATE */}
                      <div className="flex items-center gap-2 mt-4 text-[#8a86b3] text-sm">
                        <Calendar
                          size={15}
                        />

                        <span>
                          {new Date(
                            offer.expiry_date
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* BUTTON */}
                  <Link
                    href={`/offer/${offer.id}`}
                  >
                    <button className="px-6 py-3 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-semibold flex items-center gap-2 transition">
                      <Eye size={18} />
                      View Offer
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}