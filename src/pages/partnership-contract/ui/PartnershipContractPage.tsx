import { useLocalSearchParams, useRouter } from "expo-router";
import { MOCK_PARTNERSHIP_CONTRACTS } from "@/entities/partnership";
import { PartnershipContractContent } from "@/features/partnership-contract";

export function PartnershipContractPage() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const router = useRouter();

	const contract = MOCK_PARTNERSHIP_CONTRACTS.find((c) => c.id === id) ?? null;

	if (!contract) return null;

	return <PartnershipContractContent data={contract} onClose={() => router.back()} />;
}
