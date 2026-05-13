import { create } from "zustand";

import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export interface Location {
  id: string;

  name: string;

  latitude: number;

  longitude: number;

  is_active: boolean;

  created_at: string;
}

interface LocationStore {
  locations: Location[];

  loading: boolean;

  fetchLocations: () => Promise<void>;
}

export const useLocationStore =
  create<LocationStore>((set) => ({
    locations: [],

    loading: false,

    fetchLocations: async () => {
      set({ loading: true });

      const { data, error } =
        await supabase
          .from("locations")
          .select("*")
          .order("name", {
            ascending: true,
          });

      if (error) {
        console.log(error);
      }

      set({
        locations: data || [],
        loading: false,
      });
    },
  }));