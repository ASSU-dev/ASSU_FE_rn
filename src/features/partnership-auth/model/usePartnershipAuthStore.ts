import { create } from "zustand";
import type {
	GroupCertificationSession,
	PartnershipAnalyticsContext,
	PartnershipBenefit,
	VerifiedPartnershipStore,
} from "./types";

interface PartnershipAuthState {
	store: VerifiedPartnershipStore | null;
	selectedBenefit: PartnershipBenefit | null;
	groupSession: GroupCertificationSession | null;
	analyticsContext: PartnershipAnalyticsContext | null;
	setStore: (store: VerifiedPartnershipStore) => void;
	setAnalyticsContext: (context: PartnershipAnalyticsContext) => void;
	setSelectedBenefit: (benefit: PartnershipBenefit) => void;
	setGroupSession: (session: GroupCertificationSession) => void;
	setGroupProgress: (count: number) => void;
	completeGroupSession: (count: number, userIds: number[]) => void;
	reset: () => void;
}

export const usePartnershipAuthStore = create<PartnershipAuthState>((set) => ({
	store: null,
	selectedBenefit: null,
	groupSession: null,
	analyticsContext: null,
	setStore: (store) =>
		set({ store, selectedBenefit: null, groupSession: null }),
	setAnalyticsContext: (analyticsContext) => set({ analyticsContext }),
	setSelectedBenefit: (selectedBenefit) => set({ selectedBenefit }),
	setGroupSession: (groupSession) => set({ groupSession }),
	setGroupProgress: (count) =>
		set((state) =>
			state.groupSession
				? {
						groupSession: {
							...state.groupSession,
							count,
						},
					}
				: state,
		),
	completeGroupSession: (count, userIds) =>
		set((state) =>
			state.groupSession
				? {
						groupSession: {
							...state.groupSession,
							count,
							status: "COMPLETED",
							userIds,
						},
					}
				: state,
		),
	reset: () =>
		set({
			store: null,
			selectedBenefit: null,
			groupSession: null,
			analyticsContext: null,
		}),
}));
