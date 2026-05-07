// src/components/OfferCard.tsx

import { CalendarDays, Tag } from "lucide-react";

export default function OfferCard() {
  return (
    <div className="bg-white rounded-[32px] border border-[#f1edff] shadow-[0_10px_30px_rgba(99,91,255,0.06)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-8 pt-8 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
            <Tag
              size={20}
              className="text-violet-600"
            />
          </div>

          <h1 className="text-[38px] font-black text-[#1d1b4b]">
            Offer List
          </h1>
        </div>

        <button className="h-14 px-6 rounded-2xl border border-[#ece8ff] text-violet-700 font-semibold text-lg hover:bg-violet-50">
          View All
        </button>
      </div>

      {/* Offer 1 */}
      <div className="mx-6 mb-5 border border-[#f1efff] rounded-[28px] p-5 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-5">
          <img
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400"
            className="w-[120px] h-[120px] rounded-[24px] object-cover"
          />

          <div>
            <div className="flex items-center gap-4">
              <h2 className="text-[28px] font-black text-[#1d1b4b] leading-none">
                50% OFF Pizza
              </h2>

              <div className="bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-bold">
                Active
              </div>
            </div>

            <p className="text-[#7e7aa7] text-xl mt-3">
              Pizza Hut
            </p>

            <div className="flex items-center gap-2 mt-4 text-[#9b97bd]">
              <CalendarDays size={18} />

              <p className="text-lg">
                20 May - 30 May 2024
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="text-right">
          <h1 className="text-[42px] font-black text-[#1d1b4b]">
            120
          </h1>

          <p className="text-[#9b97bd] text-lg">
            Redemptions
          </p>
        </div>
      </div>

      {/* Offer 2 */}
      <div className="mx-6 mb-6 border border-[#f1efff] rounded-[28px] p-5 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-5">
          <img
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400"
            className="w-[120px] h-[120px] rounded-[24px] object-cover"
          />

          <div>
            <div className="flex items-center gap-4">
              <h2 className="text-[28px] font-black text-[#1d1b4b] leading-none">
                Buy 1 Get 1
              </h2>

              <div className="bg-orange-100 text-orange-500 px-4 py-2 rounded-full text-sm font-bold">
                Pending
              </div>
            </div>

            <p className="text-[#7e7aa7] text-xl mt-3">
              KFC
            </p>

            <div className="flex items-center gap-2 mt-4 text-[#9b97bd]">
              <CalendarDays size={18} />

              <p className="text-lg">
                18 May - 25 May 2024
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="text-right">
          <h1 className="text-[42px] font-black text-[#1d1b4b]">
            85
          </h1>

          <p className="text-[#9b97bd] text-lg">
            Redemptions
          </p>
        </div>
      </div>
    </div>
  );
}