import { useLocalSearchParams, useRouter } from "expo-router";
import {
	toPartnershipContract,
	usePartnershipDetail,
} from "@/entities/partnership";
import { PartnershipContractContent } from "@/features/partnership-contract";
import { EmptyState } from "@/shared/ui/empty-state";

export function PartnershipContractPage() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const router = useRouter();

	const { data, isLoading } = usePartnershipDetail(id ?? null);

	if (isLoading) {
		return null;
	}

	if (!data) {
		return (
			<EmptyState
				title="계약서를 찾을 수 없습니다"
				description="잘못된 접근이거나 삭제된 계약서입니다."
			/>
		);
	}

	const contract = toPartnershipContract(data);

	return (
		<PartnershipContractContent
			data={contract}
			onClose={() => router.back()}
			onQrPress={() =>
				router.push({
					pathname: "/qr-view/[id]",
					params: { id: contract.id },
				})
			}
		/>
	);
}
