import { router } from "expo-router";
import { Alert, View } from "react-native";

import { useOpenChatRoom } from "@/features/chat";
import { MapSearchBar, MapView } from "@/widgets/map";

export function PartnerMapPage() {
	const { openChatRoom, isPending } = useOpenChatRoom();

	return (
		<View className="flex-1 bg-canvas">
			<MapView
				isContactPending={isPending}
				onContactPress={(store) => {
					const adminId = Number(store.adminId ?? store.id);
					if (!Number.isFinite(adminId)) {
						Alert.alert("채팅 연결 실패", "학생회 정보를 확인할 수 없습니다.");
						return;
					}
					openChatRoom({ role: "partner", targetId: adminId });
				}}
			/>
			<MapSearchBar
				onPress={() => router.push("/(protected)/partner/map-search")}
			/>
		</View>
	);
}
