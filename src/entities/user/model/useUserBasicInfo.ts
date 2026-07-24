import { useAuthStore } from "@/shared/lib/auth/authStore";

export function useUserBasicInfo() {
	return useAuthStore((state) => state.basicInfo);
}
