import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { MOCK_PARTNERSHIPS } from "@/entities/partnership";
import { MOCK_PARTNERSHIP_CONTRACTS } from "@/entities/partnership/model/mockPartnershipContracts";
import { PartnershipContractModal } from "@/features/partnership-contract";
import { BackArrowIcon, InfoFillIcon } from "@/shared/assets/icons";
import { PageLayout } from "@/shared/ui/layout/PageLayout";
import { PartnershipListContent } from "@/widgets/partnership-list";

function Header({ onBack }: { onBack: () => void }) {
	return (
		<View className="relative flex-row items-center justify-center">
			<Pressable onPress={onBack} className="absolute left-0">
				<BackArrowIcon width={24} height={24} />
			</Pressable>
			<Text className="text-lg font-semibold text-content-primary">
				제휴단체 목록
			</Text>
		</View>
	);
}

function InfoBox() {
	return (
		<View className="flex-row items-center gap-2 rounded-lg bg-neutral px-4 py-3 mt-6">
			<InfoFillIcon width={16} height={16} />
			<Text className="flex-1 text-xs font-regular text-content-secondary">
				숭실대학교 총학생회와 제휴를 체결한 업체 목록이에요
			</Text>
		</View>
	);
}

function CountSection({ count }: { count: number }) {
	return (
		<Text className="text-sm font-regular text-content-secondary">
			진행중인 제휴가{" "}
			<Text className="font-semibold text-primary">{count}</Text> 건 있어요
		</Text>
	);
}

export function PartnerListPage() {
	const router = useRouter();
	const [selectedContractId, setSelectedContractId] = useState<string | null>(
		null,
	);

	const selectedContract =
		MOCK_PARTNERSHIP_CONTRACTS.find((c) => c.id === selectedContractId) ?? null;

	return (
		<>
			<PageLayout
				scrollable={true}
				withTopInset={true}
				withBottomInset={false}
				className="flex-1 bg-canvas"
				contentContainerClassName="gap-5 px-6 pb-6 pt-4"
			>
				<Header onBack={() => router.back()} />
				<InfoBox />
				<CountSection count={MOCK_PARTNERSHIPS.length} />
				<PartnershipListContent
					data={MOCK_PARTNERSHIPS}
					onPressCard={(id) => setSelectedContractId(id)}
				/>
			</PageLayout>

			<PartnershipContractModal
				visible={selectedContractId !== null}
				data={selectedContract}
				onClose={() => setSelectedContractId(null)}
				onQrPress={() => {
					if (selectedContractId) {
						router.push({
							pathname: "/(protected)/qr-view/[id]",
							params: { id: selectedContractId },
						});
					}
				}}
			/>
		</>
	);
}
