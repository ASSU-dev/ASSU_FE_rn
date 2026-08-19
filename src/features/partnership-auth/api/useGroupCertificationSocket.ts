import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Alert } from "react-native";
import { useAuthStore } from "@/shared/lib/auth/authStore";
import { stompManager } from "@/shared/lib/stomp/stompManager";
import type {
	GroupCertificationProgressMessage,
	GroupCertificationQrPayload,
} from "../model/types";
import { usePartnershipAuthStore } from "../model/usePartnershipAuthStore";

export function buildGroupCertificationQrValue(
	payload: Omit<GroupCertificationQrPayload, "type" | "version">,
): string {
	return JSON.stringify({
		type: "ASSU_GROUP_CERTIFICATION",
		version: 1,
		...payload,
	} satisfies GroupCertificationQrPayload);
}

export function parseGroupCertificationQr(
	value: string,
): GroupCertificationQrPayload | null {
	try {
		const parsed = JSON.parse(value) as Partial<GroupCertificationQrPayload>;
		if (
			parsed.type !== "ASSU_GROUP_CERTIFICATION" ||
			parsed.version !== 1 ||
			!Number.isSafeInteger(parsed.adminId) ||
			!Number.isSafeInteger(parsed.sessionId) ||
			!Number.isSafeInteger(parsed.storeId) ||
			!Number.isSafeInteger(parsed.contentId) ||
			!Number.isSafeInteger(parsed.requiredPeople) ||
			(parsed.adminId ?? 0) <= 0 ||
			(parsed.sessionId ?? 0) <= 0 ||
			(parsed.storeId ?? 0) <= 0 ||
			(parsed.contentId ?? 0) <= 0 ||
			(parsed.requiredPeople ?? 0) <= 0 ||
			typeof parsed.storeName !== "string" ||
			typeof parsed.adminName !== "string" ||
			typeof parsed.partnershipContent !== "string" ||
			!Array.isArray(parsed.goods) ||
			!parsed.goods.every((goodsName) => typeof goodsName === "string")
		) {
			return null;
		}

		return parsed as GroupCertificationQrPayload;
	} catch {
		return null;
	}
}

export function certifyGroupParticipant({
	adminId,
	sessionId,
}: {
	adminId: number;
	sessionId: number;
}): boolean {
	const published = stompManager.publish(
		"/app/certify",
		JSON.stringify({ adminId, sessionId }),
	);
	if (__DEV__) {
		console.log("[GROUP CERT PUBLISH]", {
			destination: "/app/certify",
			adminId,
			sessionId,
			published,
		});
	}
	return published;
}

export function useGroupCertificationProgress(sessionId: number | null) {
	const memberId = useAuthStore((state) => state.memberId);
	const setGroupProgress = usePartnershipAuthStore(
		(state) => state.setGroupProgress,
	);
	const completeGroupSession = usePartnershipAuthStore(
		(state) => state.completeGroupSession,
	);
	const resetPartnershipAuth = usePartnershipAuthStore((state) => state.reset);
	const hasHandledMismatchRef = useRef(false);

	useEffect(() => {
		if (sessionId === null) return;
		hasHandledMismatchRef.current = false;

		const destination = `/certification/progress/${sessionId}`;
		if (__DEV__) {
			console.log("[GROUP CERT SUBSCRIBE]", { destination, sessionId });
		}

		return stompManager.subscribeToTopic(destination, (message) => {
			if (__DEV__) {
				console.log("[GROUP CERT PROGRESS RAW]", {
					sessionId,
					body: message.body,
				});
			}

			try {
				const progress = JSON.parse(
					message.body,
				) as GroupCertificationProgressMessage;
				const count = Number.isSafeInteger(progress.count) ? progress.count : 0;
				const progressType =
					typeof progress.type === "string" ? progress.type.toLowerCase() : "";

				if (progressType === "expired") {
					if (__DEV__) {
						console.log("[GROUP CERT EXPIRED]", {
							sessionId,
							count,
							message: progress.message,
							userIds: progress.userIds ?? [],
						});
					}
					return;
				}

				if (progressType === "mismatch") {
					const userIds = progress.userIds ?? [];
					setGroupProgress(count);

					if (
						memberId !== null &&
						!userIds.includes(memberId) &&
						!hasHandledMismatchRef.current
					) {
						hasHandledMismatchRef.current = true;
						Alert.alert(
							"인증 실패",
							progress.message ?? "제휴 대상자 정보와 일치하지 않습니다.",
							[
								{
									text: "확인",
									onPress: () => {
										resetPartnershipAuth();
										router.replace("/(protected)/student/(tabs)/home");
									},
								},
							],
							{ cancelable: false },
						);
					}
					return;
				}

				if (progressType === "completed") {
					completeGroupSession(count, progress.userIds ?? []);
					return;
				}

				setGroupProgress(count);
			} catch (error) {
				if (__DEV__) {
					console.log("[GROUP CERT PROGRESS ERROR]", {
						sessionId,
						body: message.body,
						error,
					});
				}
			}
		});
	}, [
		completeGroupSession,
		memberId,
		resetPartnershipAuth,
		sessionId,
		setGroupProgress,
	]);
}
