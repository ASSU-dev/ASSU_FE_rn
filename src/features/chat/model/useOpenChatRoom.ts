import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { useAuthStore } from "@/shared/lib/auth/authStore";
import { useCreateChatRoomMutation } from "../api/useCreateChatRoomMutation";

type ChatRole = "admin" | "partner";

interface OpenChatRoomParams {
	role: ChatRole;
	targetId: number;
}

export function useOpenChatRoom() {
	const router = useRouter();
	const memberId = useAuthStore((state) => state.memberId);
	const createChatRoom = useCreateChatRoomMutation();

	const openChatRoom = async ({ role, targetId }: OpenChatRoomParams) => {
		if (createChatRoom.isPending) return;

		if (!memberId) {
			Alert.alert("채팅 연결 실패", "로그인 정보를 확인할 수 없습니다.");
			return;
		}

		try {
			const response = await createChatRoom.mutateAsync({
				adminId: role === "admin" ? memberId : targetId,
				partnerId: role === "partner" ? memberId : targetId,
			});
			const roomId = response.result?.roomId;

			if (!response.isSuccess || !roomId) {
				Alert.alert(
					"채팅 연결 실패",
					response.message ?? "채팅방 정보를 불러오지 못했습니다.",
				);
				return;
			}

			if (role === "admin") {
				router.push({
					pathname: "/(protected)/admin/chat-room/[id]",
					params: { id: String(roomId) },
				});
				return;
			}

			router.push({
				pathname: "/(protected)/partner/chat-room/[id]",
				params: { id: String(roomId) },
			});
		} catch {
			Alert.alert(
				"채팅 연결 실패",
				"채팅방을 열지 못했습니다. 잠시 후 다시 시도해 주세요.",
			);
		}
	};

	return {
		openChatRoom,
		isPending: createChatRoom.isPending,
	};
}
