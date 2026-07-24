import { useQuery } from "@tanstack/react-query";

import type { NotificationListResult } from "@/entities/notification/model/types";
import { getList_1Api } from "@/shared/api";

const { list1 } = getList_1Api();

export function useNotificationsQuery() {
	return useQuery({
		queryKey: ["notifications"],
		queryFn: () => list1({ status: "all" }),
		staleTime: 1000 * 60 * 5,
		select: (data) =>
			(data.result as unknown as NotificationListResult)?.items ?? [],
	});
}
