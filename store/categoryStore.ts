import { create } from "zustand";

import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export interface Category {
  id: string;

  name: string;

  icon: string;

  created_at: string;
}

interface CategoryStore {
  categories: Category[];

  loading: boolean;

  fetchCategories: () => Promise<void>;
}

export const useCategoryStore =
  create<CategoryStore>((set) => ({
    categories: [],

    loading: false,

    fetchCategories: async () => {
      set({ loading: true });

      const { data, error } =
        await supabase
          .from("categories")
          .select("*")
          .order("created_at", {
            ascending: false,
          });

      if (error) {
        console.log(error);
      }

      set({
        categories: data || [],
        loading: false,
      });
    },
  }));