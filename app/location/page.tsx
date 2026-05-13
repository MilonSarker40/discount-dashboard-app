"use client";

import { useEffect } from "react";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

import {
  MapPin,
  Globe2,
  Navigation,
} from "lucide-react";

import { useLocationStore } from "@/store/locationStore";

export default function LocationPage() {
  const {
    locations,
    fetchLocations,
    loading,
  } = useLocationStore();

  useEffect(() => {
    fetchLocations();
  }, []);

  if (loading) {
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
      <main className="flex-1 p-6 lg:p-8 overflow-x-auto">
        <Topbar />

        <div className="mt-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-4xl font-black text-[#1d1b4b]">
                Locations
              </h1>

              <p className="text-[#8a86b3] mt-3 text-lg">
                Manage all available
                locations across Bangladesh
              </p>
            </div>

            {/* Total */}
            <div className="bg-white border border-[#ece8ff] rounded-3xl px-6 py-4 shadow-sm flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-700">
                <Globe2 size={28} />
              </div>

              <div>
                <p className="text-sm text-[#8a86b3]">
                  Total Locations
                </p>

                <h2 className="text-3xl font-black text-[#1d1b4b]">
                  {
                    locations.length
                  }
                </h2>
              </div>
            </div>
          </div>

          {/* Empty */}
          {locations.length ===
            0 && (
            <div className="bg-white rounded-[32px] border border-[#f0ebff] p-20 text-center">
              <div className="w-24 h-24 mx-auto rounded-3xl bg-violet-100 flex items-center justify-center text-violet-700">
                <MapPin size={40} />
              </div>

              <h2 className="text-3xl font-black text-[#1d1b4b] mt-6">
                No Locations Found
              </h2>

              <p className="text-[#8a86b3] mt-3 text-lg">
                Add locations from
                Supabase
              </p>
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {locations.map(
              (location) => (
                <div
                  key={location.id}
                  className="relative overflow-hidden bg-white rounded-[32px] border border-[#f0ebff] p-7 hover:shadow-[0_20px_50px_rgba(106,90,255,0.12)] hover:-translate-y-1 transition-all duration-300 group"
                >
                  {/* Glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-violet-100 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition" />

                  {/* Icon */}
                  <div className="relative z-10 w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <MapPin size={30} />
                  </div>

                  {/* Name */}
                  <h2 className="relative z-10 text-3xl font-black text-[#1d1b4b] mt-7">
                    {location.name}
                  </h2>

                  {/* Status */}
                  <div
                    className={`relative z-10 mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                      location.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        location.is_active
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    />

                    {location.is_active
                      ? "Active"
                      : "Inactive"}
                  </div>

                  {/* Coordinates */}
                  <div className="relative z-10 mt-8 space-y-4">
                    <div className="bg-[#faf9ff] rounded-2xl p-4 border border-[#f0ebff]">
                      <div className="flex items-center gap-2 text-[#8a86b3] text-sm">
                        <Navigation size={14} />

                        Latitude
                      </div>

                      <h2 className="text-lg font-bold text-[#1d1b4b] mt-2">
                        {
                          location.latitude
                        }
                      </h2>
                    </div>

                    <div className="bg-[#faf9ff] rounded-2xl p-4 border border-[#f0ebff]">
                      <div className="flex items-center gap-2 text-[#8a86b3] text-sm">
                        <Navigation size={14} />

                        Longitude
                      </div>

                      <h2 className="text-lg font-bold text-[#1d1b4b] mt-2">
                        {
                          location.longitude
                        }
                      </h2>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="relative z-10 mt-6 pt-5 border-t border-[#f3efff]">
                    <p className="text-xs uppercase tracking-wide text-[#a09bbf] font-semibold">
                      Created Date
                    </p>

                    <p className="font-bold text-[#1d1b4b] mt-2 text-lg">
                      {new Date(
                        location.created_at
                      ).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month:
                            "short",
                          year: "numeric",
                        }
                      )}
                    </p>
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