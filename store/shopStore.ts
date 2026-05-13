import { create } from "zustand";

import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export interface Shop {
  id: string;
  name: string;
  description: string | null;
  latitude: number;
  longitude: number;
  address: string;
  created_at: string;
  shop_image_url: string | null;
  owner_id: string;
  category_id: string;
  is_active: boolean;
  mobile_number: string;
  email: string;
  about: string;
}

interface ShopStore {
  shops: Shop[];

  selectedShop: Shop | null;

  loading: boolean;

  fetchShops: () => Promise<void>;

  fetchShopById: (
    id: string
  ) => Promise<void>;
}

export const useShopStore =
  create<ShopStore>((set) => ({
    shops: [],

    selectedShop: null,

    loading: false,

    fetchShops: async () => {
      set({ loading: true });

      const { data, error } =
        await supabase
          .from("shops")
          .select("*")
          .order("created_at", {
            ascending: false,
          });

      if (error) {
        console.log(error);
      }

      set({
        shops: data || [],
        loading: false,
      });
    },

    fetchShopById: async (
      id: string
    ) => {
      set({ loading: true });

      const { data, error } =
        await supabase
          .from("shops")
          .select("*")
          .eq("id", id)
          .single();

      if (error) {
        console.log(error);
      }

      set({
        selectedShop: data,
        loading: false,
      });
    },
  }));