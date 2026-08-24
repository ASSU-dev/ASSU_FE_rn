import { create } from "zustand";

import type { StoreCategory } from "@/entities/store";

interface MapFilterStore {
	storeCategory: StoreCategory | null;
	adminId: string | null;
	toggleStoreCategory: (category: StoreCategory) => void;
	toggleAdminId: (adminId: string) => void;
	reset: () => void;
}

/** 지도/전체 리스트 화면이 공유하는 필터 선택 상태 */
export const useMapFilterStore = create<MapFilterStore>((set) => ({
	storeCategory: null,
	adminId: null,
	toggleStoreCategory: (category) =>
		set((state) => ({
			storeCategory: state.storeCategory === category ? null : category,
		})),
	toggleAdminId: (adminId) =>
		set((state) => ({
			adminId: state.adminId === adminId ? null : adminId,
		})),
	reset: () => set({ storeCategory: null, adminId: null }),
}));
