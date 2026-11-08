import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native";
import {
	certifyGroupParticipant,
	useGroupCertificationSessionDetailQuery,
	useGroupCertificationProgress,
	usePartnershipAuthStore,
} from "@/features/partnership-auth";
import { colorTokens } from "@/shared/styles/tokens";
import { MediumButton } from "@/shared/ui/buttons/SubmitButton";
import { PageLayout } from "@/shared/ui/layout";

export function PartnershipGroupParticipantPage() {
	const { sessionId: sessionIdParam, adminId: adminIdParam } =
		useLocalSearchParams<{
			sessionId?: string | string[];
			adminId?: string | string[];
	}>();
	const sessionIdValue = Array.isArray(sessionIdParam)
		? sessionIdParam[0]
		: sessionIdParam;
	const adminIdValue = Array.isArray(adminIdParam) ? adminIdParam[0] : adminIdParam;
	const parsedSessionId = Number(sessionIdValue);
	const parsedAdminId = Number(adminIdValue);
	const hasValidDeepLink =
		Number.isSafeInteger(parsedSessionId) &&
		parsedSessionId > 0 &&
		Number.isSafeInteger(parsedAdminId) &&
		parsedAdminId > 0;
	const sessionId = hasValidDeepLink ? parsedSessionId : null;
	const sessionQuery = useGroupCertificationSessionDetailQuery(sessionId);
	const sessionDetail = sessionQuery.data;
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
	const [hydratedSessionKey, setHydratedSessionKey] = useState<string | null>(
		null,
	);
	const hasPublishedRef = useRef(false);
	const sessionKey = hasValidDeepLink
		? `${parsedSessionId}:${parsedAdminId}`
		: null;
	const isAdminMismatch =
		sessionDetail !== undefined &&
		sessionDetail.benefit.adminId !== parsedAdminId;
	const isDeepLinkHydrated =
		sessionKey !== null &&
		hydratedSessionKey === sessionKey &&
		!isAdminMismatch &&
		Boolean(
			store &&
			benefit?.adminId === parsedAdminId &&
			groupSession?.sessionId === parsedSessionId &&
			groupSession.role === "PARTICIPANT",
		);
	const progressSessionId =
		groupSession?.role === "PARTICIPANT" &&
		groupSession.sessionId === sessionId
			? sessionId
			: null;
	useGroupCertificationProgress(progressSessionId);

	useEffect(() => {
		hasPublishedRef.current = false;
	}, [sessionKey]);

	useEffect(() => {
		if (!sessionKey || !sessionDetail || isAdminMismatch) return;

		setStore(sessionDetail.store);
		setSelectedBenefit(sessionDetail.benefit);
		setGroupSession(sessionDetail.session);
		setHydratedSessionKey(sessionKey);
	}, [
		isAdminMismatch,
		sessionDetail,
		sessionKey,
		setGroupSession,
		setSelectedBenefit,
		setStore,
	]);

	useEffect(() => {
		if (
			!isDeepLinkHydrated ||
			!benefit ||
			!groupSession ||
			groupSession.status === "COMPLETED" ||
			hasPublishedRef.current
		)
			return;

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
	}, [benefit, groupSession, isDeepLinkHydrated]);

	const handleSessionLookupRetry = () => {
		if (hasValidDeepLink && !isAdminMismatch) {
			void sessionQuery.refetch();
			return;
		}

		router.replace("/(protected)/student/(tabs)/home");
	};

	if (!isDeepLinkHydrated || !store || !benefit || !groupSession) {
		const hasLookupFailed =
			!hasValidDeepLink || sessionQuery.isError || isAdminMismatch;

		return (
			<PageLayout withBottomInset contentContainerClassName="flex-1 px-screen-m">
				<View className="flex-1 items-center justify-center gap-gutter">
					{hasLookupFailed ? null : (
						<ActivityIndicator color={colorTokens.primary} />
					)}
					<Text className="text-center text-md font-regular text-content-secondary">
						{hasLookupFailed
							? "다인 인증 정보를 확인할 수 없습니다. QR을 다시 확인해 주세요."
							: "다인 인증 정보를 불러오고 있습니다."}
					</Text>
					{hasLookupFailed ? (
						<MediumButton onPress={handleSessionLookupRetry}>
							{hasValidDeepLink && !isAdminMismatch
								? "다시 시도"
								: "홈으로 이동"}
						</MediumButton>
					) : null}
				</View>
			</PageLayout>
		);
	}

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
