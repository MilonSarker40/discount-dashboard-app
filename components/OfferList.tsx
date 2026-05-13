// components/OfferList.tsx
import { CalendarDays, Tag, Eye } from "lucide-react";

const offers = [
  {
    title: "50% OFF Pizza",
    shop: "Pizza Hut",
    period: "20 May - 30 May 2024",
    status: "Active",
    redemptions: 120,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=120&h=120&fit=crop",
  },
  {
    title: "Buy 1 Get 1",
    shop: "KFC",
    period: "18 May - 25 May 2024",
    status: "Pending",
    redemptions: 85,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=120&h=120&fit=crop",
  },
  
];

export default function OfferList() {
  return (
    <div className="glass-card overflow-hidden">
      <div className="flex items-center justify-between px-7 pt-7 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
            <Tag size={20} className="text-violet-600" />
          </div>
          <h1 className="section-title text-2xl">Offer List</h1>
        </div>
        <button className="px-5 py-2.5 rounded-xl border border-[#ece8ff] text-violet-700 font-semibold text-sm hover:bg-violet-50 transition">
          View All
        </button>
      </div>

      <div className="px-6 pb-6 space-y-5">
        {offers.map((offer, idx) => (
          <div
            key={idx}
            className="border border-[#f1efff] rounded-[28px] p-5 flex items-center justify-between hover:shadow-md transition"
          >
            <div className="flex items-center gap-5">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-[90px] h-[90px] rounded-2xl object-cover"
              />
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-base font-bold text-[#1d1b4b]">{offer.title}</h2>
                  <span
                    className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                      offer.status === "Active" ? "badge-active" : "badge-pending"
                    }`}
                  >
                    {offer.status}
                  </span>
                </div>
                <p className="text-[#7e7aa7] text-sm mt-1">{offer.shop}</p>
                <div className="flex items-center gap-2 mt-2 text-[#9b97bd]">
                  <CalendarDays size={16} />
                  <span className="text-sm">{offer.period}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-[#1d1b4b]">{offer.redemptions}</h2>
              <p className="text-[#9b97bd] text-sm font-medium">Redemptions</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}