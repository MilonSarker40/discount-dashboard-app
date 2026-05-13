"use client";

import Link from "next/link";

import {
  CalendarDays,
  Tag,
} from "lucide-react";

interface Offer {
  id: string;

  name: string;

  description: string;

  discount_type: string;

  discount_value: string;

  offer_image: string;

  start_date_time: string;

  expiry_date: string;

  is_active: boolean;
}

interface Props {
  offers: Offer[];
}

export default function OfferList({
  offers,
}: Props) {
  return (
    <div className="glass-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-7 pt-7 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
            <Tag
              size={20}
              className="text-violet-600"
            />
          </div>

          <h1 className="section-title text-2xl">
            Offer List
          </h1>
        </div>

        <Link href="/all-offer">
          <button className="px-5 py-2.5 rounded-xl border border-[#ece8ff] text-violet-700 font-semibold text-sm hover:bg-violet-50 transition">
            View All
          </button>
        </Link>
      </div>

      {/* Empty */}
      {offers.length === 0 && (
        <div className="px-6 pb-6 text-center text-[#8a86b3]">
          No offers found
        </div>
      )}

      {/* Offer List */}
      <div className="px-6 pb-6 space-y-5">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="border border-[#f1efff] rounded-[28px] p-5 flex items-center justify-between hover:shadow-md transition"
          >
            {/* Left */}
            <div className="flex items-center gap-5">
              <img
                src={
                  offer.offer_image
                }
                alt={offer.name}
                className="w-[90px] h-[90px] rounded-2xl object-cover"
              />

              <div>
                {/* Top */}
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-base font-bold text-[#1d1b4b]">
                    {offer.name}
                  </h2>

                  <span
                    className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                      offer.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {offer.is_active
                      ? "Active"
                      : "Inactive"}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[#7e7aa7] text-sm mt-1 line-clamp-1">
                  {
                    offer.description
                  }
                </p>

                {/* Date */}
                <div className="flex items-center gap-2 mt-2 text-[#9b97bd]">
                  <CalendarDays
                    size={16}
                  />

                  <span className="text-sm">
                    {new Date(
                      offer.start_date_time
                    ).toLocaleDateString()}{" "}
                    -
                    {" "}
                    {new Date(
                      offer.expiry_date
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="text-right">
              <h2 className="text-2xl font-bold text-[#1d1b4b]">
                {
                  offer.discount_value
                }
                {offer.discount_type ===
                "percentage"
                  ? "%"
                  : " Tk"}
              </h2>

              <p className="text-[#9b97bd] text-sm font-medium">
                Discount
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}