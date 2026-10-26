import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import {
	certifyGroupParticipant,
	parseGroupCertificationQr,
	useGroupCertificationProgress,
	usePartnershipAuthStore,
} from "@/features/partnership-auth";
import { MediumButton } from "@/shared/ui/buttons/SubmitButton";
import { PageLayout } from "@/shared/ui/layout";

export function PartnershipGroupParticipantPage() {
	const { payload: deepLinkPayloadParam } = useLocalSearchParams<{
		payload: string | string[];
	}>();
	const deepLinkPayload = Array.isArray(deepLinkPayloadParam)
		? deepLinkPayloadParam[0]
		: deepLinkPayloadParam;
	const store = usePartnershipAuthStore((state) => state.store);
	const benefit = usePartnershipAuthStore((state) => state.selectedBenefit);
	const groupSession = usePartnershipAuthStore((state) => state.groupSession);
	const resetPartnershipAuth = usePartnershipAuthStore((state) => state.reset);
	const setStore = usePartnershipAuthStore((state) => state.setStore);
	const setSelectedBenefit = usePartnershipAuthStore(
		(state) => state.setSelectedBenefit,
	);
	const setGroupSession = usePartnershipAuthStore(
		(state) => state.setGroupSession,
	);
	const [hydratedDeepLinkPayload, setHydratedDeepLinkPayload] = useState<
		string | null
	>(null);
	const isDeepLinkHydrated =
		!deepLinkPayload || hydratedDeepLinkPayload === deepLinkPayload;
	const hasPublishedRef = useRef(false);
	const hasValidSessionRef = useRef(Boolean(store && benefit && groupSession));
	const sessionId = groupSession?.sessionId ?? null;
	useGroupCertificationProgress(sessionId);

	useEffect(() => {
		if (!deepLinkPayload) return;

		hasPublishedRef.current = false;
		const payload = parseGroupCertificationQr(deepLinkPayload);
		if (!payload) {
			Alert.alert(
				"QR 확인 실패",
				"다인 인증 정보를 확인할 수 없습니다. QR을 다시 발급해 주세요.",
				[
					{
						text: "확인",
						onPress: () =>
							router.replace("/(protected)/student/partnership-auth"),
					},
				],
				{ cancelable: false },
			);
			return;
		}

		const benefit = {
			id: payload.contentId,
			adminId: payload.adminId,
			manager: payload.adminName,
			contents: payload.partnershipContent,
			goods: payload.goods,
			people: payload.requiredPeople,
			cost: null,
			type: "GROUP",
		} as const;

		setStore({
			storeId: payload.storeId,
			storeName: payload.storeName,
			benefits: [benefit],
		});
		setSelectedBenefit(benefit);
		setGroupSession({
			sessionId: payload.sessionId,
			requiredPeople: payload.requiredPeople,
			count: 0,
			status: "WAITING",
			userIds: [],
			role: "PARTICIPANT",
		});
		setHydratedDeepLinkPayload(deepLinkPayload);
	}, [deepLinkPayload, setGroupSession, setSelectedBenefit, setStore]);

	useEffect(() => {
		if (deepLinkPayload && !isDeepLinkHydrated) return;
		if (!benefit || !groupSession || hasPublishedRef.current) return;

		hasPublishedRef.current = true;
		let isMounted = true;
		void certifyGroupParticipant({
			adminId: benefit.adminId,
			sessionId: groupSession.sessionId,
		}).then((published) => {
			if (isMounted && !published) {
				Alert.alert(
					"연결 확인",
					"인증 서버에 연결되지 않았습니다. 잠시 후 다시 시도해주세요.",
					[
						{
							text: "확인",
							onPress: () => router.back(),
						},
					],
				);
			}
		});
		return () => {
			isMounted = false;
		};
	}, [benefit, deepLinkPayload, groupSession, isDeepLinkHydrated]);

	useEffect(() => {
		if (deepLinkPayload) return;

		if (store && benefit && groupSession) {
			hasValidSessionRef.current = true;
			return;
		}

		if (!hasValidSessionRef.current) {
			router.replace("/(protected)/student/partnership-auth");
		}
	}, [benefit, deepLinkPayload, groupSession, store]);

	if (!isDeepLinkHydrated || !store || !benefit || !groupSession) return null;

	const displayedCount = Math.min(
		groupSession.count,
		groupSession.requiredPeople,
	);
	const isComplete =
		groupSession.status === "COMPLETED" ||
		displayedCount >= groupSession.requiredPeople;

	const handleBack = () => {
		resetPartnershipAuth();
		router.back();
	};

	const handleComplete = () => {
		if (!isComplete) return;
		router.replace({
			pathname: "/(protected)/student/partnership-complete",
			params: { benefit: benefit.contents },
		});
	};

	return (
		<PageLayout withBottomInset contentContainerClassName="flex-1 px-screen-m">
			<Pressable
				onPress={handleBack}
				hitSlop={8}
				className="mt-[9px] size-6 items-center justify-center"
			>
				<Ionicons name="chevron-back" size={24} />
			</Pressable>

			<View className="mt-[45px] items-center">
				<Text className="text-center text-[25px] font-semibold leading-heading tracking-caption text-content-primary">
					{store.storeName}
				</Text>
			</View>

			<View className="mt-[35px] gap-[15px]">
				<View className="items-center justify-center gap-[3px] rounded-[12px] bg-neutral py-gutter">
					<Text className="text-sm font-regular leading-caption tracking-caption text-primary">
						제휴 제공
					</Text>
					<Text className="px-[4px] text-center text-lg font-medium leading-caption tracking-caption text-content-primary">
						{benefit.manager}
					</Text>
				</View>

				<View className="items-center justify-center gap-[3px] rounded-[12px] bg-neutral py-gutter">
					<Text className="text-sm font-regular leading-caption tracking-caption text-primary">
						제휴 내용
					</Text>
					<Text className="px-[4px] text-center text-lg font-medium leading-caption tracking-caption text-content-primary">
						{benefit.contents}
					</Text>
				</View>
			</View>

			<View className="mx-[15px] mt-[30px] h-px bg-neutral-variant" />

			<View className="mt-[30px] items-center">
				<View className="w-full items-center justify-center gap-[12px] rounded-[12px] bg-neutral py-card-p">
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

				{!isComplete ? (
					<Text className="mt-[8px] text-center text-[11px] font-regular leading-caption tracking-caption text-content-secondary">
						다른 사용자의 인증을 기다리고 있어요!
					</Text>
				) : null}
			</View>

			<View className="mt-auto items-center pb-[4px]">
				<MediumButton disabled={!isComplete} onPress={handleComplete}>
					인증완료
				</MediumButton>
			</View>
		</PageLayout>
	);
}
