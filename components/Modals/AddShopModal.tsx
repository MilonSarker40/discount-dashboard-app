// components/Modals/AddShopModal.tsx
"use client";

import { useState } from "react";
import { X, Store } from "lucide-react";
import { useDataStore } from "@/store/dataStore";

interface AddShopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddShopModal({ isOpen, onClose }: AddShopModalProps) {
  const addShop = useDataStore((state) => state.addShop);
  const [formData, setFormData] = useState({
    name: "",
    owner: "",
    email: "",
    phone: "",
    location: "",
    address: "",
    status: "Active" as const,
    rating: 4.0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addShop({
      ...formData,
      joinDate: new Date().toISOString().split("T")[0],
      totalOffers: 0,
      totalRedemptions: 0,
    });
    onClose();
    setFormData({
      name: "",
      owner: "",
      email: "",
      phone: "",
      location: "",
      address: "",
      status: "Active",
      rating: 4.0,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[32px] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-[#f0ebff] flex items-center justify-between sticky top-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
              <Store size={20} className="text-violet-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#1d1b4b]">Add New Shop</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#1d1b4b] font-semibold mb-2">Shop Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#e0d9ff] focus:outline-none focus:border-violet-500"
                placeholder="Enter shop name"
              />
            </div>
            <div>
              <label className="block text-[#1d1b4b] font-semibold mb-2">Owner Name *</label>
              <input
                type="text"
                required
                value={formData.owner}
                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#e0d9ff] focus:outline-none focus:border-violet-500"
                placeholder="Enter owner name"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#1d1b4b] font-semibold mb-2">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#e0d9ff] focus:outline-none focus:border-violet-500"
                placeholder="shop@email.com"
              />
            </div>
            <div>
              <label className="block text-[#1d1b4b] font-semibold mb-2">Phone *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#e0d9ff] focus:outline-none focus:border-violet-500"
                placeholder="+880XXXXXXXXX"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#1d1b4b] font-semibold mb-2">Location *</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#e0d9ff] focus:outline-none focus:border-violet-500"
                placeholder="City name"
              />
            </div>
            <div>
              <label className="block text-[#1d1b4b] font-semibold mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-4 py-3 rounded-xl border border-[#e0d9ff] focus:outline-none focus:border-violet-500"
              >
                <option>Active</option>
                <option>Pending</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[#1d1b4b] font-semibold mb-2">Full Address</label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 rounded-xl border border-[#e0d9ff] focus:outline-none focus:border-violet-500"
              placeholder="Enter complete address"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl border border-[#e0d9ff] font-semibold hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-xl bg-violet-700 text-white font-semibold hover:bg-violet-800"
            >
              Add Shop
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}