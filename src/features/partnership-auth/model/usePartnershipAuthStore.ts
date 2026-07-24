import { create } from "zustand";
import type { PartnershipBenefit, VerifiedPartnershipStore } from "./types";

interface PartnershipAuthState {
	store: VerifiedPartnershipStore | null;
	selectedBenefit: PartnershipBenefit | null;
	setStore: (store: VerifiedPartnershipStore) => void;
	setSelectedBenefit: (benefit: PartnershipBenefit) => void;
	reset: () => void;
}

export const usePartnershipAuthStore = create<PartnershipAuthState>((set) => ({
	store: null,
	selectedBenefit: null,
	setStore: (store) => set({ store, selectedBenefit: null }),
	setSelectedBenefit: (selectedBenefit) => set({ selectedBenefit }),
	reset: () => set({ store: null, selectedBenefit: null }),
}));
