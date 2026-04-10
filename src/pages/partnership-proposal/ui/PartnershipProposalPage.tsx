import {
	ContractUploadStep,
	ProposalCompleteView,
	type ProposalFormData,
	ProposalInfoStep,
	proposalSchema,
} from "@/features/partnership-proposal";
import { AppTopBar } from "@/shared/ui/app-top-bar";
import { PageLayout } from "@/shared/ui/layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

type Step = "step1" | "step2" | "complete";

export function PartnershipProposalPage() {
	const [step, setStep] = useState<Step>("step1");
	// [TEST] 목 데이터 — API 연동 시 제출 후 서버에서 받은 실제 계약서 ID로 교체
	const [contractId, setContractId] = useState<string>("1");

	const methods = useForm<ProposalFormData>({
		defaultValues: {
			companyName: "",
			proposerName: "",
			benefits: [],
			startDate: null,
			endDate: null,
			contractFile: null,
		},
		resolver: zodResolver(proposalSchema),
	});

	// 완료 화면은 자체 레이아웃(PageLayout + X버튼)을 가지므로 별도 렌더
	if (step === "complete") return <ProposalCompleteView contractId={contractId} />;

	const handleBack = () => {
		if (step === "step1") router.back();
		else setStep("step1");
	};

	return (
		<FormProvider {...methods}>
			<PageLayout
				withTopInset
				withBottomInset={false}
				contentContainerClassName="flex-1"
			>
				<AppTopBar title="제휴 제안서" onBack={handleBack} />
				{step === "step1" && (
					<ProposalInfoStep onNext={() => setStep("step2")} />
				)}
				{step === "step2" && (
					<ContractUploadStep
						onComplete={methods.handleSubmit(() => {
							// [TEST] 목 데이터 — API 연동 시: setContractId(response.id)
							setContractId("1");
							setStep("complete");
						})}
					/>
				)}
			</PageLayout>
		</FormProvider>
	);
}
