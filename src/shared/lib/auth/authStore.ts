import { create } from "zustand";

export type UserRole = "STUDENT" | "ADMIN" | "PARTNER";

interface AuthState {
	accessToken: string | null;
	role: UserRole | null;
	setAccessToken: (token: string) => void;
	setRole: (role: UserRole) => void;
	clearAccessToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	accessToken: null,
	role: null,
	setAccessToken: (token) => set({ accessToken: token }),
	setRole: (role) => set({ role }),
	clearAccessToken: () => set({ accessToken: null, role: null }),
}));
