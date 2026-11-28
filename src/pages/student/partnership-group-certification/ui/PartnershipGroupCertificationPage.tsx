import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useMemo, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import {
	buildGroupCertificationQrValue,
	useGroupCertificationProgress,
	usePartnershipAuthStore,
} from "@/features/partnership-auth";
import { InfoIcon } from "@/shared/assets/icons";
import { trackEvent } from "@/shared/lib/analytics/trackEvent";
import { MediumButton } from "@/shared/ui/buttons/SubmitButton";
import { PageLayout } from "@/shared/ui/layout";

export function PartnershipGroupCertificationPage() {
	const store = usePartnershipAuthStore((state) => state.store);
	const benefit = usePartnershipAuthStore((state) => state.selectedBenefit);
	const groupSession = usePartnershipAuthStore((state) => state.groupSession);
	const analyticsContext = usePartnershipAuthStore(
		(state) => state.analyticsContext,
	);
	const sessionId = groupSession?.sessionId ?? null;
	const trackedSuccessSessionIdRef = useRef<number | null>(null);
	useGroupCertificationProgress(sessionId);

	const isGroupComplete =
		groupSession !== null &&
		(groupSession.status === "COMPLETED" ||
			groupSession.count >= groupSession.requiredPeople);

	// 인원이 처음 충족됐을 때 세션당 1회만 인증 성공을 기록한다.
	useEffect(() => {
		if (
			!isGroupComplete ||
			!store ||
			!benefit ||
			sessionId === null ||
			trackedSuccessSessionIdRef.current === sessionId
		)
			return;
		trackedSuccessSessionIdRef.current = sessionId;
		trackEvent("partnership_auth_succeeded", {
			store_id: store.storeId,
			content_id: benefit.id,
			benefit_type: "group",
			auth_method: analyticsContext?.authMethod ?? "direct",
		});
	}, [isGroupComplete, store, benefit, sessionId, analyticsContext]);

	const qrValue = useMemo(() => {
		if (!benefit || !groupSession) return null;
		return buildGroupCertificationQrValue({
			adminId: benefit.adminId,
			sessionId: groupSession.sessionId,
		});
	}, [benefit, groupSession]);

	useEffect(() => {
		if (!benefit || !groupSession) {
			router.replace("/(protected)/student/partnership-auth");
		}
	}, [benefit, groupSession]);

	if (!benefit || !groupSession || !qrValue) return null;

	const displayedCount = Math.min(
		groupSession.count,
		groupSession.requiredPeople,
	);
	const isComplete =
		groupSession.status === "COMPLETED" ||
		displayedCount >= groupSession.requiredPeople;

	const handleComplete = () => {
		if (!isComplete) return;
		router.replace("/(protected)/student/partnership-verification");
	};

	return (
		<PageLayout withBottomInset contentContainerClassName="flex-1 px-screen-m">
			<Pressable
				onPress={() => router.back()}
				hitSlop={8}
				className="mt-[9px] size-6 items-center justify-center"
			>
				<Ionicons name="chevron-back" size={24} />
			</Pressable>

			<View className="mt-[45px] items-center gap-[6px]">
				{store ? (
					<Text className="text-center text-md font-medium leading-caption tracking-caption text-primary">
						{store.storeName}
					</Text>
				) : null}
				<Text className="text-center text-[25px] font-semibold leading-heading tracking-caption text-content-primary">
					{benefit.contents}
				</Text>
			</View>

			<View className="mt-[45px] items-center">
				<View className="items-center justify-center rounded-[16px] border-[3px] border-sub bg-canvas p-[24px]">
					<QRCode value={qrValue} size={200} />
				</View>
			</View>

			<View className="mt-[35px] w-full items-center justify-center gap-[12px] rounded-[12px] bg-neutral py-card-p">
				<Text className="text-sm font-regular leading-caption tracking-caption text-primary">
					제휴 인증 인원
				</Text>
				<View className="flex-row items-center justify-center gap-[34px]">
					{Array.from({ length: groupSession.requiredPeople }, (_, index) => {
						const isVerified = index < displayedCount;
						return (
							<View
								key={`participant-progress-${index + 1}`}
								className={`size-[21px] items-center justify-center rounded-[999px] ${
									isVerified ? "bg-primary-tint" : "bg-neutral-variant"
								}`}
							>
								<View
									className={`size-[11px] rounded-[999px] ${
										isVerified ? "bg-sub" : "bg-content-tertiary"
									}`}
								/>
							</View>
						);
					})}
				</View>
			</View>

			<View className="mt-[12px] flex-row items-center gap-[4px] px-[4px]">
				<InfoIcon width={10} height={10} />
				<Text className="flex-1 text-[11px] font-regular leading-caption tracking-caption text-content-secondary">
					인원 조건이 있는 혜택으로, 모든 인원이 QR코드를 스캔해 인증해야
					합니다.
				</Text>
			</View>

			<View className="mt-auto items-center pb-[4px]">
				<MediumButton disabled={!isComplete} onPress={handleComplete}>
					인증완료
				</MediumButton>
			</View>
		</PageLayout>
	);
}
