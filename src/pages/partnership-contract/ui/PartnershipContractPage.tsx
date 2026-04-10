import { useLocalSearchParams, useRouter } from "expo-router";
import { MOCK_PARTNERSHIP_CONTRACTS } from "@/entities/partnership";
import { PartnershipContractContent } from "@/features/partnership-contract";
import { EmptyState } from "@/shared/ui/empty-state";

export function PartnershipContractPage() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const router = useRouter();

	const contract = MOCK_PARTNERSHIP_CONTRACTS.find((c) => c.id === id) ?? null;

	if (!contract) {
		return (
			<EmptyState
				title="계약서를 찾을 수 없습니다"
				description="잘못된 접근이거나 삭제된 계약서입니다."
			/>
		);
	}

	return <PartnershipContractContent data={contract} onClose={() => router.back()} />;
}
