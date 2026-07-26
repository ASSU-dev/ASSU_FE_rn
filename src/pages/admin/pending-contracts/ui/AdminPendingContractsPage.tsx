import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { AppTopBar } from "@/shared/ui/app-top-bar/AppTopBar";
import { Dialog } from "@/shared/ui/dialog";
import { EmptyState } from "@/shared/ui/empty-state";
import { InfoBanner } from "@/shared/ui/info";
import { PageLayout } from "@/shared/ui/layout";

import {
	MOCK_PENDING_CONTRACTS,
	type PendingContract,
} from "../model/mockPendingContracts";

interface PendingContractRowProps {
	contract: PendingContract;
	onDelete: (contract: PendingContract) => void;
	onPress: (contract: PendingContract) => void;
}

function PendingContractRow({
	contract,
	onDelete,
	onPress,
}: PendingContractRowProps) {
	return (
		<Pressable
			onPress={() => onPress(contract)}
			className="h-[66px] flex-row items-center px-screen-m"
		>
			<View className="flex-1 px-gutter">
				<Text className="text-sm font-medium text-content-primary">
					{contract.partnerName}
				</Text>
				<Text className="mt-[3px] text-[11px] text-content-secondary">
					제안일 | {contract.proposedAt}
				</Text>
			</View>
			<Pressable hitSlop={8} onPress={() => onDelete(contract)}>
				<Text className="text-[11px] font-medium text-content-secondary">
					삭제하기
				</Text>
			</Pressable>
		</Pressable>
	);
}

export function AdminPendingContractsPage() {
	const router = useRouter();
	const [contracts, setContracts] = useState(MOCK_PENDING_CONTRACTS);
	const [selectedContract, setSelectedContract] =
		useState<PendingContract | null>(null);

	const handleDelete = () => {
		if (!selectedContract) return;
		setContracts((current) =>
			current.filter((contract) => contract.id !== selectedContract.id),
		);
		setSelectedContract(null);
	};

	const handleContractPress = (contract: PendingContract) => {
		router.push({
			pathname: "/(protected)/partnership-contract/[id]",
			params: { id: contract.id },
		});
	};

	return (
		<PageLayout>
			<AppTopBar title="대기중인 제휴 계약서" />
			{contracts.length === 0 ? (
				<EmptyState
					title="대기중인 계약서가 없어요!"
					description={"체결이 완료된 계약서를 홈에서\n확인해주세요!"}
				/>
			) : (
				<View className="pt-[21px]">
					<View className="px-screen-m">
						<InfoBanner message="제휴 동의를 기다리는 계약서에요" />
						<Text className="px-[7px] pb-[15px] pt-[15px] text-[11px] text-content-secondary">
							대기중인 제휴 계약서가{" "}
							<Text className="text-primary">{contracts.length}</Text>건 있어요
						</Text>
					</View>
					{contracts.map((contract) => (
						<PendingContractRow
							key={contract.id}
							contract={contract}
							onDelete={setSelectedContract}
							onPress={handleContractPress}
						/>
					))}
				</View>
			)}

			<Dialog
				visible={selectedContract !== null}
				onDismiss={() => setSelectedContract(null)}
			>
				<Dialog.Title>이 제안서를 삭제하시겠습니까?</Dialog.Title>
				<Dialog.Content>
					<Text className="text-sm text-content-secondary">
						{selectedContract?.partnerName} 제휴제안서
					</Text>
				</Dialog.Content>
				<Dialog.Actions>
					<Dialog.CancelButton onPress={() => setSelectedContract(null)}>
						취소
					</Dialog.CancelButton>
					<Dialog.ConfirmButton onPress={handleDelete}>
						삭제하기
					</Dialog.ConfirmButton>
				</Dialog.Actions>
			</Dialog>
		</PageLayout>
	);
}
