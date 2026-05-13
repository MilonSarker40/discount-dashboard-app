import { create } from "zustand";

import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export interface Outlet {
  id: string;

  shop_id: string;

  name: string;

  contact_number: string;

  email: string;

  address: string;

  latitude: number;

  longitude: number;

  about: string;

  outlet_image: string | null;

  is_active: boolean;

  created_at: string;
}

interface OutletStore {
  outlets: Outlet[];

  loading: boolean;

  fetchOutletsByShopId: (
    shopId: string
  ) => Promise<void>;
}

export const useOutletStore =
  create<OutletStore>((set) => ({
    outlets: [],

    loading: false,

    fetchOutletsByShopId:
      async (shopId) => {
        try {
          set({
            loading: true,
          });

          console.log(
            "SHOP ID:",
            shopId
          );

          const {
            data,
            error,
          } = await supabase
            .from("outlets")
            .select("*")
            .eq(
              "shop_id",
              shopId
            )
            .order(
              "created_at",
              {
                ascending: false,
              }
            );

          console.log(
            "OUTLETS:",
            data
          );

          if (error) {
            console.log(
              "OUTLET ERROR:",
              error
            );
          }

          set({
            outlets: data || [],
            loading: false,
          });
        } catch (err) {
          console.log(err);

          set({
            loading: false,
          });
        }
      },
  }));