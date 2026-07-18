import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { AppTopBar } from "@/shared/ui/app-top-bar/AppTopBar";
import { Dialog } from "@/shared/ui/dialog";
import { EmptyState } from "@/shared/ui/empty-state";
import { InfoBanner } from "@/shared/ui/info";
import { PageLayout } from "@/shared/ui/layout";

import {
	type BlockedPartner,
	MOCK_BLOCKED_PARTNERS,
} from "../model/mockBlockedPartners";

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
	const [partners, setPartners] = useState(MOCK_BLOCKED_PARTNERS);
	const [selectedPartner, setSelectedPartner] = useState<BlockedPartner | null>(
		null,
	);

	const handleUnblock = () => {
		if (!selectedPartner) return;
		setPartners((current) =>
			current.filter((partner) => partner.id !== selectedPartner.id),
		);
		setSelectedPartner(null);
	};

	return (
		<PageLayout>
			<AppTopBar title="차단 업체 관리" />
			{partners.length === 0 ? (
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
					<Dialog.ConfirmButton onPress={handleUnblock}>
						차단 해제
					</Dialog.ConfirmButton>
				</Dialog.Actions>
			</Dialog>
		</PageLayout>
	);
}
