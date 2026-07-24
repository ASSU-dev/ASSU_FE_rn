export const ENV = {
	API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL ?? "",
	STOMP_BROKER_URL: process.env.EXPO_PUBLIC_STOMP_BROKER_URL ?? "",
	USE_MOCKS: process.env.EXPO_PUBLIC_USE_MOCKS === "true",
	SSU_LOGIN_URL: process.env.EXPO_PUBLIC_SSU_LOGIN_URL ?? "",
	SSU_TEST_SIDNO: process.env.EXPO_PUBLIC_SSU_TEST_SIDNO ?? "",
	SSU_TEST_STOKEN: process.env.EXPO_PUBLIC_SSU_TEST_STOKEN ?? "",
} as const;
