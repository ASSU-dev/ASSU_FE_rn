import { useAuthStore } from "@/shared/lib/auth/authStore";
import { clearTokens } from "./auth";
import { apiInstance } from "./instance";
import {
	getAccessToken,
	getRefreshToken,
	setAccessToken,
	setRefreshToken,
} from "./token-storage";

const REFRESH_URL = "/auth/tokens/refresh";

/** 파일 업로드는 기본 10초로 부족해 별도 상한을 둔다 */
const UPLOAD_TIMEOUT_MS = 60_000;

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

let lastLoggedToken: string | null = null;

apiInstance.interceptors.request.use((config) => {
	const token = useAuthStore.getState().accessToken;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
		// 토큰 원문은 로그에 남기지 않고, 값이 바뀐 시점만 기록한다.
		if (__DEV__ && token !== lastLoggedToken) {
			lastLoggedToken = token;
			console.log("[TOKEN] access token updated");
		}
	}
	if (config.data instanceof FormData) {
		config.timeout = UPLOAD_TIMEOUT_MS;
	}
	console.log("[API REQ]", config.method?.toUpperCase(), config.url);
	return config;
});

apiInstance.interceptors.response.use(
	(response) => {
		console.log("[API RES]", response.status, response.config.url);
		return response;
	},
	async (error) => {
		const status = error.response?.status;
		console.log(
			"[API ERR]",
			status,
			error.config?.url,
			error.response?.data?.code,
			error.response?.data?.message,
		);

		const originalRequest = error.config;

		// refresh 엔드포인트나 이미 재시도한 요청은 인터셉터 제외 → 무한루프 방지
		if (originalRequest.url === REFRESH_URL || originalRequest._retry) {
			await clearTokens();
			return Promise.reject(error);
		}

		if (status !== 401) {
			return Promise.reject(error);
		}

		// 이미 refresh 중이면 완료될 때까지 대기 후 재시도
		if (isRefreshing) {
			return new Promise((resolve, reject) => {
				refreshSubscribers.push((newToken) => {
					if (!newToken) {
						reject(error);
						return;
					}
					originalRequest.headers.Authorization = `Bearer ${newToken}`;
					resolve(apiInstance(originalRequest));
				});
			});
		}

		originalRequest._retry = true;
		isRefreshing = true;

		try {
			const storedRefresh = await getRefreshToken();
			const storedAccess =
				useAuthStore.getState().accessToken ?? (await getAccessToken());
			if (!storedRefresh || !storedAccess) {
				await clearTokens();
				return Promise.reject(error);
			}

			const res = await apiInstance.post(
				REFRESH_URL,
				{},
				{
					headers: {
						Authorization: `Bearer ${storedAccess}`,
						RefreshToken: storedRefresh,
					},
				},
			);

			const { newAccess, newRefresh } = res.data.result ?? {};
			if (!newAccess || !newRefresh) throw new Error("토큰 갱신 실패");

			useAuthStore.getState().setAccessToken(newAccess);
			await setAccessToken(newAccess);
			await setRefreshToken(newRefresh);

			for (const cb of refreshSubscribers) cb(newAccess);
			originalRequest.headers.Authorization = `Bearer ${newAccess}`;
			return apiInstance(originalRequest);
		} catch {
			await clearTokens();
			for (const cb of refreshSubscribers) cb("");
			return Promise.reject(error);
		} finally {
			isRefreshing = false;
			refreshSubscribers = [];
		}
	},
);
