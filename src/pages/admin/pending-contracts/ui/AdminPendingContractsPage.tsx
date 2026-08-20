import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native";

import {
	type PendingContract,
	useSuspendedPapers,
} from "@/entities/partnership";
import { useDeletePendingContractMutation } from "@/features/pending-contract-management";
import { colorTokens } from "@/shared/styles/tokens";
import { AppTopBar } from "@/shared/ui/app-top-bar/AppTopBar";
import { Dialog } from "@/shared/ui/dialog";
import { EmptyState } from "@/shared/ui/empty-state";
import { InfoBanner } from "@/shared/ui/info";
import { PageLayout } from "@/shared/ui/layout";

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
	const {
		data: contracts = [],
		isPending,
		isError,
		error,
	} = useSuspendedPapers();
	const deleteMutation = useDeletePendingContractMutation();
	const [selectedContract, setSelectedContract] =
		useState<PendingContract | null>(null);

	const handleDelete = async () => {
		if (!selectedContract) return;
		const target = selectedContract;
		setSelectedContract(null);
		try {
			await deleteMutation.mutateAsync(target.paperId);
		} catch (err) {
			Alert.alert(
				"삭제 실패",
				err instanceof Error ? err.message : "제휴 계약서 삭제에 실패했습니다.",
			);
		}
	};

	const handleContractPress = (contract: PendingContract) => {
		router.push({
			pathname: "/(protected)/partnership-contract/[id]",
			params: { id: String(contract.paperId) },
		});
	};

	const renderBody = () => {
		if (isPending) {
			return (
				<View className="flex-1 items-center justify-center">
					<ActivityIndicator color={colorTokens.primary} />
				</View>
			);
		}
		if (isError) {
			return (
				<EmptyState
					title="계약서를 불러오지 못했어요"
					description={
						error instanceof Error
							? error.message
							: "잠시 후 다시 시도해주세요."
					}
				/>
			);
		}
		if (contracts.length === 0) {
			return (
				<EmptyState
					title="대기중인 계약서가 없어요!"
					description={"체결이 완료된 계약서를 홈에서\n확인해주세요!"}
				/>
			);
		}
		return (
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
						key={contract.paperId}
						contract={contract}
						onDelete={setSelectedContract}
						onPress={handleContractPress}
					/>
				))}
			</View>
		);
	};

	return (
		<PageLayout>
			<AppTopBar title="대기중인 제휴 계약서" />
			{renderBody()}

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
					<Dialog.ConfirmButton
						onPress={handleDelete}
						disabled={deleteMutation.isPending}
					>
						삭제하기
					</Dialog.ConfirmButton>
				</Dialog.Actions>
			</Dialog>
		</PageLayout>
	);
}
