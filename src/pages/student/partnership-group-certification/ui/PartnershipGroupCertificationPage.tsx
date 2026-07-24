import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import {
	buildGroupCertificationQrValue,
	useGroupCertificationProgress,
	usePartnershipAuthStore,
} from "@/features/partnership-auth";
import { PageLayout } from "@/shared/ui/layout";

export function PartnershipGroupCertificationPage() {
	const benefit = usePartnershipAuthStore((state) => state.selectedBenefit);
	const groupSession = usePartnershipAuthStore((state) => state.groupSession);
	const sessionId = groupSession?.sessionId ?? null;
	useGroupCertificationProgress(sessionId);

	const qrValue = useMemo(() => {
		if (!benefit || !groupSession) return null;
		return buildGroupCertificationQrValue(
			benefit.adminId,
			groupSession.sessionId,
		);
	}, [benefit, groupSession]);

	useEffect(() => {
		if (groupSession?.status === "COMPLETED") {
			router.replace("/(protected)/student/partnership-verification");
		}
	}, [groupSession?.status]);

	useEffect(() => {
		if (!benefit || !groupSession) {
			router.replace("/(protected)/student/partnership-auth");
		}
	}, [benefit, groupSession]);

	if (!benefit || !groupSession || !qrValue) return null;

	return (
		<PageLayout withBottomInset contentContainerClassName="flex-1 px-screen-m">
			<Pressable
				onPress={() => router.back()}
				hitSlop={8}
				className="mt-[9px] size-6 items-center justify-center"
			>
				<Ionicons name="chevron-back" size={24} />
			</Pressable>

			<View className="mt-[45px] items-center gap-[12px]">
				<Text className="text-lg font-semibold text-primary">다인용 혜택</Text>
				<Text className="text-center text-[25px] font-semibold leading-[28px] text-content-primary">
					함께 인증할 분들에게{"\n"}QR 코드를 보여주세요
				</Text>
			</View>

			<View className="mt-[42px] items-center">
				<View className="rounded-[12px] bg-canvas p-card-p">
					<QRCode value={qrValue} size={200} />
				</View>
				<Text className="mt-[20px] text-md font-semibold text-content-primary">
					{groupSession.count}/{groupSession.requiredPeople}명 인증 완료
				</Text>
				<View className="mt-[14px] flex-row gap-gutter">
					{Array.from({ length: groupSession.requiredPeople }, (_, index) => (
						<View
							key={`participant-${index + 1}`}
							className={`size-[12px] rounded-[999px] ${
								index < groupSession.count ? "bg-primary" : "bg-neutral"
							}`}
						/>
					))}
				</View>
			</View>

			<View className="mt-auto rounded-[8px] bg-neutral p-card-p">
				<Text className="text-center text-sm font-regular text-content-secondary">
					필요한 인원이 모두 인증하면 자동으로 다음 화면으로 이동합니다
				</Text>
			</View>
		</PageLayout>
	);
}
