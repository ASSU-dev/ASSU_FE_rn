import { useQuery } from "@tanstack/react-query";
import { apiInstance } from "@/shared/api/instance";
import { ENV } from "@/shared/config/env";
import type {
	BaseResponse,
	PagedResponse,
	WritePartnershipResponseDTO,
} from "../model/api-types";

const ADMIN_PARTNERSHIP_LIST_PARAMS = {
	all: true,
	page: 0,
	size: 100,
} as const;

async function fetchAdminPartnerships(): Promise<
	PagedResponse<WritePartnershipResponseDTO>
> {
	if (__DEV__) {
		console.log("[PartnershipDebug] admin list request", {
			baseURL: apiInstance.defaults.baseURL,
			endpoint: "/partnership/admin",
			params: ADMIN_PARTNERSHIP_LIST_PARAMS,
			usingMocks: ENV.USE_MOCKS,
		});
	}
	const res = await apiInstance.get<
		BaseResponse<PagedResponse<WritePartnershipResponseDTO>>
	>("/partnership/admin", {
		params: ADMIN_PARTNERSHIP_LIST_PARAMS,
	});

	if (__DEV__) {
		console.log("[PartnershipDebug] admin list response", {
			status: res.status,
			data: res.data,
		});
	}

	return res.data.result;
}

export function useAdminPartnerships() {
	return useQuery({
		queryKey: ["partnership", "admin", ADMIN_PARTNERSHIP_LIST_PARAMS],
		queryFn: fetchAdminPartnerships,
	});
}
