import { useRef, useState } from "react";
import type { SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { InquiryFormData } from "@/features/inquiry-form";
import { InquiryForm } from "@/features/inquiry-form";
import { colorTokens } from "@/shared/styles/tokens";
import { AppTopBar } from "@/shared/ui/app-top-bar";
import { PageLayout } from "@/shared/ui/layout";
import { TabBar } from "@/shared/ui/TabBar";
import { InquiryList } from "./InquiryList";

const tabs = [
	{ id: "inquiry", label: "문의하기" },
	{ id: "history", label: "문의내역확인" },
];

export function CustomerServicePage() {
	const [activeTab, setActiveTab] = useState<string>("inquiry");
	const isPending = false;
	const formRef = useRef<{
		handleSubmit: UseFormHandleSubmit<InquiryFormData>;
		onSubmit: SubmitHandler<InquiryFormData>;
	} | null>(null);

	const handleSubmitButton = () => {
		if (formRef.current) {
			formRef.current.handleSubmit(formRef.current.onSubmit)();
		}
	};

	return (
		<SafeAreaView edges={["top"]} className="flex-1 bg-canvas">
			<AppTopBar title="고객센터" />

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
						userEmail=""
						onSubmitHandler={(handleSubmit, onSubmit) => {
							formRef.current = { handleSubmit, onSubmit };
						}}
						onSuccess={() => setActiveTab("history")}
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
								<ActivityIndicator color={colorTokens.contentInverse} />
							) : (
								<Text className="text-[20px] font-bold text-content-inverse">
									작성하기
								</Text>
							)}
						</Pressable>
					</View>
				</SafeAreaView>
			)}
		</SafeAreaView>
	);
}
