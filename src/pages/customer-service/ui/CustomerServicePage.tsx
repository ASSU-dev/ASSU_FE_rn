import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import type { SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { inquiryQueryKeys } from "@/entities/inquiry";
import type { InquiryFormData } from "@/features/inquiry-form";
import { InquiryForm } from "@/features/inquiry-form";
import { colorTokens } from "@/shared/styles/tokens";
import { AppTopBar } from "@/shared/ui/app-top-bar";
import { Dialog } from "@/shared/ui/dialog";
import { PageLayout } from "@/shared/ui/layout";
import { TabBar } from "@/shared/ui/TabBar";
import { InquiryList } from "./InquiryList";

const tabs = [
	{ id: "inquiry", label: "문의하기" },
	{ id: "history", label: "문의내역확인" },
];

export function CustomerServicePage() {
	const [activeTab, setActiveTab] = useState<string>("inquiry");
	const queryClient = useQueryClient();
	const [isPending, setIsPending] = useState(false);
	const [isCompleteDialogVisible, setIsCompleteDialogVisible] = useState(false);
	const formRef = useRef<{
		handleSubmit: UseFormHandleSubmit<InquiryFormData>;
		onSubmit: SubmitHandler<InquiryFormData>;
	} | null>(null);

	// 탭을 누를 때마다 문의 목록을 갱신한다.
	// 보고 있는 목록은 즉시 재요청되고, 아직 마운트 전이면 stale 처리되어 마운트 시 재요청된다.
	const handleTabChange = (tabId: string) => {
		setActiveTab(tabId);
		queryClient.invalidateQueries({ queryKey: inquiryQueryKeys.all });
	};

	const handleSubmitButton = () => {
		if (isPending) return;
		if (formRef.current) {
			formRef.current.handleSubmit(formRef.current.onSubmit)();
		}
	};

	// 완료 모달의 확인을 누르면 문의내역 탭으로 이동한다
	const handleCompleteConfirm = () => {
		setIsCompleteDialogVisible(false);
		handleTabChange("history");
	};

	return (
		<SafeAreaView edges={["top"]} className="flex-1 bg-canvas">
			<AppTopBar title="고객센터" />

			{/* Tab Bar */}
			<View className="px-[24px] mb-[24px]">
				<TabBar
					tabs={tabs}
					activeTab={activeTab}
					onTabChange={handleTabChange}
				/>
			</View>

			{/* Scrollable Content */}
			<PageLayout
				scrollable
				keyboardAware
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
						onSuccess={() => setIsCompleteDialogVisible(true)}
						onPendingChange={setIsPending}
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
							<Text className="text-[20px] font-bold text-content-inverse">
								{isPending ? "로딩 중..." : "작성하기"}
							</Text>
						</Pressable>
					</View>
				</SafeAreaView>
			)}

			<Dialog visible={isCompleteDialogVisible}>
				<Dialog.Title>문의가 등록되었습니다!</Dialog.Title>
				<Dialog.Content>
					<Text className="font-regular text-sm text-content-secondary">
						등록한 문의는 문의내역확인에서 확인할 수 있습니다.
					</Text>
				</Dialog.Content>
				<Dialog.Actions>
					<Dialog.ConfirmButton onPress={handleCompleteConfirm}>
						확인
					</Dialog.ConfirmButton>
				</Dialog.Actions>
			</Dialog>
		</SafeAreaView>
	);
}
