import { apiInstance } from "./instance";

// TODO: 로그인 구현 후 실제 토큰 저장소(SecureStore 등)에서 읽도록 교체
const getToken = (): string | null => null;

apiInstance.interceptors.request.use((config) => {
	const token = getToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	console.log(
		"[API REQ]",
		config.method?.toUpperCase(),
		config.url,
		JSON.stringify(config.data),
	);
	return config;
});

apiInstance.interceptors.response.use(
	(response) => {
		console.log(
			"[API RES]",
			response.status,
			response.config.url,
			JSON.stringify(response.data),
		);
		return response;
	},
	(error) => {
		const status = error.response?.status;
		console.log(
			"[API ERR]",
			status,
			error.config?.url,
			JSON.stringify(error.response?.data),
		);

		if (status === 401) {
			// TODO: 로그아웃 처리 (토큰 저장소 연동 후 구현)
		}

		return Promise.reject(error);
	},
);
