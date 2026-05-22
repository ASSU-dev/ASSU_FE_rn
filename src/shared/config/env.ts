export const ENV = {
	API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL ?? "",
	USE_MOCKS: process.env.EXPO_PUBLIC_USE_MOCKS === "true",
} as const;
