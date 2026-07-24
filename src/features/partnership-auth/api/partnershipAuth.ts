import { apiInstance } from "@/shared/api/instance";
import type {
	PartnershipUsagePayload,
	VerifiedPartnershipStore,
} from "../model/types";

interface BaseResponse<T> {
	isSuccess?: boolean;
	code?: string;
	message?: string;
	result?: T;
}

interface PaperContentResponseDTO {
	adminId?: number;
	adminName?: string;
	paperContent?: string;
	contentId?: number;
	goods?: string[];
	people?: number | null;
	cost?: number | null;
}

interface PaperResponseDTO {
	storeId?: number;
	storeName?: string;
	partnershipContents?: PaperContentResponseDTO[];
}

interface PersonalCertificationPayload {
	storeId: number;
	adminId: number;
	tableNumber: 99;
}

interface GroupCertificationPayload {
	people: number;
	storeId: number;
	adminId: number;
	tableNumber: 99;
}

interface GroupCertificationResponseDTO {
	sessionId?: number;
}

export async function getStorePartnerships(
	storeId: number,
): Promise<VerifiedPartnershipStore> {
	const response = await apiInstance.get<BaseResponse<PaperResponseDTO>>(
		`/store/${storeId}/papers`,
	);
	const result = response.data.result;

	if (!result?.storeId || !result.storeName) {
		throw new Error(
			response.data.message ?? "제휴 매장 정보를 찾을 수 없습니다.",
		);
	}

	return {
		storeId: result.storeId,
		storeName: result.storeName,
		benefits: (result.partnershipContents ?? []).flatMap((content) => {
			if (
				content.contentId === undefined ||
				content.adminId === undefined ||
				!content.adminName ||
				!content.paperContent
			) {
				return [];
			}

			return [
				{
					id: content.contentId,
					adminId: content.adminId,
					manager: content.adminName,
					contents: content.paperContent,
					goods: content.goods ?? [],
					people: content.people ?? null,
					cost: content.cost ?? null,
					type: content.people == null ? "INDIVIDUAL" : "GROUP",
				} as const,
			];
		}),
	};
}

export async function certifyPersonalPartnership({
	storeId,
	adminId,
}: Omit<PersonalCertificationPayload, "tableNumber">): Promise<void> {
	const response = await apiInstance.post<BaseResponse<string>>(
		"/certification/personal",
		{
			storeId,
			adminId,
			tableNumber: 99,
		} satisfies PersonalCertificationPayload,
	);

	if (response.data.isSuccess === false) {
		throw new Error(response.data.message ?? "개인 제휴 인증에 실패했습니다.");
	}
}

export async function createGroupCertificationSession({
	people,
	storeId,
	adminId,
}: Omit<GroupCertificationPayload, "tableNumber">): Promise<number> {
	const response = await apiInstance.post<
		BaseResponse<GroupCertificationResponseDTO>
	>("/certification/session", {
		people,
		storeId,
		adminId,
		tableNumber: 99,
	} satisfies GroupCertificationPayload);
	const sessionId = response.data.result?.sessionId;

	if (!sessionId) {
		throw new Error(
			response.data.message ?? "그룹 인증 세션을 만들지 못했습니다.",
		);
	}

	return sessionId;
}

export async function recordPartnershipUsage(
	payload: Omit<PartnershipUsagePayload, "tableNumber">,
): Promise<void> {
	const response = await apiInstance.post<BaseResponse<null>>(
		"/partnership/usage",
		{
			...payload,
			tableNumber: "99",
		} satisfies PartnershipUsagePayload,
	);

	if (response.data.isSuccess === false) {
		throw new Error(
			response.data.message ?? "제휴 사용내역 기록에 실패했습니다.",
		);
	}
}

export function parsePartnershipStoreId(value: string): number | null {
	const trimmed = value.trim();
	let rawStoreId: string | number | null = null;

	if (/^\d+$/.test(trimmed)) {
		rawStoreId = trimmed;
	}

	if (rawStoreId === null) {
		try {
			const parsed = JSON.parse(trimmed) as unknown;
			if (
				typeof parsed === "object" &&
				parsed !== null &&
				"storeId" in parsed
			) {
				const storeId = (parsed as { storeId?: unknown }).storeId;
				if (typeof storeId === "string" || typeof storeId === "number") {
					rawStoreId = storeId;
				}
			}
		} catch {
			// QR 데이터가 JSON이 아니면 URL 또는 일반 문자열 규칙으로 확인합니다.
		}
	}

	if (rawStoreId === null) {
		try {
			rawStoreId = new URL(trimmed).searchParams.get("storeId");
		} catch {
			// QR 데이터가 URL이 아니면 아래 문자열 규칙으로 확인합니다.
		}
	}

	if (rawStoreId === null) {
		const keyedMatch = trimmed.match(
			/(?:^|[?&#,{]\s*["']?)storeId["']?\s*[:=]\s*["']?(\d+)/i,
		);
		const pathMatch = trimmed.match(/\/partnership\/(\d+)(?:[/?#]|$)/);
		rawStoreId = keyedMatch?.[1] ?? pathMatch?.[1] ?? null;
	}

	if (rawStoreId === null || rawStoreId === "") return null;

	const storeId = Number(rawStoreId);
	return Number.isSafeInteger(storeId) && storeId > 0 ? storeId : null;
}
