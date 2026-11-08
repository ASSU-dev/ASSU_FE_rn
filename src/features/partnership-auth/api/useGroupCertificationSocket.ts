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

export const GROUP_CERTIFICATION_LINK_SCHEME = "assu-app";
export const GROUP_CERTIFICATION_LINK_PATH = "verify";
const GROUP_CERTIFICATION_VERIFY_URL = "https://prod.assu.site/verify";

export function buildGroupCertificationQrValue(
	payload: GroupCertificationQrPayload,
): string {
	return `${GROUP_CERTIFICATION_VERIFY_URL}?sessionId=${payload.sessionId}&adminId=${payload.adminId}`;
}

function toGroupCertificationPayload(
	sessionIdValue: unknown,
	adminIdValue: unknown,
): GroupCertificationQrPayload | null {
	const sessionId =
		typeof sessionIdValue === "string" || typeof sessionIdValue === "number"
			? Number(sessionIdValue)
			: Number.NaN;
	const adminId =
		typeof adminIdValue === "string" || typeof adminIdValue === "number"
			? Number(adminIdValue)
			: Number.NaN;
	if (
		!Number.isSafeInteger(sessionId) ||
		!Number.isSafeInteger(adminId) ||
		sessionId <= 0 ||
		adminId <= 0
	) {
		return null;
	}

	return { sessionId, adminId };
}

function parseLegacyGroupCertificationPayload(
	value: string,
): GroupCertificationQrPayload | null {
	try {
		const parsed = JSON.parse(value) as {
			type?: unknown;
			version?: unknown;
			sessionId?: unknown;
			adminId?: unknown;
		};
		if (parsed.type !== "ASSU_GROUP_CERTIFICATION" || parsed.version !== 1) {
			return null;
		}
		return toGroupCertificationPayload(parsed.sessionId, parsed.adminId);
	} catch {
		return null;
	}
}

export function parseGroupCertificationQr(
	value: string,
): GroupCertificationQrPayload | null {
	try {
		const trimmed = value.trim();
		if (trimmed.startsWith("{")) {
			return parseLegacyGroupCertificationPayload(trimmed);
		}

		const parsedUrl = new URL(trimmed);
		if (
			parsedUrl.protocol === `${GROUP_CERTIFICATION_LINK_SCHEME}:` &&
			parsedUrl.hostname === "student" &&
			parsedUrl.pathname === "/partnership-group-participant"
		) {
			const legacyPayload = parsedUrl.searchParams.get("payload");
			return legacyPayload
				? parseLegacyGroupCertificationPayload(legacyPayload)
				: null;
		}

		const isVerifyLink =
			(parsedUrl.protocol === "https:" &&
				parsedUrl.hostname === "prod.assu.site" &&
				parsedUrl.pathname === "/verify") ||
			(parsedUrl.protocol === `${GROUP_CERTIFICATION_LINK_SCHEME}:` &&
				parsedUrl.hostname === GROUP_CERTIFICATION_LINK_PATH);
		if (!isVerifyLink || parsedUrl.searchParams.has("storeId")) return null;

		return toGroupCertificationPayload(
			parsedUrl.searchParams.get("sessionId"),
			parsedUrl.searchParams.get("adminId"),
		);
	} catch {
		return null;
	}
}

export async function certifyGroupParticipant({
	adminId,
	sessionId,
}: {
	adminId: number;
	sessionId: number;
}): Promise<boolean> {
	const connected = await stompManager.waitForConnection();
	if (!connected) return false;

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
										router.dismissAll();
										router.replace("/(protected)/student/(tabs)/home");
										resetPartnershipAuth();
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
