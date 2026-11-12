import { useMutation, useQuery } from "@tanstack/react-query";
import {
	certifyPersonalPartnership,
	createGroupCertificationSession,
	getGroupCertificationSessionDetail,
	getStorePartnerships,
	recordPartnershipUsage,
} from "./partnershipAuth";

export function useStorePartnershipQuery(storeId: number | null) {
	return useQuery({
		queryKey: ["partnership-auth", "store", storeId],
		queryFn: () => getStorePartnerships(storeId as number),
		enabled: storeId !== null,
	});
}

export function usePersonalCertificationMutation() {
	return useMutation({ mutationFn: certifyPersonalPartnership });
}

export function useGroupCertificationSessionMutation() {
	return useMutation({ mutationFn: createGroupCertificationSession });
}

export function useGroupCertificationSessionDetailQuery(
	sessionId: number | null,
) {
	return useQuery({
		queryKey: ["partnership-auth", "group-session", sessionId],
		queryFn: () => getGroupCertificationSessionDetail(sessionId as number),
		enabled: sessionId !== null,
		staleTime: 0,
	});
}

export function usePartnershipUsageMutation() {
	return useMutation({ mutationFn: recordPartnershipUsage });
}
