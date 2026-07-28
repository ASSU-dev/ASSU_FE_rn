import { create } from "zustand";

export type UserRole = "STUDENT" | "ADMIN" | "PARTNER";

export interface UserBasicInfo {
	name?: string;
	university?: string;
	department?: string;
	major?: string;
}

interface AuthState {
	accessToken: string | null;
	memberId: number | null;
	role: UserRole | null;
	basicInfo: UserBasicInfo | null;
	setAccessToken: (token: string) => void;
	setMemberId: (memberId: number | null) => void;
	setRole: (role: UserRole) => void;
	setBasicInfo: (basicInfo: UserBasicInfo | null) => void;
	clearAccessToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	accessToken: null,
	memberId: null,
	role: null,
	basicInfo: null,
	setAccessToken: (token) => set({ accessToken: token }),
	setMemberId: (memberId) => set({ memberId }),
	setRole: (role) => set({ role }),
	setBasicInfo: (basicInfo) => set({ basicInfo }),
	clearAccessToken: () =>
		set({ accessToken: null, memberId: null, role: null, basicInfo: null }),
}));
