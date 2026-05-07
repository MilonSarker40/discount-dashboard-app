// store/dashboardStore.ts
import { create } from "zustand";

export type MenuItem =
  | "Dashboard"
  | "All Shop"
  | "All Customer"
  | "All Offer"
  | "Redemption List"
  | "Login";

interface DashboardState {
  activeMenu: MenuItem;
  setActiveMenu: (menu: MenuItem) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  activeMenu: "Dashboard",
  setActiveMenu: (menu) => set({ activeMenu: menu }),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));