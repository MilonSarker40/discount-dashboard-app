// components/Modals/AddOfferModal.tsx
"use client";

import { useState } from "react";
import { X, Gift } from "lucide-react";
import { useDataStore } from "@/store/dataStore";

interface AddOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddOfferModal({ isOpen, onClose }: AddOfferModalProps) {
  const addOffer = useDataStore((state) => state.addOffer);
  const shops = useDataStore((state) => state.shops);
  
  const [formData, setFormData] = useState({
    title: "",
    shopId: 0,
    shopName: "",
    discount: "",
    code: "",
    validFrom: "",
    validTo: "",
    type: "Percentage",
    limit: 100,
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedShop = shops.find(s => s.id === formData.shopId);
    addOffer({
      ...formData,
      shopName: selectedShop?.name || "",
      status: "Active",
      totalRedemptions: 0,
      usedCount: 0,
    });
    onClose();
    setFormData({
      title: "",
      shopId: 0,
      shopName: "",
      discount: "",
      code: "",
      validFrom: "",
      validTo: "",
      type: "Percentage",
      limit: 100,
      description: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[32px] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-[#f0ebff] flex items-center justify-between sticky top-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">
              <Gift size={20} className="text-pink-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#1d1b4b]">Create New Offer</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#1d1b4b] font-semibold mb-2">Offer Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#e0d9ff] focus:outline-none focus:border-violet-500"
                placeholder="e.g., 50% OFF Pizza"
              />
            </div>
            <div>
              <label className="block text-[#1d1b4b] font-semibold mb-2">Select Shop *</label>
              <select
                required
                value={formData.shopId}
                onChange={(e) => setFormData({ ...formData, shopId: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border border-[#e0d9ff] focus:outline-none focus:border-violet-500"
              >
                <option value={0}>Select a shop</option>
                {shops.map((shop) => (
                  <option key={shop.id} value={shop.id}>{shop.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#1d1b4b] font-semibold mb-2">Discount *</label>
              <input
                type="text"
                required
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#e0d9ff] focus:outline-none focus:border-violet-500"
                placeholder="50% OFF / BOGO"
              />
            </div>
            <div>
              <label className="block text-[#1d1b4b] font-semibold mb-2">Offer Code *</label>
              <input
                type="text"
                required
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                className="w-full px-4 py-3 rounded-xl border border-[#e0d9ff] focus:outline-none focus:border-violet-500"
                placeholder="OFFER2024"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#1d1b4b] font-semibold mb-2">Valid From *</label>
              <input
                type="date"
                required
                value={formData.validFrom}
                onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#e0d9ff] focus:outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-[#1d1b4b] font-semibold mb-2">Valid To *</label>
              <input
                type="date"
                required
                value={formData.validTo}
                onChange={(e) => setFormData({ ...formData, validTo: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#e0d9ff] focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#1d1b4b] font-semibold mb-2">Offer Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#e0d9ff] focus:outline-none focus:border-violet-500"
              >
                <option>Percentage</option>
                <option>Fixed Amount</option>
                <option>BOGO</option>
                <option>Free Item</option>
              </select>
            </div>
            <div>
              <label className="block text-[#1d1b4b] font-semibold mb-2">Redemption Limit</label>
              <input
                type="number"
                value={formData.limit}
                onChange={(e) => setFormData({ ...formData, limit: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border border-[#e0d9ff] focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#1d1b4b] font-semibold mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-[#e0d9ff] focus:outline-none focus:border-violet-500"
              placeholder="Offer description..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-6 py-3 rounded-xl border border-[#e0d9ff] font-semibold hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="flex-1 px-6 py-3 rounded-xl bg-violet-700 text-white font-semibold hover:bg-violet-800">
              Create Offer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}