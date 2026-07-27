import { useEffect, useRef } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { WebView } from "react-native-webview";

type USaintAuthWebViewModalProps = {
	visible: boolean;
	loginUrl: string;
	onClose: () => void;
	onVerifySuccess: (payload: { sToken: string; sIdno: string }) => void;
};

export function USaintAuthWebViewModal({
	visible,
	loginUrl,
	onClose,
	onVerifySuccess,
}: USaintAuthWebViewModalProps) {
	const processedRef = useRef(false);

	useEffect(() => {
		if (!visible) return;
		processedRef.current = false;
	}, [visible]);

	const processAuthUrl = (url: string, source: string) => {
		if (processedRef.current) return;

		try {
			const parsedUrl = new URL(url);
			const hashParams = new URLSearchParams(
				parsedUrl.hash.replace(/^#\??/, ""),
			);
			const sToken =
				parsedUrl.searchParams.get("sToken") ?? hashParams.get("sToken");
			const sIdno =
				parsedUrl.searchParams.get("sIdno") ?? hashParams.get("sIdno");

			if (__DEV__)
				console.log("[LMS WEBVIEW] navigation", {
					source,
					host: parsedUrl.host,
					pathname: parsedUrl.pathname,
					queryKeys: Array.from(parsedUrl.searchParams.keys()),
					hashKeys: Array.from(hashParams.keys()),
					hasSToken: Boolean(sToken),
					hasSIdno: Boolean(sIdno),
				});

			if (!sToken || !sIdno) return;

			processedRef.current = true;
			if (__DEV__)
				console.log("[LMS WEBVIEW] auth payload detected", {
					sTokenLength: sToken.length,
					sIdnoLength: sIdno.length,
				});
			Promise.resolve(onVerifySuccess({ sToken, sIdno })).finally(() => {
				processedRef.current = false;
			});
		} catch (error) {
			if (__DEV__)
				console.log(
					"[LMS WEBVIEW] URL parse skipped",
					error instanceof Error ? error.message : "unknown error",
				);
		}
	};

	return (
		<Modal
			visible={visible}
			animationType="slide"
			presentationStyle="fullScreen"
		>
			<View className="flex-1 bg-canvas">
				<View className="flex-row items-center justify-between border-b border-content-tertiary px-screen-m pb-3 pt-14">
					<Text className="text-xl font-semibold text-content-primary">
						LMS 인증
					</Text>
					<Pressable
						onPress={() => {
							processedRef.current = false;
							onClose();
						}}
					>
						<Text className="text-md font-medium text-primary">닫기</Text>
					</Pressable>
				</View>

				<WebView
					source={{ uri: loginUrl }}
					sharedCookiesEnabled
					thirdPartyCookiesEnabled
					domStorageEnabled
					javaScriptEnabled
					onShouldStartLoadWithRequest={(request) => {
						processAuthUrl(request.url, "shouldStart");
						return true;
					}}
					onNavigationStateChange={(navState) => {
						processAuthUrl(navState.url, "navigationState");
					}}
					onLoadEnd={(event) => {
						processAuthUrl(event.nativeEvent.url, "loadEnd");
					}}
				/>
			</View>
		</Modal>
	);
}
