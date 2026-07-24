import { useQuery } from "@tanstack/react-query";
import { apiInstance } from "@/shared/api/instance";
import type {
	BaseResponse,
	TodayBestResponseDTO,
	TodayBestStore,
} from "../model/types";

async function fetchTodayBestStores(): Promise<TodayBestStore[]> {
	const response =
		await apiInstance.get<BaseResponse<TodayBestResponseDTO>>("/store/best");

	return (
		response.data.result?.bestStores?.map((name, index) => ({
			id: `${index}-${name}`,
			name,
		})) ?? []
	);
}

export function useTodayBestStoresQuery() {
	return useQuery({
		queryKey: ["store", "today-best"],
		queryFn: fetchTodayBestStores,
		staleTime: 1000 * 60 * 5,
	});
}
