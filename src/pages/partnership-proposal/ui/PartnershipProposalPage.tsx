import { router } from "expo-router";
import { useState } from "react";
import { useProposalStore, ProposalInfoStep, ContractUploadStep, ProposalCompleteView } from "@/features/partnership-proposal";
import { PageLayout } from "@/shared/ui/layout";
import { TopBar } from "@/shared/ui/top-bar";

type Step = "step1" | "step2" | "complete";

export function PartnershipProposalPage() {
	const [step, setStep] = useState<Step>("step1");
	const reset = useProposalStore((s) => s.reset);

	if (step === "complete") return <ProposalCompleteView />;

	const handleBack = () => {
		if (step === "step1") router.back();
		else setStep("step1");
	};

	return (
		<PageLayout withTopInset withBottomInset={false} contentContainerClassName="flex-1">
			<TopBar title="제휴 제안서" onBack={handleBack} />
			{step === "step1" && <ProposalInfoStep onNext={() => setStep("step2")} />}
			{step === "step2" && (
				<ContractUploadStep
					onComplete={() => {
						reset();
						setStep("complete");
					}}
				/>
			)}
		</PageLayout>
	);
}
