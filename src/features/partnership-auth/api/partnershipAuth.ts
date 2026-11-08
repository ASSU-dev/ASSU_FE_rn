import { apiInstance } from "@/shared/api/instance";
import type {
	GroupCertificationSessionDetail,
	PartnershipBenefit,
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
	partnershipPeriod?: string | null;
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
	contentId: number;
	tableNumber: 99;
}

interface GroupCertificationResponseDTO {
	sessionId?: number;
}

interface GroupCertificationSessionResponseDTO {
	sessionId?: number;
	storeId?: number;
	storeName?: string;
	peopleNumber?: number;
	currentCount?: number;
	partnershipContent?: PaperContentResponseDTO;
}

interface GroupCertificationSessionApiResponse
	extends GroupCertificationSessionResponseDTO {
	isSuccess?: boolean;
	code?: string;
	message?: string;
	result?: GroupCertificationSessionResponseDTO;
}

function mapPartnershipContent(
	content: PaperContentResponseDTO,
): PartnershipBenefit | null {
	if (
		content.contentId === undefined ||
		content.adminId === undefined ||
		!content.adminName ||
		!content.paperContent
	) {
		return null;
	}

	return {
		id: content.contentId,
		adminId: content.adminId,
		manager: content.adminName,
		contents: content.paperContent,
		partnershipPeriod: content.partnershipPeriod ?? undefined,
		goods: content.goods ?? [],
		people: content.people ?? null,
		cost: content.cost ?? null,
		type:
			typeof content.people === "number" && content.people > 1
				? "GROUP"
				: "INDIVIDUAL",
	};
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
			const benefit = mapPartnershipContent(content);
			return benefit ? [benefit] : [];
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
	contentId,
}: Omit<GroupCertificationPayload, "tableNumber">): Promise<number> {
	const response = await apiInstance.post<
		BaseResponse<GroupCertificationResponseDTO>
	>("/certification/session", {
		people,
		storeId,
		adminId,
		contentId,
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

export async function getGroupCertificationSessionDetail(
	sessionId: number,
): Promise<GroupCertificationSessionDetail> {
	const response = await apiInstance.get<GroupCertificationSessionApiResponse>(
		`/certification/session/${sessionId}`,
	);
	const body = response.data;
	if ("isSuccess" in body && body.isSuccess === false) {
		throw new Error(body.message ?? "다인 인증 정보를 불러오지 못했습니다.");
	}

	const result = body.result ?? body;
	const benefit = result.partnershipContent
		? mapPartnershipContent(result.partnershipContent)
		: null;
	const peopleNumber = result.peopleNumber;
	const currentCount = result.currentCount;

	if (
		result.sessionId !== sessionId ||
		!result.storeId ||
		!result.storeName ||
		!Number.isSafeInteger(peopleNumber) ||
		(peopleNumber ?? 0) <= 0 ||
		!Number.isSafeInteger(currentCount) ||
		(currentCount ?? -1) < 0 ||
		!benefit
	) {
		throw new Error("다인 인증 정보가 올바르지 않습니다.");
	}

	const requiredPeople = peopleNumber as number;
	const count = currentCount as number;
	const groupBenefit: PartnershipBenefit = {
		...benefit,
		people: requiredPeople,
		type: "GROUP",
	};
	const store: VerifiedPartnershipStore = {
		storeId: result.storeId,
		storeName: result.storeName,
		benefits: [groupBenefit],
	};

	return {
		store,
		benefit: groupBenefit,
		session: {
			sessionId,
			requiredPeople,
			count,
			status: count >= requiredPeople ? "COMPLETED" : "WAITING",
			userIds: [],
			role: "PARTICIPANT",
		},
	};
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
