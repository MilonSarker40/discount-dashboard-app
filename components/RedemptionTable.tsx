"use client";

import { useEffect } from "react";

import Link from "next/link";

import {
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  Ticket,
} from "lucide-react";

import { useRedemptionStore } from "@/store/redemptionStore";

export default function RedemptionTable() {
  const {
    redemptions,
    fetchRedemptions,
  } = useRedemptionStore();

  useEffect(() => {
    fetchRedemptions();
  }, []);

  const latestRedemptions =
    redemptions.slice(0, 6);

  const getStatusConfig = (
    status: string
  ) => {
    switch (status) {
      case "completed":
        return {
          bg: "bg-green-100",

          text: "text-green-700",

          icon: (
            <CheckCircle
              size={12}
            />
          ),

          label: "Completed",
        };

      case "pending":
        return {
          bg: "bg-orange-100",

          text: "text-orange-700",

          icon: (
            <Clock size={12} />
          ),

          label: "Pending",
        };

      default:
        return {
          bg: "bg-red-100",

          text: "text-red-700",

          icon: (
            <XCircle size={12} />
          ),

          label: status,
        };
    }
  };

  return (
    <div className="glass-card overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-700 to-violet-600 px-6 py-5 flex items-center justify-between">
        <div>
          <h2 className="text-white text-2xl font-bold">
            Redemption List
          </h2>

          <p className="text-violet-100 text-sm mt-1">
            Latest reward
            redemption history
          </p>
        </div>

        <Link
          href="/redemption-list"
        >
          <button className="bg-white/20 hover:bg-white/30 text-white px-5 py-2 rounded-xl font-semibold transition">
            View All
          </button>
        </Link>
      </div>

      {/* Empty */}
      {latestRedemptions.length ===
        0 && (
        <div className="p-12 text-center">
          <Ticket className="w-14 h-14 text-violet-300 mx-auto mb-4" />

          <h2 className="text-xl font-bold text-[#1d1b4b]">
            No Redemption Found
          </h2>

          <p className="text-[#8a86b3] mt-2">
            Redemption history will
            appear here
          </p>
        </div>
      )}

      {/* Table */}
      {latestRedemptions.length >
        0 && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f4f1ff] border-b border-[#e9e4ff]">
              <tr className="text-left text-violet-800 text-sm">
                <th className="p-5 font-semibold">
                  Customer ID
                </th>

                <th className="p-5 font-semibold">
                  Offer ID
                </th>

                <th className="p-5 font-semibold">
                  Method
                </th>

                <th className="p-5 font-semibold">
                  Date
                </th>

                <th className="p-5 font-semibold">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {latestRedemptions.map(
                (item) => {
                  const statusConfig =
                    getStatusConfig(
                      item.status
                    );

                  return (
                    <tr
                      key={item.id}
                      className="border-b border-[#f0ebff] hover:bg-violet-50/40 transition"
                    >
                      {/* Customer */}
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white font-bold">
                            {item.customer_id
                              .charAt(
                                0
                              )
                              .toUpperCase()}
                          </div>

                          <div>
                            <p className="font-semibold text-[#1d1b4b]">
                              {item.customer_id.slice(
                                0,
                                8
                              )}
                            </p>

                            <p className="text-xs text-[#8a86b3]">
                              Customer
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Offer */}
                      <td className="p-5">
                        <div>
                          <p className="font-medium text-[#1d1b4b]">
                            {item.offer_id.slice(
                              0,
                              8
                            )}
                          </p>

                          <p className="text-xs text-[#8a86b3]">
                            Offer
                          </p>
                        </div>
                      </td>

                      {/* Method */}
                      <td className="p-5">
                        <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-xs font-semibold uppercase">
                          {
                            item.redemption_method
                          }
                        </span>
                      </td>

                      {/* Date */}
                      <td className="p-5">
                        <div className="flex items-center gap-2 text-[#6f6c99]">
                          <Calendar
                            size={14}
                          />

                          <span>
                            {new Date(
                              item.created_at
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="p-5">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}
                        >
                          {
                            statusConfig.icon
                          }

                          {
                            statusConfig.label
                          }
                        </span>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}