"use client";

import Link from "next/link";

import {
  Mail,
  Phone,
  Users,
} from "lucide-react";

import { useCustomerStore } from "@/store/customers";

export default function UserTable() {
  const { customers } =
    useCustomerStore();

  const latestCustomers =
    customers.slice(0, 5);

  return (
    <div className="glass-card overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-[#f1efff] flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1d1b4b]">
            Users
          </h2>

          <p className="text-[#8a86b3] mt-1">
            Customer List
          </p>
        </div>

        <Link href="/all-customer">
          <button className="px-5 py-2.5 rounded-xl border border-[#ece8ff] text-violet-700 font-semibold text-sm hover:bg-violet-50 transition">
            View All
          </button>
        </Link>
      </div>

      {/* Empty */}
      {latestCustomers.length ===
        0 && (
        <div className="p-10 text-center">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />

          <p className="text-[#8a86b3]">
            No customers found
          </p>
        </div>
      )}

      {/* Table */}
      {latestCustomers.length >
        0 && (
        <table className="w-full">
          <thead className="bg-[#faf9ff] border-b border-[#f1efff]">
            <tr className="text-left text-[#8a86b3]">
              <th className="px-5 py-5 font-semibold">
                Customer
              </th>

              <th className="px-5 py-5 font-semibold">
                Contact
              </th>

              <th className="px-5 py-5 font-semibold">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {latestCustomers.map(
              (customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-[#f7f5ff] hover:bg-[#faf9ff] transition"
                >
                  {/* Customer */}
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center font-bold text-white">
                        {customer.name
                          ?.charAt(
                            0
                          )
                          .toUpperCase()}
                      </div>

                      {/* Info */}
                      <div>
                        <span className="font-semibold text-[#1d1b4b] block">
                          {
                            customer.name
                          }
                        </span>

                        <span className="text-xs text-[#8a86b3]">
                          Joined{" "}
                          {new Date(
                            customer.join_date
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="p-6">
                    <div className="space-y-1">
                      <p className="text-sm text-[#6f6c99] flex items-center gap-1">
                        <Mail size={12} />

                        {
                          customer.email
                        }
                      </p>

                      <p className="text-sm text-[#6f6c99] flex items-center gap-1">
                        <Phone size={12} />

                        {
                          customer.phone
                        }
                      </p>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-6">
                    <span
                      className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                        customer.status ===
                        "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {
                        customer.status
                      }
                    </span>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}