import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Alert, KeyboardAvoidingView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	ContractUploadStep,
	ProposalCompleteView,
	type ProposalFormData,
	ProposalInfoStep,
	proposalSchema,
	toManualPartnershipRequest,
	useCreateManualPartnership,
} from "@/features/partnership-proposal";
import { getApiErrorMessage } from "@/shared/api";
import { AppTopBar } from "@/shared/ui/app-top-bar";

type Step = "step1" | "step2" | "complete";

export function PartnershipProposalPage() {
	const [step, setStep] = useState<Step>("step1");
	const [contractId, setContractId] = useState<string | null>(null);
	const createManualPartnership = useCreateManualPartnership();

	const methods = useForm<ProposalFormData>({
		defaultValues: {
			selectedPlace: null,
			storeDetailAddress: "",
			benefits: [],
			startDate: null,
			endDate: null,
			contractFile: null,
		},
		resolver: zodResolver(proposalSchema),
	});

	// 완료 화면은 자체 레이아웃(PageLayout + X버튼)을 가지므로 별도 렌더
	if (step === "complete" && contractId)
		return <ProposalCompleteView contractId={contractId} />;

	const handleBack = () => {
		if (step === "step1") router.back();
		else setStep("step1");
	};

	const handleSubmit = methods.handleSubmit(async (form) => {
		if (!form.contractFile) return;

		try {
			const result = await createManualPartnership.mutateAsync({
				request: toManualPartnershipRequest(form),
				contractFile: form.contractFile,
			});
			setContractId(String(result.partnership.partnershipId));
			setStep("complete");
		} catch (error) {
			Alert.alert(
				"등록 실패",
				getApiErrorMessage(error, "제휴 등록에 실패했습니다."),
			);
		}
	});

	return (
		<FormProvider {...methods}>
			<SafeAreaView edges={["top"]} className="flex-1 bg-canvas">
				<KeyboardAvoidingView className="flex-1" behavior="padding">
					<AppTopBar title="제휴 제안서" onBack={handleBack} />
					{/* 스텝 인디케이터 */}
					<View className="flex-row px-[24px] gap-[6px] pb-3">
						<View className="h-[3px] flex-1 rounded-full bg-primary" />
						<View
							className={`h-[3px] flex-1 rounded-full ${step === "step2" ? "bg-primary" : "bg-neutral"}`}
						/>
					</View>
					{step === "step1" && (
						<ProposalInfoStep onNext={() => setStep("step2")} />
					)}
					{step === "step2" && (
						<ContractUploadStep
							onComplete={handleSubmit}
							isSubmitting={createManualPartnership.isPending}
						/>
					)}
				</KeyboardAvoidingView>
			</SafeAreaView>
		</FormProvider>
	);
}
