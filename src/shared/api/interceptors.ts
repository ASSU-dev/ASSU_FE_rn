import { apiInstance } from "./instance";

// TODO: 로그인 구현 후 실제 토큰 저장소(SecureStore 등)에서 읽도록 교체
const getToken = (): string | null => null;

apiInstance.interceptors.request.use((config) => {
	const token = getToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

apiInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		const status = error.response?.status;

		if (status === 401) {
			// TODO: 로그아웃 처리 (토큰 저장소 연동 후 구현)
		}

		return Promise.reject(error);
	},
);
