import { create } from "zustand";

import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export interface Redemption {
  id: string;

  customer_id: string;

  offer_id: string;

  outlet_id: string;

  redemption_method: string;

  is_checked_in: boolean;

  status: string;

  redeemed_at: string | null;

  created_at: string;
}

interface RedemptionStore {
  redemptions: Redemption[];

  loading: boolean;

  fetchRedemptions: () => Promise<void>;
}

export const useRedemptionStore =
  create<RedemptionStore>((set) => ({
    redemptions: [],

    loading: false,

    fetchRedemptions: async () => {
      set({ loading: true });

      const { data, error } =
        await supabase
          .from(
            "offer_redemptions"
          )
          .select("*")
          .order("created_at", {
            ascending: false,
          });

      if (error) {
        console.log(error);
      }

      set({
        redemptions: data || [],
        loading: false,
      });
    },
  }));