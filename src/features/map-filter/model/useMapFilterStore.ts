import { create } from "zustand";

import type { StoreCategory } from "@/entities/store";

/** recommend = 서버 기본 순서, distance = 내 위치 기준 클라이언트 정렬 */
export type MapSortType = "recommend" | "distance";

interface MapFilterStore {
	storeCategory: StoreCategory | null;
	adminId: string | null;
	sortType: MapSortType;
	toggleStoreCategory: (category: StoreCategory) => void;
	toggleAdminId: (adminId: string) => void;
	setSortType: (sortType: MapSortType) => void;
	reset: () => void;
}

/** 지도/전체 리스트 화면이 공유하는 필터 선택 상태 */
export const useMapFilterStore = create<MapFilterStore>((set) => ({
	storeCategory: null,
	adminId: null,
	sortType: "recommend",
	toggleStoreCategory: (category) =>
		set((state) => ({
			storeCategory: state.storeCategory === category ? null : category,
		})),
	toggleAdminId: (adminId) =>
		set((state) => ({
			adminId: state.adminId === adminId ? null : adminId,
		})),
	setSortType: (sortType) => set({ sortType }),
	reset: () =>
		set({ storeCategory: null, adminId: null, sortType: "recommend" }),
}));
