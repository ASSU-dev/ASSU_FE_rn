// 제휴 건의 섹션 — "받고싶은 제휴혜택이 없나요?" 배너와 제휴 건의하기 버튼을 포함
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export function SuggestionSection() {
	return (
		<View className="gap-[7px]">
			<View className="bg-primary-tint px-screen-m py-3">
				<Text className="font-regular text-sm text-primary leading-caption tracking-caption">
					받고싶은 제휴 혜택이 없나요?
				</Text>
				<Text className="font-medium text-sm text-content-primary leading-body tracking-body">
					제휴건의함에서 받고싶은 제휴를 건의할 수 있어요!
				</Text>
			</View>
			<View className="mx-screen-m bg-canvas px-gutter py-[18px] gap-card-p">
				<View className="gap-card-p">
					<Text className="font-semibold text-[25px] text-content-primary leading-caption tracking-caption">
						제휴 건의함
					</Text>
					<View>
						<Text className="font-regular text-sm text-content-secondary leading-body tracking-body">
							{"• 받고싶은 제휴 가게가 있다면 어디든!"}
						</Text>
						<Text className="font-regular text-sm text-content-secondary leading-body tracking-body">
							{"• 제휴 건의 대상을 선택해주세요!"}
						</Text>
					</View>
				</View>
				<Pressable
					className="bg-primary py-card-p rounded-[12px] items-center"
					onPress={() => router.push("/(protected)/(student)/suggestion-form")}
				>
					<Text className="font-bold text-lg text-content-inverse leading-body tracking-body">
						제휴 건의하기
					</Text>
				</Pressable>
			</View>
		</View>
	);
}
