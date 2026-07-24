import { useMutation, useQuery } from "@tanstack/react-query";
import {
	certifyPersonalPartnership,
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

export function usePartnershipUsageMutation() {
	return useMutation({ mutationFn: recordPartnershipUsage });
}
