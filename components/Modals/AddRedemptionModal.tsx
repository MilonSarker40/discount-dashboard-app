// components/Modals/AddRedemptionModal.tsx
"use client";

import { useState } from "react";
import { X, Ticket } from "lucide-react";
import { useDataStore } from "@/store/dataStore";

interface AddRedemptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddRedemptionModal({ isOpen, onClose }: AddRedemptionModalProps) {
  const addRedemption = useDataStore((state) => state.addRedemption);
  const customers = useDataStore((state) => state.customers);
  const offers = useDataStore((state) => state.offers);
  
  const [formData, setFormData] = useState({
    customerId: 0,
    offerId: 0,
    status: "Pending" as const,
    points: 0,
    location: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const customer = customers.find(c => c.id === formData.customerId);
    const offer = offers.find(o => o.id === formData.offerId);
    
    if (customer && offer) {
      addRedemption({
        customerId: customer.id,
        customerName: customer.name,
        customerEmail: customer.email,
        offerId: offer.id,
        offerTitle: offer.title,
        shopId: offer.shopId,
        shopName: offer.shopName,
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString(),
        status: formData.status,
        points: formData.points,
        location: formData.location,
      });
    }
    onClose();
    setFormData({ customerId: 0, offerId: 0, status: "Pending", points: 0, location: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[32px] max-w-2xl w-full">
        <div className="p-6 border-b border-[#f0ebff] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <Ticket size={20} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#1d1b4b]">Add Redemption</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#1d1b4b] font-semibold mb-2">Select Customer *</label>
              <select
                required
                value={formData.customerId}
                onChange={(e) => setFormData({ ...formData, customerId: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border border-[#e0d9ff] focus:outline-none focus:border-violet-500"
              >
                <option value={0}>Select a customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>{customer.name} ({customer.email})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[#1d1b4b] font-semibold mb-2">Select Offer *</label>
              <select
                required
                value={formData.offerId}
                onChange={(e) => setFormData({ ...formData, offerId: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border border-[#e0d9ff] focus:outline-none focus:border-violet-500"
              >
                <option value={0}>Select an offer</option>
                {offers.map((offer) => (
                  <option key={offer.id} value={offer.id}>{offer.title} - {offer.shopName}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#1d1b4b] font-semibold mb-2">Points Earned *</label>
              <input
                type="number"
                required
                value={formData.points}
                onChange={(e) => setFormData({ ...formData, points: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border border-[#e0d9ff] focus:outline-none focus:border-violet-500"
                placeholder="Points"
              />
            </div>
            <div>
              <label className="block text-[#1d1b4b] font-semibold mb-2">Location *</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#e0d9ff] focus:outline-none focus:border-violet-500"
                placeholder="Store location"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#1d1b4b] font-semibold mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-4 py-3 rounded-xl border border-[#e0d9ff] focus:outline-none focus:border-violet-500"
            >
              <option>Pending</option>
              <option>Completed</option>
              <option>Failed</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-6 py-3 rounded-xl border border-[#e0d9ff] font-semibold hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="flex-1 px-6 py-3 rounded-xl bg-violet-700 text-white font-semibold hover:bg-violet-800">
              Add Redemption
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}