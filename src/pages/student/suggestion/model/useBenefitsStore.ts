import { create } from "zustand";
import type { Benefit } from "./types";

interface BenefitsStore {
	benefits: Benefit[];
	addBenefit: (benefit: Benefit) => void;
}

export const useBenefitsStore = create<BenefitsStore>((set) => ({
	benefits: [],
	addBenefit: (benefit) =>
		set((state) => ({ benefits: [...state.benefits, benefit] })),
}));
