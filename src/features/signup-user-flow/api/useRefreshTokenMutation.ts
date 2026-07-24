import { useMutation } from "@tanstack/react-query";
import { apiInstance, type BaseResponseRefreshResponseDTO } from "@/shared/api";
import {
	getAccessToken,
	getRefreshToken,
	setAccessToken,
	setRefreshToken,
} from "@/shared/api/token-storage";
import { useAuthStore } from "@/shared/lib/auth/authStore";

export function useRefreshTokenMutation() {
	return useMutation({
		mutationFn: async () => {
			const storedRefresh = await getRefreshToken();
			const storedAccess =
				useAuthStore.getState().accessToken ?? (await getAccessToken());
			if (!storedRefresh || !storedAccess) {
				throw new Error("저장된 토큰이 없습니다.");
			}

			const res = await apiInstance.post<BaseResponseRefreshResponseDTO>(
				"/auth/tokens/refresh",
				{},
				{
					headers: {
						Authorization: `Bearer ${storedAccess}`,
						RefreshToken: storedRefresh,
					},
				},
			);

			const { newAccess, newRefresh } = res.data.result ?? {};
			if (!newAccess || !newRefresh) {
				throw new Error("토큰 갱신 실패");
			}

			useAuthStore.getState().setAccessToken(newAccess);
			await setAccessToken(newAccess);
			await setRefreshToken(newRefresh);

			return res.data;
		},
	});
}
