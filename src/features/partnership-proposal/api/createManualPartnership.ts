import type { WritePartnershipResponseDTO } from "@/entities/partnership";
import type { BaseResponse } from "@/shared/api";
import { apiInstance } from "@/shared/api";
import type { ContractFile, ManualPartnershipRequestDTO } from "../model/types";

/** POST /partnership/passivity 응답의 result */
export interface ManualPartnershipResponseDTO {
	storeId: number;
	/** 가게가 DB에 신규 생성되었는지 여부 */
	storeCreated?: boolean;
	/** 가게가 재활성화되었는지 여부 */
	storeActivated?: boolean;
	status: string;
	contractImageUrl: string;
	partnership: WritePartnershipResponseDTO;
}

export interface CreateManualPartnershipParams {
	request: ManualPartnershipRequestDTO;
	contractFile: ContractFile;
}

const DEFAULT_CONTRACT_MIME_TYPE = "image/jpeg";

/**
 * React Native의 FormData는 Blob 대신 { uri, name, type } 형태를 받는다.
 */
function toFormDataFile(file: ContractFile) {
	return {
		uri: file.uri,
		name: file.name,
		type: file.mimeType ?? DEFAULT_CONTRACT_MIME_TYPE,
	} as unknown as Blob;
}

export async function createManualPartnership({
	request,
	contractFile,
}: CreateManualPartnershipParams): Promise<ManualPartnershipResponseDTO> {
	const formData = new FormData();
	formData.append("request", JSON.stringify(request));
	formData.append("contractImage", toFormDataFile(contractFile));

	const res = await apiInstance.post<
		BaseResponse<ManualPartnershipResponseDTO | null>
	>("/partnership/passivity", formData, {
		headers: { "Content-Type": "multipart/form-data" },
	});

	if (!res.data.isSuccess || !res.data.result) {
		throw new Error(res.data.message || "제휴 수동 등록에 실패했습니다.");
	}

	return res.data.result;
}
