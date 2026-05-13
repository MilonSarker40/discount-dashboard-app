"use client";

import { useEffect } from "react";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

import {
  Utensils,
  Shirt,
  Smartphone,
  ShoppingBag,
  Film,
  Watch,
  Layers3,
} from "lucide-react";

import { useCategoryStore } from "@/store/categoryStore";

export default function CategoryPage() {
  const {
    categories,
    fetchCategories,
    loading,
  } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, []);

  /* -----------------------------
   ICON MAP
  ----------------------------- */

  const iconMap: Record<
    string,
    JSX.Element
  > = {
    restaurant: (
      <Utensils size={30} />
    ),

    spa: <Shirt size={30} />,

    devices: (
      <Smartphone size={30} />
    ),

    shopping_bag: (
      <ShoppingBag size={30} />
    ),

    movie: <Film size={30} />,

    checkroom: (
      <Watch size={30} />
    ),
  };

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
                Categories
              </h1>

              <p className="text-[#8a86b3] mt-3 text-lg">
                Browse all available
                shop categories
              </p>
            </div>

            {/* Count */}
            <div className="bg-white border border-[#ece8ff] rounded-3xl px-6 py-4 shadow-sm flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-700">
                <Layers3 size={28} />
              </div>

              <div>
                <p className="text-sm text-[#8a86b3]">
                  Total Categories
                </p>

                <h2 className="text-3xl font-black text-[#1d1b4b]">
                  {
                    categories.length
                  }
                </h2>
              </div>
            </div>
          </div>

          {/* Empty */}
          {categories.length ===
            0 && (
            <div className="bg-white rounded-[32px] border border-[#f0ebff] p-20 text-center">
              <div className="w-24 h-24 mx-auto rounded-3xl bg-violet-100 flex items-center justify-center text-violet-700">
                <ShoppingBag
                  size={40}
                />
              </div>

              <h2 className="text-3xl font-black text-[#1d1b4b] mt-6">
                No Categories Found
              </h2>

              <p className="text-[#8a86b3] mt-3 text-lg">
                Add categories from
                Supabase
              </p>
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {categories.map(
              (category) => (
                <div
                  key={category.id}
                  className="relative overflow-hidden bg-white rounded-[32px] border border-[#f0ebff] p-7 hover:shadow-[0_20px_50px_rgba(106,90,255,0.12)] hover:-translate-y-1 transition-all duration-300 group"
                >
                  {/* Glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-violet-100 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition" />

                  {/* Icon */}
                  <div className="relative z-10 w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {iconMap[
                      category.icon
                    ] || (
                      <ShoppingBag
                        size={30}
                      />
                    )}
                  </div>

                  {/* Name */}
                  <h2 className="relative z-10 text-3xl font-black text-[#1d1b4b] mt-7">
                    {category.name}
                  </h2>

                  {/* Small badge */}
                  <div className="relative z-10 mt-4 inline-flex items-center gap-2 bg-violet-50 text-violet-700 px-4 py-2 rounded-full text-sm font-semibold">
                    <div className="w-2 h-2 rounded-full bg-violet-500" />

                    Active Category
                  </div>

                  {/* Footer */}
                  <div className="relative z-10 mt-8 pt-5 border-t border-[#f3efff]">
                    <p className="text-xs uppercase tracking-wide text-[#a09bbf] font-semibold">
                      Created Date
                    </p>

                    <p className="font-bold text-[#1d1b4b] mt-2 text-lg">
                      {new Date(
                        category.created_at
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