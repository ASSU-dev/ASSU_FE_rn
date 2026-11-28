import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import {
	parseAnalyticsContext,
	useGroupCertificationSessionMutation,
	usePartnershipAuthStore,
	usePersonalCertificationMutation,
	useStorePartnershipQuery,
} from "@/features/partnership-auth";
import { BackArrowIcon } from "@/shared/assets/icons";
import { trackEvent } from "@/shared/lib/analytics/trackEvent";
import { BenefitSelectButton } from "@/shared/ui/buttons/BenefitSelectButton";
import { MediumButton } from "@/shared/ui/buttons/SubmitButton";
import { PageLayout } from "@/shared/ui/layout";

export function PartnershipBenefitSelectPage() {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	const {
		storeId: storeIdParam,
		preSelectedContentId: preSelectedParam,
		entryPoint: entryPointParam,
		authMethod: authMethodParam,
	} = useLocalSearchParams<{
		storeId: string;
		preSelectedContentId?: string;
		entryPoint?: string;
		authMethod?: string;
	}>();
	const storeId = Number(storeIdParam);
	const analyticsContext = parseAnalyticsContext(
		entryPointParam,
		authMethodParam,
	);
	const authMethod = analyticsContext.authMethod;
	const trackedLoadErrorAtRef = useRef(0);
	const preSelectedContentId = preSelectedParam
		? Number(preSelectedParam)
		: null;
	const storeQuery = useStorePartnershipQuery(
		Number.isSafeInteger(storeId) && storeId > 0 ? storeId : null,
	);
	const store = storeQuery.data ?? null;
	const setStore = usePartnershipAuthStore((state) => state.setStore);
	const setSelectedBenefit = usePartnershipAuthStore(
		(state) => state.setSelectedBenefit,
	);
	const setAnalyticsContext = usePartnershipAuthStore(
		(state) => state.setAnalyticsContext,
	);
	const setGroupSession = usePartnershipAuthStore(
		(state) => state.setGroupSession,
	);
	const personalCertification = usePersonalCertificationMutation();
	const groupCertification = useGroupCertificationSessionMutation();
	const benefits = store?.benefits ?? [];
	const selectedBenefit =
		selectedIndex === null ? null : benefits[selectedIndex];

	useEffect(() => {
		if (storeQuery.data) setStore(storeQuery.data);
	}, [setStore, storeQuery.data]);

	// 혜택 목록 로드 실패를 실패한 시도마다 1회 기록한다. 번호 인증에서 없는 매장 번호를 넣으면 여기서 드러난다.
	useEffect(() => {
		if (
			!storeQuery.isError ||
			trackedLoadErrorAtRef.current === storeQuery.errorUpdatedAt
		)
			return;
		trackedLoadErrorAtRef.current = storeQuery.errorUpdatedAt;
		trackEvent("partnership_auth_failed", {
			fail_stage: "benefit_load",
			fail_reason: "request_failed",
			store_id:
				Number.isSafeInteger(storeId) && storeId > 0 ? storeId : undefined,
			auth_method: authMethod,
		});
	}, [storeQuery.isError, storeQuery.errorUpdatedAt, storeId, authMethod]);

	// 뒤 화면(단체 QR, 인증 확인)의 GA 이벤트가 진입 경로와 인증 방식을 알 수 있게 저장한다.
	useEffect(() => {
		setAnalyticsContext(
			parseAnalyticsContext(entryPointParam, authMethodParam),
		);
	}, [setAnalyticsContext, entryPointParam, authMethodParam]);

	useEffect(() => {
		if (
			preSelectedContentId == null ||
			benefits.length === 0 ||
			selectedIndex !== null
		)
			return;
		const idx = benefits.findIndex((b) => b.id === preSelectedContentId);
		if (idx !== -1) setSelectedIndex(idx);
	}, [benefits, preSelectedContentId, selectedIndex]);

	const handleComplete = async () => {
		if (!store || !selectedBenefit) return;

		trackEvent("benefit_selected", {
			store_id: store.storeId,
			content_id: selectedBenefit.id,
			benefit_type: selectedBenefit.type === "GROUP" ? "group" : "individual",
			preselected: preSelectedContentId !== null ? 1 : 0,
			auth_method: analyticsContext.authMethod,
		});

		try {
			setSelectedBenefit(selectedBenefit);
			if (selectedBenefit.type === "GROUP") {
				if (!selectedBenefit.people) {
					throw new Error("그룹 인증 인원 정보가 없습니다.");
				}

				const sessionId = await groupCertification.mutateAsync({
					people: selectedBenefit.people,
					storeId: store.storeId,
					adminId: selectedBenefit.adminId,
					contentId: selectedBenefit.id,
				});
				setGroupSession({
					sessionId,
					requiredPeople: selectedBenefit.people,
					count: 1,
					status: "WAITING",
					userIds: [],
					role: "REPRESENTATIVE",
				});
				router.push("/(protected)/student/partnership-group-certification");
				return;
			}

			await personalCertification.mutateAsync({
				storeId: store.storeId,
				adminId: selectedBenefit.adminId,
			});
			trackEvent("partnership_auth_succeeded", {
				store_id: store.storeId,
				content_id: selectedBenefit.id,
				benefit_type: "individual",
				auth_method: analyticsContext.authMethod,
			});
			router.push("/(protected)/student/partnership-verification");
		} catch {
			trackEvent("partnership_auth_failed", {
				fail_stage: "benefit_certify",
				fail_reason: "request_failed",
				store_id: store.storeId,
				auth_method: analyticsContext.authMethod,
			});
			Alert.alert("인증 실패", "제휴 인증을 시작하지 못했습니다.");
		}
	};

	return (
		<PageLayout withBottomInset contentContainerClassName="flex-1 px-screen-m">
			<Pressable
				onPress={() => router.back()}
				hitSlop={8}
				className="mt-[9px] size-6 items-center justify-center"
			>
				<BackArrowIcon width={24} height={24} />
			</Pressable>

			<View className="mt-[45px] items-center gap-[12px]">
				<Text className="text-lg font-semibold leading-caption tracking-caption text-primary">
					{store?.storeName ?? "제휴 매장"}
				</Text>
				<Text className="text-[25px] font-semibold leading-[28px] tracking-caption text-content-primary">
					제휴 혜택을 선택해주세요
				</Text>
			</View>

			<ScrollView
				className="mt-[61px] flex-1"
				contentContainerClassName="w-full items-center gap-[18px] pb-card-gap"
				showsVerticalScrollIndicator={false}
			>
				{storeQuery.isLoading ? (
					<Text className="text-md font-regular text-content-secondary">
						제휴 혜택을 불러오는 중입니다
					</Text>
				) : storeQuery.isError ? (
					<View className="items-center gap-gutter">
						<Text className="text-md font-regular text-content-secondary">
							제휴 혜택을 불러오지 못했습니다
						</Text>
						<Pressable
							onPress={() => storeQuery.refetch()}
							className="rounded-[8px] bg-neutral px-[20px] py-gutter"
						>
							<Text className="text-sm font-semibold text-content-secondary">
								다시 시도
							</Text>
						</Pressable>
					</View>
				) : benefits.length === 0 ? (
					<Text className="text-md font-regular text-content-secondary">
						사용 가능한 제휴 혜택이 없습니다
					</Text>
				) : (
					benefits.map((benefit, index) => (
						<BenefitSelectButton
							key={benefit.id}
							title={benefit.manager}
							description={benefit.contents}
							isSelected={selectedIndex === index}
							dimmed={selectedIndex !== null && selectedIndex !== index}
							onPress={() => setSelectedIndex(index)}
						/>
					))
				)}
			</ScrollView>

			<View className="items-center pb-[4px] pt-card-gap">
				<MediumButton
					disabled={
						selectedIndex === null ||
						personalCertification.isPending ||
						groupCertification.isPending
					}
					onPress={handleComplete}
				>
					{personalCertification.isPending || groupCertification.isPending
						? "인증 중"
						: "선택 완료"}
				</MediumButton>
			</View>
		</PageLayout>
	);
}
