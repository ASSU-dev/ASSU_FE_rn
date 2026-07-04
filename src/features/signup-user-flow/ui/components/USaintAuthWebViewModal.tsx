import { useRef } from "react";
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

	return (
		<Modal
			visible={visible}
			animationType="slide"
			presentationStyle="fullScreen"
		>
			<View className="flex-1 bg-canvas">
				<View className="flex-row items-center justify-between border-b border-content-tertiary px-screen-m pb-3 pt-14">
					<Text className="text-[18px] font-semibold text-content-primary">
						LMS 인증
					</Text>
					<Pressable
						onPress={() => {
							processedRef.current = false;
							onClose();
						}}
					>
						<Text className="text-[16px] font-medium text-primary">닫기</Text>
					</Pressable>
				</View>

				<WebView
					source={{ uri: loginUrl }}
					sharedCookiesEnabled
					thirdPartyCookiesEnabled
					domStorageEnabled
					javaScriptEnabled
					onNavigationStateChange={(navState) => {
						if (processedRef.current) return;
						if (!navState.url.includes("saint.ssu.ac.kr")) return;

						try {
							const parsedUrl = new URL(navState.url);
							const sToken = parsedUrl.searchParams.get("sToken");
							const sIdno = parsedUrl.searchParams.get("sIdno");

							if (!sToken || !sIdno) return;

							processedRef.current = true;
							onVerifySuccess({ sToken, sIdno });
						} catch {
							// URL 파싱 실패 시 무시
						}
					}}
				/>
			</View>
		</Modal>
	);
}
