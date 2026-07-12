declare module "react-native-webview" {
	import type { ComponentType } from "react";
	import type { ViewStyle } from "react-native";

	export interface WebViewNavigation {
		url: string;
		loading: boolean;
	}

	export interface WebViewProps {
		source: { uri: string };
		style?: ViewStyle;
		sharedCookiesEnabled?: boolean;
		thirdPartyCookiesEnabled?: boolean;
		domStorageEnabled?: boolean;
		javaScriptEnabled?: boolean;
		onNavigationStateChange?: (navState: WebViewNavigation) => void;
	}

	export const WebView: ComponentType<WebViewProps>;
}
