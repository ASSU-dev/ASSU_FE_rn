import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { PartnershipContract } from "@/entities/partnership";
import { colorTokens } from "@/shared/styles/tokens";
import { formatDate, formatKoreanDate } from "@/shared/utils";
import { BenefitSummaryCard } from "./BenefitSummaryCard";

interface Props {
	data: PartnershipContract;
	onClose: () => void;
}

function InfoField({ label, value }: { label: string; value: string }) {
	return (
		<View>
			<View className="px-[15px] py-[5px]">
				<Text className="text-[13px] text-content-secondary">{label}</Text>
			</View>
			<View className="px-[15px] py-[15px]">
				<Text className="text-[17px] text-content-primary opacity-70">
					{value}
				</Text>
			</View>
			<View
				style={{
					height: 0.5,
					backgroundColor: "#e0e0e0",
					marginHorizontal: 15,
				}}
			/>
		</View>
	);
}

export function PartnershipContractContent({ data, onClose }: Props) {
	const insets = useSafeAreaInsets();

	return (
		<View className="flex-1 bg-canvas" style={{ paddingTop: insets.top }}>
			{/* 헤더 */}
			<View className="flex-row items-center px-[10px] py-[13px]">
				<Pressable onPress={onClose} hitSlop={8}>
					<Ionicons name="close" size={24} color={colorTokens.contentPrimary} />
				</Pressable>
				<View className="flex-1 items-center pr-6">
					<Text className="text-[20px] font-semibold text-content-primary tracking-[-0.32px]">
						제휴 계약서
					</Text>
				</View>
			</View>

			{/* 스크롤 컨텐츠 */}
			<ScrollView
				className="flex-1"
				contentContainerClassName="gap-[23px] px-6 pb-6"
				showsVerticalScrollIndicator={false}
			>
				{/* 기본 정보 */}
				<View className="gap-[15px]">
					<InfoField label="제휴 제안업체" value={data.companyName} />
					<InfoField label="제휴 제안인" value={data.proposerName} />
				</View>

				{/* 혜택 목록 */}
				<View className="gap-[10px]">
					{data.benefits.map((benefit) => (
						<BenefitSummaryCard key={benefit.id} benefit={benefit} />
					))}
				</View>

				{/* 제휴 기간 */}
				<View className="gap-[10px]">
					<View className="px-[15px] py-[5px]">
						<Text className="text-[13px] text-content-secondary">
							제휴 기간
						</Text>
					</View>

					{/* 기간 행 */}
					<View className="flex-row items-center gap-[5px]">
						<View className="flex-1 px-[15px] py-[5px]">
							<Text className="text-[14px] text-content-primary">
								{formatDate(data.startDate, { separator: "-" })}
							</Text>
						</View>
						<Text className="text-[20px] font-bold text-content-primary">
							~
						</Text>
						<View className="flex-1 px-[15px] py-[5px]">
							<Text className="text-[14px] text-content-primary">
								{formatDate(data.endDate, { separator: "-" })}
							</Text>
						</View>
					</View>

					{/* 서명 박스 */}
					<View className="bg-neutral rounded-lg p-[15px] min-h-[134px] items-start justify-center">
						<Text className="text-[14px] text-content-secondary leading-[20px]">
							{`위와 같이 숭실대학교 총학생회와\n제휴를 제안합니다.\n\n${formatKoreanDate(data.contractDate)}\n대표 (인)`}
						</Text>
					</View>
				</View>
			</ScrollView>

			{/* 하단 버튼 영역 */}
			<View
				className="flex-row gap-[10px] px-6 pt-4"
				style={{ paddingBottom: Math.max(insets.bottom, 16) }}
			>
				<Pressable
					className="flex-1 border-[0.5px] border-content-primary rounded-xl items-center justify-center py-[18px]"
					onPress={() =>
						router.push({ pathname: "/qr-view/[id]", params: { id: data.id } })
					}
				>
					<Text className="text-[20px] font-medium text-content-primary">
						QR저장
					</Text>
				</Pressable>
				<Pressable className="flex-1 bg-content-primary rounded-xl flex-row items-center justify-center gap-[10px] py-[18px]">
					<Ionicons
						name="pencil"
						size={18}
						color={colorTokens.contentInverse}
					/>
					<Text className="text-[20px] font-medium text-content-inverse">
						수정하기
					</Text>
				</Pressable>
			</View>
		</View>
	);
}
