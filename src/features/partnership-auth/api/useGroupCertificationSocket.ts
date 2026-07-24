import { useEffect } from "react";
import { stompManager } from "@/shared/lib/stomp/stompManager";
import type {
	GroupCertificationProgressMessage,
	GroupCertificationQrPayload,
} from "../model/types";
import { usePartnershipAuthStore } from "../model/usePartnershipAuthStore";

export function buildGroupCertificationQrValue(
	adminId: number,
	sessionId: number,
): string {
	return JSON.stringify({
		type: "ASSU_GROUP_CERTIFICATION",
		version: 1,
		adminId,
		sessionId,
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
			(parsed.adminId ?? 0) <= 0 ||
			(parsed.sessionId ?? 0) <= 0
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
	return stompManager.publish(
		"/app/certify",
		JSON.stringify({ adminId, sessionId }),
	);
}

export function useGroupCertificationProgress(sessionId: number | null) {
	const setGroupProgress = usePartnershipAuthStore(
		(state) => state.setGroupProgress,
	);
	const completeGroupSession = usePartnershipAuthStore(
		(state) => state.completeGroupSession,
	);

	useEffect(() => {
		if (sessionId === null) return;

		return stompManager.subscribeToTopic(
			`/certification/progress/${sessionId}`,
			(message) => {
				try {
					const progress = JSON.parse(
						message.body,
					) as GroupCertificationProgressMessage;
					const count = Number.isSafeInteger(progress.count)
						? progress.count
						: 0;

					if (
						typeof progress.type === "string" &&
						progress.type.toLowerCase() === "completed"
					) {
						completeGroupSession(count, progress.userIds ?? []);
						return;
					}

					setGroupProgress(count);
				} catch {
					// 알 수 없는 메시지는 현재 세션 상태를 변경하지 않습니다.
				}
			},
		);
	}, [completeGroupSession, sessionId, setGroupProgress]);
}
