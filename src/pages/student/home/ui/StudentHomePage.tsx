import { router } from ".expo/types/router";
import { QRScannerButton } from "@/features/qr-auth/ui/QRScannerButton";
import { PartnerRankingList } from "@/widgets/partner-ranking/ui/PartnerRankingList";
import { StampBoard } from "@/widgets/stamp-board/ui/StampBoard";
import React from "react";
import { Pressable, ScrollView, Text } from "react-native";

export function StudentHomePage() {
  const userStampCount = 4;
  const userName = "김숭실";
  return (
    <ScrollView className="flex-1 bg-gray-50 px-5 pt-10">
      <Pressable
				className="rounded-lg bg-primary px-4 py-3"
				onPress={() => router.push("/")}
			>
				<Text className="text-sm font-semibold text-white">
					허브로 돌아가기
				</Text>
			</Pressable>
      <Text className="text-2xl font-bold mb-6">안녕하세요, {userName}님!</Text>
      <Text className="text-2xl font-bold mb-6">
        오늘은 어떤 할인을 받을까요?
      </Text>

      <QRScannerButton />
      <StampBoard currentCount={userStampCount} />

      <PartnerRankingList />
    </ScrollView>
  );
}
