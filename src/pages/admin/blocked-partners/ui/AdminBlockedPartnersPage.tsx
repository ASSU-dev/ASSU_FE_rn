import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import {
	useGetBlockListQuery,
	useUnblockMutation,
} from "@/features/chat-block-user";
import { colorTokens } from "@/shared/styles/tokens";
import { AppTopBar } from "@/shared/ui/app-top-bar/AppTopBar";
import { Dialog } from "@/shared/ui/dialog";
import { EmptyState } from "@/shared/ui/empty-state";
import { InfoBanner } from "@/shared/ui/info";
import { PageLayout } from "@/shared/ui/layout";

interface BlockedPartner {
	id: number;
	name: string;
	blockedAt: string;
}

interface BlockedPartnerRowProps {
	partner: BlockedPartner;
	onPress: (partner: BlockedPartner) => void;
}

function BlockedPartnerRow({ partner, onPress }: BlockedPartnerRowProps) {
	return (
		<Pressable
			onPress={() => onPress(partner)}
			className="h-[66px] flex-row items-center px-screen-m"
		>
			<View className="flex-1 justify-center self-stretch px-gutter">
				<Text className="text-sm font-medium text-content-primary">
					{partner.name}
				</Text>
				<Text className="mt-[3px] text-[11px] text-content-secondary">
					차단일 | {partner.blockedAt}
				</Text>
			</View>
			<Text className="text-[11px] font-medium text-primary">
				차단 해제하기
			</Text>
		</Pressable>
	);
}

export function AdminBlockedPartnersPage() {
	const { data, isLoading, isError } = useGetBlockListQuery();
	const { mutate: unblock, isPending: isUnblocking } = useUnblockMutation();
	const [selectedPartner, setSelectedPartner] = useState<BlockedPartner | null>(
		null,
	);
	const partners = (data?.result ?? []).flatMap((partner) => {
		if (
			!Number.isSafeInteger(partner.memberId) ||
			!partner.memberId ||
			typeof partner.name !== "string" ||
			partner.name.trim().length === 0
		) {
			return [];
		}

		return [
			{
				id: partner.memberId,
				name: partner.name.trim(),
				blockedAt: partner.blockDate ?? "-",
			},
		];
	});

	const handleUnblock = () => {
		if (!selectedPartner) return;
		unblock(
			{ opponentId: selectedPartner.id },
			{ onSuccess: () => setSelectedPartner(null) },
		);
	};

	return (
		<PageLayout>
			<AppTopBar title="차단 업체 관리" />
			{isLoading ? (
				<View className="items-center py-10">
					<ActivityIndicator color={colorTokens.primary} />
				</View>
			) : isError ? (
				<EmptyState
					title="차단 목록을 불러오지 못했어요"
					description="잠시 후 다시 시도해주세요"
				/>
			) : partners.length === 0 ? (
				<EmptyState
					title="아직 차단된 업체가 없어요!"
					description="채팅 탭에서 업체의 차단을 진행할 수 있어요"
				/>
			) : (
				<View className="pt-[21px]">
					<View className="px-screen-m">
						<InfoBanner message="내가 차단한 업체 목록이에요" />
						<Text className="px-[7px] pb-[15px] pt-[15px] text-[11px] text-content-secondary">
							차단된 업체가{" "}
							<Text className="text-primary">{partners.length}</Text>곳 있어요
						</Text>
					</View>
					{partners.map((partner) => (
						<BlockedPartnerRow
							key={partner.id}
							partner={partner}
							onPress={setSelectedPartner}
						/>
					))}
				</View>
			)}

			<Dialog
				visible={selectedPartner !== null}
				onDismiss={() => setSelectedPartner(null)}
			>
				<Dialog.Title>차단을 해제하시겠습니까?</Dialog.Title>
				<Dialog.Content>
					<Text className="text-sm text-content-secondary">
						{selectedPartner?.name}의 차단을 해제합니다
					</Text>
				</Dialog.Content>
				<Dialog.Actions>
					<Dialog.CancelButton onPress={() => setSelectedPartner(null)}>
						취소
					</Dialog.CancelButton>
					<Dialog.ConfirmButton onPress={handleUnblock} disabled={isUnblocking}>
						{isUnblocking ? "차단 해제 중" : "차단 해제"}
					</Dialog.ConfirmButton>
				</Dialog.Actions>
			</Dialog>
		</PageLayout>
	);
}
