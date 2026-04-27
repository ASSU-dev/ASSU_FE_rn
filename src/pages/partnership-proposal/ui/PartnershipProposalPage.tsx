import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
	ContractUploadStep,
	ProposalCompleteView,
	type ProposalFormData,
	ProposalInfoStep,
	proposalSchema,
} from "@/features/partnership-proposal";
import { AppTopBar } from "@/shared/ui/app-top-bar";
import { PageLayout } from "@/shared/ui/layout";

type Step = "step1" | "step2" | "complete";

export function PartnershipProposalPage() {
	const [step, setStep] = useState<Step>("step1");

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
	if (step === "complete") return <ProposalCompleteView />;

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
						onComplete={methods.handleSubmit(() => setStep("complete"))}
					/>
				)}
			</PageLayout>
		</FormProvider>
	);
}
