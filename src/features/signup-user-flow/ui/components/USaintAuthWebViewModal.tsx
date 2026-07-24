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

	const processAuthUrl = (url: string) => {
		if (processedRef.current) return;

		try {
			const parsedUrl = new URL(url);
			const sToken = parsedUrl.searchParams.get("sToken");
			const sIdno = parsedUrl.searchParams.get("sIdno");

			if (!sToken || !sIdno) return;

			processedRef.current = true;
			Promise.resolve(onVerifySuccess({ sToken, sIdno })).finally(() => {
				processedRef.current = false;
			});
		} catch {
			// Ignore non-standard intermediate WebView URLs.
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
					onNavigationStateChange={(navState) => {
						if (navState.loading) return;
						processAuthUrl(navState.url);
					}}
				/>
			</View>
		</Modal>
	);
}
