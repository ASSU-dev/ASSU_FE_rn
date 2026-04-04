import { BackArrowIcon } from "@/shared/assets/icons";
import { InquiryForm } from "@/features/inquiry-form";
import { InquiryList } from "./InquiryList";
import { PageLayout } from "@/shared/ui/layout";
import { TabBar } from "@/shared/ui/TabBar";
import { colorTokens } from "@/shared/styles/tokens";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Pressable, Text, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock user data - 실제 auth 시스템 연결은 나중에
const MOCK_USER = {
	email: "user@example.com",
	name: "사용자",
};

const tabs = [
	{ id: "inquiry", label: "문의하기" },
	{ id: "history", label: "문의내역확인" },
];

export function CustomerServicePage() {
	const router = useRouter();
	const user = MOCK_USER; // In production: const { user } = useAuth();
	const [activeTab, setActiveTab] = useState<string>("inquiry");
	const [isPending, setIsPending] = useState(false);
	const formRef = useRef<{ handleSubmit: any; onSubmit: any } | null>(null);

	const handleSubmitButton = () => {
		if (formRef.current) {
			formRef.current.handleSubmit(formRef.current.onSubmit)();
		}
	};

	return (
		<SafeAreaView edges={["top"]} className="flex-1 bg-canvas">
			{/* Header */}
			<View className="flex-row items-center gap-[12px] px-[24px] py-[24px]">
				<Pressable onPress={() => router.back()} className="w-6 h-6">
					<BackArrowIcon width={24} height={24} />
				</Pressable>
				<View className="flex-1 items-center">
					<Text className="text-xl font-semibold text-content-primary">
						고객센터
					</Text>
				</View>
				<View className="w-6" />
			</View>

			{/* Tab Bar */}
			<View className="px-[24px] mb-[24px]">
				<TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
			</View>

			{/* Scrollable Content */}
			<PageLayout
				scrollable
				withTopInset={false}
				contentContainerStyle={{
					paddingHorizontal: 24,
					paddingBottom: 24,
				}}
			>
				{activeTab === "inquiry" && (
					<InquiryForm
						userEmail={user?.email || ""}
						onSubmitHandler={(handleSubmit: any, onSubmit: any) => {
							formRef.current = { handleSubmit, onSubmit };
						}}
					/>
				)}
				{activeTab === "history" && <InquiryList />}
			</PageLayout>

			{/* Fixed Button at Bottom - Only show on inquiry tab */}
			{activeTab === "inquiry" && (
				<SafeAreaView edges={["bottom"]} className="bg-canvas">
					<View className="px-[24px] py-[16px]">
						<Pressable
							onPress={handleSubmitButton}
							disabled={isPending}
							className="w-full h-[56px] rounded-[12px] items-center justify-center"
							style={{
								backgroundColor: colorTokens.primary,
								opacity: isPending ? 0.6 : 1,
							}}
						>
							{isPending ? (
								<ActivityIndicator color="#FFFFFF" />
							) : (
								<Text className="text-[20px] font-bold text-white">작성하기</Text>
							)}
						</Pressable>
					</View>
				</SafeAreaView>
			)}
		</SafeAreaView>
	);
}
