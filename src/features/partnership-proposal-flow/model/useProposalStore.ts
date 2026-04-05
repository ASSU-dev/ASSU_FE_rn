import { create } from "zustand";
import type { BenefitItem, ProposalStep1Form, ProposalStep2Form } from "./types";

type State = {
	step1: ProposalStep1Form;
	benefits: BenefitItem[];
	step2: ProposalStep2Form;
};

type Actions = {
	setStep1: (data: Partial<ProposalStep1Form>) => void;
	addBenefit: () => void;
	removeBenefit: (id: string) => void;
	updateBenefit: (id: string, data: Partial<BenefitItem>) => void;
	setStep2: (data: Partial<ProposalStep2Form>) => void;
	reset: () => void;
};

const initialState: State = {
	step1: { companyName: "", proposerName: "" },
	benefits: [],
	step2: { startDate: null, endDate: null, contractFile: null },
};

export const useProposalStore = create<State & Actions>((set) => ({
	...initialState,
	setStep1: (data) =>
		set((s) => ({ step1: { ...s.step1, ...data } })),
	addBenefit: () =>
		set((s) => ({
			benefits: [
				...s.benefits,
				{
					id: Date.now().toString(),
					serviceType: "서비스 제공",
					criteria: ["금액"],
					amount: "",
					items: [],
				},
			],
		})),
	removeBenefit: (id) =>
		set((s) => ({ benefits: s.benefits.filter((b) => b.id !== id) })),
	updateBenefit: (id, data) =>
		set((s) => ({
			benefits: s.benefits.map((b) => (b.id === id ? { ...b, ...data } : b)),
		})),
	setStep2: (data) =>
		set((s) => ({ step2: { ...s.step2, ...data } })),
	reset: () => set(initialState),
}));
