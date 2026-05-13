// store/customers.ts
import { create } from 'zustand';
import { createClient } from '@/lib/supabase/client';

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  address?: string;
  join_date: string;
  total_redemptions: number;
  total_spent?: number;
  total_points?: number;
  status: 'Active' | 'Inactive';
  last_active?: string;
  created_at: string;
  updated_at: string;
}

interface CustomerState {
  customers: Customer[];
  loading: boolean;
  error: string | null;
  fetchCustomers: () => Promise<void>;
  addCustomer: (customer: Omit<Customer, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateCustomer: (id: number, updates: Partial<Customer>) => Promise<void>;
  deleteCustomer: (id: number) => Promise<void>;
}

export const useCustomerStore = create<CustomerState>((set, get) => ({
  customers: [],
  loading: false,
  error: null,

  fetchCustomers: async () => {
    set({ loading: true, error: null });
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      set({ customers: data || [], loading: false });
    } catch (err) {
      set({ 
        error: err instanceof Error ? err.message : 'Failed to fetch customers',
        loading: false 
      });
    }
  },

  addCustomer: async (customer) => {
    set({ loading: true, error: null });
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from('customers')
        .insert([customer])
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      // Refresh the customer list
      await get().fetchCustomers();
    } catch (err) {
      set({ 
        error: err instanceof Error ? err.message : 'Failed to add customer',
        loading: false 
      });
    }
  },

  updateCustomer: async (id, updates) => {
    set({ loading: true, error: null });
    const supabase = createClient();

    try {
      const { error } = await supabase
        .from('customers')
        .update(updates)
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      // Refresh the customer list
      await get().fetchCustomers();
    } catch (err) {
      set({ 
        error: err instanceof Error ? err.message : 'Failed to update customer',
        loading: false 
      });
    }
  },

  deleteCustomer: async (id) => {
    set({ loading: true, error: null });
    const supabase = createClient();

    try {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      // Refresh the customer list
      await get().fetchCustomers();
    } catch (err) {
      set({ 
        error: err instanceof Error ? err.message : 'Failed to delete customer',
        loading: false 
      });
    }
  },
}));