import { ActivityIndicator, Text, View } from "react-native";
import { colorTokens } from "@/shared/styles/tokens";
import { useInquiryList } from "../api/useInquiryList";
import { InquiryItem } from "./InquiryItem";

export function InquiryList() {
	const { data, isLoading, isError, error } = useInquiryList();

	if (isLoading) {
		return (
			<View className="flex-1 items-center justify-center">
				<ActivityIndicator color={colorTokens.primary} size="large" />
			</View>
		);
	}

	if (isError) {
		return (
			<View className="flex-1 items-center justify-center gap-2">
				<Text className="text-base font-semibold text-danger">
					문의 목록을 불러오는데 실패했습니다.
				</Text>
				<Text className="text-sm text-content-secondary">
					{error instanceof Error ? error.message : "다시 시도해주세요."}
				</Text>
			</View>
		);
	}

	if (!data || data.length === 0) {
		return (
			<View className="flex-1 items-center justify-center gap-2">
				<Text className="text-base font-semibold text-content-primary">
					문의 내역이 없습니다.
				</Text>
				<Text className="text-sm text-content-secondary">
					문의를 작성해주세요.
				</Text>
			</View>
		);
	}

	return (
		<View className="w-full max-w-[345px]">
			{data.map((inquiry) => (
				<InquiryItem key={inquiry.id} inquiry={inquiry} />
			))}
		</View>
	);
}
