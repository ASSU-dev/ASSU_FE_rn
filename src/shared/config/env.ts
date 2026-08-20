export const ENV = {
	API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL ?? "",
	STOMP_BROKER_URL: process.env.EXPO_PUBLIC_STOMP_BROKER_URL ?? "",
	USE_MOCKS: process.env.EXPO_PUBLIC_USE_MOCKS === "true",
	SSU_LOGIN_URL: process.env.EXPO_PUBLIC_SSU_LOGIN_URL ?? "",
	// 개발 빌드 전용 테스트 인증 정보. EXPO_PUBLIC_* 는 번들에 포함되므로
	// 프로덕션 번들(__DEV__ === false)에서는 값이 있어도 무시한다.
	SSU_TEST_SIDNO: __DEV__ ? (process.env.EXPO_PUBLIC_SSU_TEST_SIDNO ?? "") : "",
	SSU_TEST_STOKEN: __DEV__
		? (process.env.EXPO_PUBLIC_SSU_TEST_STOKEN ?? "")
		: "",
} as const;
