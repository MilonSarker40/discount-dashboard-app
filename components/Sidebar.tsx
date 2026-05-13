// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Store,
  Users,
  Gift,
  Ticket,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "@/store/auth";

const menus = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/" },
  { title: "All Shop", icon: Store, path: "/all-shop" },
  { title: "All Customer", icon: Users, path: "/all-customer" },
  { title: "All Offer", icon: Gift, path: "/all-offer" },
  { title: "Redemption List", icon: Ticket, path: "/redemption-list" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="w-[280px] sidebar-gradient min-h-screen p-5 flex flex-col justify-between shrink-0">
      <div>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 mb-12 cursor-pointer group">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
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
        </Link>

        {/* Menu Navigation */}
        <nav className="space-y-2">
          {menus.map((menu) => {
            const Icon = menu.icon;
            const isActive = pathname === menu.path;

            return (
              <Link
                key={menu.title}
                href={menu.path}
                className={`w-full flex items-center gap-4 px-6 py-3 rounded-2xl transition-all ${
                  isActive
                    ? "bg-white text-violet-700 shadow-md"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <Icon size={18} />
                <span className="font-semibold text-sm">{menu.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Upgrade Card & Profile */}
      <div>
        {/* Upgrade to Pro Card */}
        {/* <div className="bg-gradient-to-br from-fuchsia-500 to-violet-700 rounded-[30px] p-6 text-white mb-4">
          <h2 className="text-xl font-bold">👑 Upgrade to Pro</h2>
          <p className="mt-2 text-violet-100 leading-relaxed text-xs">
            Get unlimited access and premium features
          </p>
          <button className="mt-4 bg-white text-violet-700 w-full py-2.5 rounded-2xl font-bold text-sm hover:bg-gray-50 transition">
            Upgrade Now
          </button>
        </div> */}

        {/* Admin Profile with Logout */}
        <div className="bg-white/10 rounded-3xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/100?img=7"
                alt="Admin"
                className="w-12 h-12 rounded-full border-2 border-white/30"
              />
              <div>
                <h2 className="text-white font-bold text-base">
                  {user?.email?.split('@')[0] || 'Admin'}
                </h2>
                <p className="text-violet-200 text-xs">Administrator</p>
              </div>
            </div>
            <button className="text-white text-xl opacity-70 hover:opacity-100">⋯</button>
          </div>
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full mt-2 flex items-center justify-center gap-2 py-2 rounded-xl bg-red-500/20 text-red-200 text-sm font-semibold hover:bg-red-500/30 transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}