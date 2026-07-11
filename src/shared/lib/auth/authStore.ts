import { create } from "zustand";

export type UserRole = "STUDENT" | "ADMIN" | "PARTNER";

interface AuthState {
	accessToken: string | null;
	role: UserRole | null;
	userId: number | null;
	setAccessToken: (token: string) => void;
	setRole: (role: UserRole) => void;
	clearAccessToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	// 로그인 구현 전 임시 토큰 — 실제 배포 시 반드시 제거할 것
	accessToken: " ",
	// accessToken: null,
	role: "ADMIN",
	userId: 21,
	setAccessToken: (token) => set({ accessToken: token }),
	setRole: (role) => set({ role }),
	clearAccessToken: () => set({ accessToken: null, role: null, userId: null }),
}));
