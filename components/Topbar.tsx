"use client";

import {
  Bell,
  Search,
  Command,
  LogOut,
  User,
  Settings,
  ChevronDown,
} from "lucide-react";

import {
  useState,
  useRef,
  useEffect,
} from "react";

import { useRouter } from "next/navigation";

import { useDashboardStore } from "@/store/dashboardStore";

import { useAuthStore } from "@/store/auth";

export default function Topbar() {
  const {
    searchQuery,
    setSearchQuery,
  } = useDashboardStore();

  const {
    logout,
    user,
  } = useAuthStore();

  const router = useRouter();

  const [open, setOpen] =
    useState(false);

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  /* --------------------------------
   CLOSE DROPDOWN OUTSIDE CLICK
  -------------------------------- */

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* --------------------------------
   LOGOUT
  -------------------------------- */

  const handleLogout =
    async () => {
      await logout();

      router.push("/login");
    };

  return (
    <div className="flex items-center justify-between mb-8">
      {/* LEFT */}
      <div>
        <h2 className="text-2xl leading-none font-black text-[#1d1b4b] tracking-tight">
          Dashboard
        </h2>

        <p className="text-[#6f6c99] mt-2 text-xs">
          Welcome back, Admin!
          👋
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">
        {/* SEARCH */}
        <div className="bg-white rounded-xl px-5 py-4 flex items-center gap-3 w-[380px] soft-shadow border border-[#f0ebff]">
          <Search
            className="text-violet-500"
            size={20}
          />

          <input
            type="text"
            placeholder="Search anything..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(
                e.target.value
              )
            }
            className="outline-none w-full text-base bg-transparent"
          />

          <div className="bg-[#f4f1ff] px-3 py-1.5 rounded-xl text-[#6f6c99] font-semibold text-xs flex items-center gap-1">
            <Command size={12} />
            K
          </div>
        </div>

        {/* NOTIFICATION */}
        <div className="relative">
          <Bell
            size={28}
            className="text-[#5b21b6]"
          />

          <span className="absolute -top-1 -right-1 w-5 h-5 bg-violet-600 rounded-full text-white text-[10px] font-bold flex items-center justify-center">
            3
          </span>
        </div>

        {/* PROFILE */}
        <div
          className="relative"
          ref={dropdownRef}
        >
          {/* AVATAR */}
          <button
            onClick={() =>
              setOpen(!open)
            }
            className="flex items-center gap-3 bg-white px-3 py-2 rounded-2xl border border-[#f0ebff] hover:shadow-md transition"
          >
            <img
              src="https://i.pravatar.cc/100?img=12"
              alt="avatar"
              className="w-12 h-12 rounded-full border-2 border-white shadow-md"
            />

            <div className="text-left hidden lg:block">
              <h2 className="text-sm font-bold text-[#1d1b4b]">
                {user?.email?.split(
                  "@"
                )[0] || "Admin"}
              </h2>

              <p className="text-xs text-[#8a86b3]">
                Administrator
              </p>
            </div>

            <ChevronDown
              size={18}
              className={`text-[#8a86b3] transition ${
                open
                  ? "rotate-180"
                  : ""
              }`}
            />
          </button>

          {/* DROPDOWN */}
          {open && (
            <div className="absolute right-0 top-[75px] w-64 bg-white rounded-3xl border border-[#f0ebff] shadow-[0_10px_40px_rgba(124,58,237,0.12)] overflow-hidden z-50">
              {/* HEADER */}
              <div className="p-5 border-b border-[#f0ebff]">
                <div className="flex items-center gap-3">
                  <img
                    src="https://i.pravatar.cc/100?img=12"
                    className="w-14 h-14 rounded-full"
                  />

                  <div>
                    <h2 className="font-bold text-[#1d1b4b]">
                      {user?.email?.split(
                        "@"
                      )[0] ||
                        "Admin"}
                    </h2>

                    <p className="text-sm text-[#8a86b3] break-all">
                      {
                        user?.email
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* MENU */}
              <div className="p-3">
                {/* PROFILE */}
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-[#faf9ff] transition text-[#1d1b4b]">
                  <User size={18} />

                  <span className="font-medium">
                    My Profile
                  </span>
                </button>

                {/* SETTINGS */}
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-[#faf9ff] transition text-[#1d1b4b]">
                  <Settings size={18} />

                  <span className="font-medium">
                    Settings
                  </span>
                </button>

                {/* LOGOUT */}
                <button
                  onClick={
                    handleLogout
                  }
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-red-50 transition text-red-600"
                >
                  <LogOut
                    size={18}
                  />

                  <span className="font-medium">
                    Logout
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}