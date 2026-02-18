import { shadows } from "@/shared/styles/shadows";
import { LargeButton } from "@/shared/ui/buttons/large_button";
import { MediumButton } from "@/shared/ui/buttons/medium_button";
import { SmallButton } from "@/shared/ui/buttons/small_button";
import { ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
	return (
		<ScrollView
			className="flex-1 bg-canvas"
			contentContainerStyle={{ paddingHorizontal: 24 }}
		>
			{/* 헤더 영역 */}
			<View className="items-center mb-8 mt-12">
				<Text className="text-[32px] font-bold text-content-primary mb-2">
					Welcome
				</Text>
				<Text className="text-base text-content-secondary">
					디자인 토큰이 적용된 메인 화면
				</Text>
			</View>

			{/* Primary 버튼 with Shadow */}
			<View className="bg-primary rounded-lg p-4 mb-4" style={shadows.primary}>
				<Text className="text-base font-semibold text-content-inverse text-center">
					Primary 버튼 (Primary Shadow)
				</Text>
			</View>

			{/* 카드 with Neutral Shadow */}
			<View className="bg-neutral rounded-lg p-4 mb-4" style={shadows.neutral}>
				<Text className="text-lg font-bold text-content-primary mb-2">
					카드 제목
				</Text>
				<Text className="text-sm text-content-secondary">
					Neutral 배경 + Neutral Shadow 적용
				</Text>
			</View>

			{/* Primary Tint 카드 with Shadow */}
			<View
				className="bg-primary-tint rounded-lg p-4 mb-4"
				style={shadows.neutral}
			>
				<Text className="text-base font-semibold text-content-primary mb-1">
					Primary Tint 카드
				</Text>
				<Text className="text-sm text-content-secondary">
					연한 블루 배경 + Shadow
				</Text>
			</View>

			{/* 그리드 아이템들 with Shadow */}
			<View className="mb-4">
				<Text className="text-base font-bold text-content-primary mb-2">
					그리드 아이템 (Gutter 적용)
				</Text>
				<View className="flex-row gap-gutter">
					<View
						className="flex-1 bg-primary-tint rounded-lg p-3"
						style={shadows.neutral}
					>
						<Text className="text-sm text-content-primary text-center font-semibold">
							아이템 1
						</Text>
					</View>
					<View
						className="flex-1 bg-primary-tint rounded-lg p-3"
						style={shadows.neutral}
					>
						<Text className="text-sm text-content-primary text-center font-semibold">
							아이템 2
						</Text>
					</View>
					<View
						className="flex-1 bg-primary-tint rounded-lg p-3"
						style={shadows.neutral}
					>
						<Text className="text-sm text-content-primary text-center font-semibold">
							아이템 3
						</Text>
					</View>
				</View>
			</View>

			{/* 리스트 아이템들 with Shadow */}
			<View className="mb-4">
				<Text className="text-base font-bold text-content-primary mb-2">
					리스트 아이템 (Gutter 적용)
				</Text>
				<View className="space-y-gutter">
					<View
						className="bg-neutral-variant rounded-lg p-3"
						style={shadows.neutral}
					>
						<Text className="text-sm text-content-primary font-semibold">
							리스트 아이템 1
						</Text>
					</View>
					<View
						className="bg-neutral-variant rounded-lg p-3"
						style={shadows.neutral}
					>
						<Text className="text-sm text-content-primary font-semibold">
							리스트 아이템 2
						</Text>
					</View>
					<View
						className="bg-neutral-variant rounded-lg p-3"
						style={shadows.neutral}
					>
						<Text className="text-sm text-content-primary font-semibold">
							리스트 아이템 3
						</Text>
					</View>
				</View>
			</View>

			{/* 비활성화 버튼 */}
			<View className="bg-primary rounded-lg p-4 mb-4 opacity-30">
				<Text className="text-base font-semibold text-content-inverse text-center">
					비활성화 버튼 (opacity 30%)
				</Text>
			</View>

			{/* Danger 상태 */}
			<View className="bg-danger rounded-lg p-4 mb-4">
				<Text className="text-base font-semibold text-white text-center">
					Danger 상태
				</Text>
			</View>

			{/* 폰트 굵기별 예시 */}
			<View className="mb-4">
				<Text className="text-lg font-bold text-content-primary mb-4">
					폰트 굵기 (Pretendard)
				</Text>
				<View className="bg-neutral-variant rounded-lg p-4 space-y-3">
					<Text className="text-base font-regular text-content-primary">
						Regular (400) - 기본 굵기
					</Text>
					<Text className="text-base font-medium text-content-primary">
						Medium (500) - 중간 굵기
					</Text>
					<Text className="text-base font-semibold text-content-primary">
						SemiBold (600) - 세미볼드
					</Text>
					<Text className="text-base font-bold text-content-primary">
						Bold (700) - 볼드
					</Text>
				</View>
			</View>

			{/* 폰트 굵기별 크기 비교 */}
			<View className="mb-4">
				<Text className="text-lg font-bold text-content-primary mb-4">
					폰트 크기별 예시
				</Text>
				<View className="bg-neutral-variant rounded-lg p-4 space-y-2">
					<Text className="text-xs font-regular text-content-secondary">
						text-xs (12px) - Regular
					</Text>
					<Text className="text-sm font-regular text-content-secondary">
						text-sm (14px) - Regular
					</Text>
					<Text className="text-base font-regular text-content-primary">
						text-base (16px) - Regular
					</Text>
					<Text className="text-lg font-medium text-content-primary">
						text-lg (18px) - Medium
					</Text>
					<Text className="text-xl font-semibold text-content-primary">
						text-xl (20px) - SemiBold
					</Text>
					<Text className="text-2xl font-bold text-content-primary">
						text-2xl (24px) - Bold
					</Text>
					<Text className="text-[32px] font-bold text-content-primary">
						text-[32px] - Bold
					</Text>
				</View>
			</View>

			{/* LargeButton 예시 */}
			<View className="items-center mb-4">
				<LargeButton
					title="IT대학 학생회"
					description="IT대학 학생인증 시, 10% 할인"
				/>
			</View>

			{/* SmallButton 예시 */}
			<View className="items-center mb-4">
				<SmallButton>제휴 리뷰 작성하기</SmallButton>
			</View>

			{/* MediumButton 예시 */}
			<View className="items-center mb-12">
				<MediumButton onPress={() => {}}>인증완료</MediumButton>
			</View>
		</ScrollView>
	);
}
