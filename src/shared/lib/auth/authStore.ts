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
	role: UserRole | null;
	basicInfo: UserBasicInfo | null;
	setAccessToken: (token: string) => void;
	setRole: (role: UserRole) => void;
	setBasicInfo: (basicInfo: UserBasicInfo | null) => void;
	clearAccessToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	accessToken: null,
	role: null,
	basicInfo: null,
	setAccessToken: (token) => set({ accessToken: token }),
	setRole: (role) => set({ role }),
	setBasicInfo: (basicInfo) => set({ basicInfo }),
	clearAccessToken: () =>
		set({ accessToken: null, role: null, basicInfo: null }),
}));
