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
			router.replace("/(auth)/register");
		},
		onError: () => {
			Alert.alert(
				"처리 실패",
				"요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.",
			);
		},
	});

	const executeLogout = () => endSession.mutate("logout");
	const executeWithdrawal = () => endSession.mutate("withdraw");

	return {
		isPending: endSession.isPending,
		executeLogout,
		executeWithdrawal,
	};
}
