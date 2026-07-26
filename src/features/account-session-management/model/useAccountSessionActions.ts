import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

import { clearTokens } from "@/shared/api/auth";
import {
	deleteDeviceTokenId,
	getDeviceTokenId,
} from "@/shared/api/token-storage";

import {
	logout,
	unregisterDeviceToken,
	withdrawAccount,
} from "../api/accountSession";

type SessionAction = "logout" | "withdraw";

export function useAccountSessionActions() {
	const router = useRouter();
	const queryClient = useQueryClient();

	const endSession = useMutation({
		mutationFn: async (action: SessionAction) => {
			const deviceTokenId = await getDeviceTokenId();

			if (deviceTokenId !== null) {
				await unregisterDeviceToken(deviceTokenId);
				await deleteDeviceTokenId();
			}

			if (action === "withdraw") {
				await withdrawAccount();
				return;
			}

			await logout();
		},
		onSuccess: async () => {
			await clearTokens();
			queryClient.clear();
			router.replace("/(auth)/login");
		},
		onError: () => {
			Alert.alert(
				"처리 실패",
				"요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.",
			);
		},
	});

	const requestLogout = () => {
		Alert.alert("로그아웃", "로그아웃하시겠어요?", [
			{ text: "취소", style: "cancel" },
			{
				text: "로그아웃",
				onPress: () => endSession.mutate("logout"),
			},
		]);
	};

	const executeLogout = () => endSession.mutate("logout");

	const requestWithdrawal = () => {
		Alert.alert(
			"회원 탈퇴",
			"탈퇴하면 계정이 비활성화되고 한 달 후 완전히 삭제됩니다. 탈퇴하시겠어요?",
			[
				{ text: "취소", style: "cancel" },
				{
					text: "회원 탈퇴",
					style: "destructive",
					onPress: () => endSession.mutate("withdraw"),
				},
			],
		);
	};

	return {
		isPending: endSession.isPending,
		executeLogout,
		requestLogout,
		requestWithdrawal,
	};
}
