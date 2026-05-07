// components/Sidebar.tsx
"use client";

import {
  LayoutDashboard,
  Store,
  Users,
  Gift,
  Ticket,
  Shield,
} from "lucide-react";
import { useDashboardStore } from "@/store/dashboardStore";

const menus = [
  { title: "Dashboard", icon: LayoutDashboard },
  { title: "All Shop", icon: Store },
  { title: "All Customer", icon: Users },
  { title: "All Offer", icon: Gift },
  { title: "Redemption List", icon: Ticket },
  { title: "Login", icon: Shield },
] as const;

export default function Sidebar() {
  const { activeMenu, setActiveMenu } = useDashboardStore();

  return (
    <div className="w-[280px] sidebar-gradient min-h-screen p-5 flex flex-col justify-between shrink-0">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-2xl">
            💎
          </div>
          <div>
            <h1 className="text-white text-xl font-bold tracking-tight">
              Discount App
            </h1>
            <p className="text-violet-200 text-xs mt-1 font-medium">
              Premium Admin Panel
            </p>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="space-y-2">
          {menus.map((menu) => {
            const Icon = menu.icon;
            const isActive = activeMenu === menu.title;

            return (
              <button
                key={menu.title}
                onClick={() => setActiveMenu(menu.title)}
                className={`w-full flex items-center gap-4 px-6 py-3 cursor-pointer rounded-2xl transition-all ${
                  isActive
                    ? "bg-white text-violet-700 shadow-md"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <Icon size={16} />
                <span className="font-semibold text-sm">{menu.title}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Upgrade Card & Profile */}
      <div>
        {/* <div className="bg-gradient-to-br from-fuchsia-500 to-violet-700 rounded-[30px] p-6 text-white">
          <h2 className="text-2xl font-bold">👑 Upgrade to Pro</h2>
          <p className="mt-3 text-violet-100 leading-relaxed text-sm">
            Get unlimited access and premium features
          </p>
          <button className="mt-5 bg-white text-violet-700 w-full py-3 rounded-2xl font-bold text-sm hover:bg-gray-50 transition">
            Upgrade Now
          </button>
        </div> */}

        {/* Admin Profile */}
        <div className="bg-white/10 mt-6 rounded-3xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/100?img=7"
              alt="Admin"
              className="w-12 h-12 rounded-full border-2 border-white/30"
            />
            <div>
              <h2 className="text-white font-bold text-base">Admin</h2>
              <p className="text-violet-200 text-xs">Administrator</p>
            </div>
          </div>
          <button className="text-white text-xl">⋯</button>
        </div>
      </div>
    </div>
  );
}