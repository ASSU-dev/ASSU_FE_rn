import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type RenderOptions, render } from "@testing-library/react-native";
import type React from "react";
import {
	initialWindowMetrics,
	SafeAreaProvider,
} from "react-native-safe-area-context";

function createTestQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: { retry: false },
			mutations: { retry: false },
		},
	});
}

export function renderWithProviders(
	ui: React.ReactElement,
	options?: RenderOptions,
) {
	const queryClient = createTestQueryClient();
	return render(
		<SafeAreaProvider initialMetrics={initialWindowMetrics}>
			<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
		</SafeAreaProvider>,
		options,
	);
}
