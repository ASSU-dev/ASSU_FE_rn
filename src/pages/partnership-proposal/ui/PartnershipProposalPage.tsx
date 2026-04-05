import { useState } from "react";
import { useProposalStore, Step1View, Step2View, CompleteView } from "@/features/partnership-proposal-flow";

type Step = "step1" | "step2" | "complete";

export function PartnershipProposalPage() {
	const [step, setStep] = useState<Step>("step1");
	const reset = useProposalStore((s) => s.reset);

	if (step === "step1") {
		return <Step1View onNext={() => setStep("step2")} />;
	}

	if (step === "step2") {
		return (
			<Step2View
				onBack={() => setStep("step1")}
				onComplete={() => {
					reset();
					setStep("complete");
				}}
			/>
		);
	}

	return <CompleteView />;
}
