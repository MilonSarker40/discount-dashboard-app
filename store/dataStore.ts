// store/dataStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Shop {
  id: number;
  name: string;
  owner: string;
  email: string;
  phone: string;
  location: string;
  address: string;
  joinDate: string;
  status: "Active" | "Pending" | "Inactive";
  totalOffers: number;
  totalRedemptions: number;
  rating: number;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  totalRedemptions: number;
  totalPoints: number;
  status: "Active" | "Inactive";
  lastActive: string;
}

export interface Offer {
  id: number;
  title: string;
  shopId: number;
  shopName: string;
  discount: string;
  code: string;
  validFrom: string;
  validTo: string;
  status: "Active" | "Expired" | "Upcoming";
  totalRedemptions: number;
  usedCount: number;
  limit: number;
  type: string;
  description: string;
}

export interface Redemption {
  id: number;
  customerId: number;
  customerName: string;
  customerEmail: string;
  offerId: number;
  offerTitle: string;
  shopId: number;
  shopName: string;
  date: string;
  time: string;
  status: "Completed" | "Pending" | "Failed";
  points: number;
  location: string;
}

interface DataState {
  shops: Shop[];
  customers: Customer[];
  offers: Offer[];
  redemptions: Redemption[];
  
  // Shop actions
  addShop: (shop: Omit<Shop, "id">) => void;
  updateShop: (id: number, shop: Partial<Shop>) => void;
  deleteShop: (id: number) => void;
  
  // Customer actions
  addCustomer: (customer: Omit<Customer, "id">) => void;
  updateCustomer: (id: number, customer: Partial<Customer>) => void;
  deleteCustomer: (id: number) => void;
  
  // Offer actions
  addOffer: (offer: Omit<Offer, "id">) => void;
  updateOffer: (id: number, offer: Partial<Offer>) => void;
  deleteOffer: (id: number) => void;
  
  // Redemption actions
  addRedemption: (redemption: Omit<Redemption, "id">) => void;
  updateRedemption: (id: number, redemption: Partial<Redemption>) => void;
  deleteRedemption: (id: number) => void;
}

// Initial data
const initialShops: Shop[] = [
  { id: 1, name: "Burger King", owner: "Nayeem", email: "nayeem@burgerking.com", phone: "+880 1234 56789", location: "Dhaka", address: "Gulshan Avenue", joinDate: "2024-01-15", status: "Active", totalOffers: 12, totalRedemptions: 234, rating: 4.5 },
  { id: 2, name: "Coffee House", owner: "Jihad", email: "jihad@coffeehouse.com", phone: "+880 2345 67890", location: "Mirpur", address: "Mirpur DOHS", joinDate: "2024-02-10", status: "Active", totalOffers: 8, totalRedemptions: 156, rating: 4.8 },
  { id: 3, name: "Pizza Hut", owner: "Rahim", email: "rahim@pizzahut.com", phone: "+880 3456 78901", location: "Gulshan", address: "Gulshan-2", joinDate: "2024-01-20", status: "Active", totalOffers: 15, totalRedemptions: 342, rating: 4.7 },
];

const initialCustomers: Customer[] = [
  { id: 1, name: "Rahim", email: "rahim@gmail.com", phone: "+880 1712 345678", location: "Dhaka", joinDate: "2024-01-15", totalRedemptions: 12, totalPoints: 450, status: "Active", lastActive: "2024-05-20" },
  { id: 2, name: "Karim", email: "karim@gmail.com", phone: "+880 1812 345679", location: "Chittagong", joinDate: "2024-02-20", totalRedemptions: 8, totalPoints: 280, status: "Active", lastActive: "2024-05-19" },
  { id: 3, name: "Fatema", email: "fatema@yahoo.com", phone: "+880 1912 345680", location: "Dhaka", joinDate: "2024-03-10", totalRedemptions: 15, totalPoints: 520, status: "Active", lastActive: "2024-05-20" },
];

const initialOffers: Offer[] = [
  { id: 1, title: "50% OFF Pizza", shopId: 3, shopName: "Pizza Hut", discount: "50% OFF", code: "PIZZA50", validFrom: "2024-05-20", validTo: "2024-05-30", status: "Active", totalRedemptions: 120, usedCount: 78, limit: 200, type: "Percentage", description: "Get 50% off on all large pizzas" },
  { id: 2, title: "Buy 1 Get 1", shopId: 1, shopName: "Burger King", discount: "BOGO", code: "BK2024", validFrom: "2024-05-18", validTo: "2024-05-25", status: "Active", totalRedemptions: 85, usedCount: 85, limit: 100, type: "BOGO", description: "Buy one get one free on Whopper" },
];

const initialRedemptions: Redemption[] = [
  { id: 1, customerId: 1, customerName: "Rahim", customerEmail: "rahim@gmail.com", offerId: 1, offerTitle: "50% OFF Pizza", shopId: 3, shopName: "Pizza Hut", date: "2024-05-20", time: "14:30", status: "Completed", points: 50, location: "Gulshan" },
  { id: 2, customerId: 2, customerName: "Karim", customerEmail: "karim@gmail.com", offerId: 2, offerTitle: "Buy 1 Get 1", shopId: 1, shopName: "Burger King", date: "2024-05-20", time: "18:45", status: "Completed", points: 30, location: "Uttara" },
];

export const useDataStore = create<DataState>()(
  persist(
    (set) => ({
      shops: initialShops,
      customers: initialCustomers,
      offers: initialOffers,
      redemptions: initialRedemptions,

      // Shop actions
      addShop: (shop) => set((state) => ({
        shops: [...state.shops, { ...shop, id: Date.now() }]
      })),
      updateShop: (id, updatedShop) => set((state) => ({
        shops: state.shops.map((shop) => shop.id === id ? { ...shop, ...updatedShop } : shop)
      })),
      deleteShop: (id) => set((state) => ({
        shops: state.shops.filter((shop) => shop.id !== id)
      })),

      // Customer actions
      addCustomer: (customer) => set((state) => ({
        customers: [...state.customers, { ...customer, id: Date.now() }]
      })),
      updateCustomer: (id, updatedCustomer) => set((state) => ({
        customers: state.customers.map((customer) => customer.id === id ? { ...customer, ...updatedCustomer } : customer)
      })),
      deleteCustomer: (id) => set((state) => ({
        customers: state.customers.filter((customer) => customer.id !== id)
      })),

      // Offer actions
      addOffer: (offer) => set((state) => ({
        offers: [...state.offers, { ...offer, id: Date.now() }]
      })),
      updateOffer: (id, updatedOffer) => set((state) => ({
        offers: state.offers.map((offer) => offer.id === id ? { ...offer, ...updatedOffer } : offer)
      })),
      deleteOffer: (id) => set((state) => ({
        offers: state.offers.filter((offer) => offer.id !== id)
      })),

      // Redemption actions
      addRedemption: (redemption) => set((state) => ({
        redemptions: [...state.redemptions, { ...redemption, id: Date.now() }]
      })),
      updateRedemption: (id, updatedRedemption) => set((state) => ({
        redemptions: state.redemptions.map((redemption) => redemption.id === id ? { ...redemption, ...updatedRedemption } : redemption)
      })),
      deleteRedemption: (id) => set((state) => ({
        redemptions: state.redemptions.filter((redemption) => redemption.id !== id)
      })),
    }),
    {
      name: "discount-app-data",
    }
  )
);