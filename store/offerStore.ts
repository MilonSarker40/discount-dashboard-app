import { create } from "zustand";

import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

/* --------------------------------
   TYPES
-------------------------------- */

export interface Offer {
  id: string;

  outlet_id: string;

  name: string;

  discount_type: string;

  discount_value: string;

  description: string;

  terms_conditions: string;

  offer_image: string;

  start_date_time: string;

  expiry_date: string;

  is_active: boolean;

  created_at: string;

  is_published: boolean;
}

/* --------------------------------
   STORE TYPES
-------------------------------- */

interface OfferStore {
  offers: Offer[];

  loading: boolean;

  fetchOffers: () => Promise<void>;

  fetchOffersByOutletId: (
    outletId: string
  ) => Promise<void>;
}

/* --------------------------------
   STORE
-------------------------------- */

export const useOfferStore =
  create<OfferStore>((set) => ({
    offers: [],

    loading: false,

    /* --------------------------------
       FETCH ALL OFFERS
    -------------------------------- */

    fetchOffers: async () => {
      set({
        loading: true,
      });

      const {
        data,
        error,
      } = await supabase
        .from("offers")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.log(error);
      }

      set({
        offers: data || [],
        loading: false,
      });
    },

    /* --------------------------------
       FETCH OFFERS BY OUTLET
    -------------------------------- */

    fetchOffersByOutletId:
      async (outletId) => {
        set({
          loading: true,
        });

        const {
          data,
          error,
        } = await supabase
          .from("offers")
          .select("*")
          .eq(
            "outlet_id",
            outletId
          )
          .order(
            "created_at",
            {
              ascending: false,
            }
          );

        if (error) {
          console.log(error);
        }

        set({
          offers: data || [],
          loading: false,
        });
      },
  }));