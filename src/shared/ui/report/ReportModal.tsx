import { Text } from "react-native";
import { Dialog } from "@/shared/ui/dialog";
import type { ReportTarget } from "./types";
import type { useReportSteps } from "./useReportSteps";

interface ReportModalConfig {
	targets: readonly { value: string; label: string }[];
	targetWarning: string;
	reasons: (
		target: ReportTarget,
	) => readonly { value: string; label: string }[];
	reasonTitle: (target: ReportTarget) => string;
	doneTitle: (target: ReportTarget) => string;
	doneBody: (target: ReportTarget) => string;
}

interface ReportModalProps {
	state: ReturnType<typeof useReportSteps>;
	config: ReportModalConfig;
}

export function ReportModal({ state, config }: ReportModalProps) {
	const {
		step,
		target,
		reason,
		setTarget,
		setReason,
		close,
		goToReason,
		goToDone,
	} = state;

	return (
		<>
			{/* Step 1 — 신고 대상 선택 */}
			<Dialog visible={step === "select-target"} onDismiss={close}>
				<Dialog.Title>신고하고자 하는 대상을 선택해주세요</Dialog.Title>
				<Dialog.Content>
					<Text className="font-regular text-sm text-content-secondary">
						{config.targetWarning}
					</Text>
					<Dialog.SelectGroup
						value={target}
						onChange={(v) => setTarget(v as ReportTarget)}
					>
						{config.targets.map(({ value, label }) => (
							<Dialog.SelectButton key={value} value={value}>
								{label}
							</Dialog.SelectButton>
						))}
					</Dialog.SelectGroup>
				</Dialog.Content>
				<Dialog.Actions>
					<Dialog.CancelButton onPress={close}>취소</Dialog.CancelButton>
					<Dialog.ConfirmButton onPress={goToReason} disabled={!target}>
						신고하기
					</Dialog.ConfirmButton>
				</Dialog.Actions>
			</Dialog>

			{/* Step 2 — 신고 사유 선택 */}
			<Dialog visible={step === "select-reason"} onDismiss={close}>
				<Dialog.Title>{config.reasonTitle(target)}</Dialog.Title>
				<Dialog.Content>
					<Dialog.RadioGroup value={reason} onChange={setReason}>
						{config.reasons(target).map(({ value, label }) => (
							<Dialog.RadioItem key={value} value={value}>
								{label}
							</Dialog.RadioItem>
						))}
					</Dialog.RadioGroup>
				</Dialog.Content>
				<Dialog.Actions>
					<Dialog.CancelButton onPress={close}>취소</Dialog.CancelButton>
					<Dialog.ConfirmButton onPress={goToDone} disabled={!reason}>
						신고하기
					</Dialog.ConfirmButton>
				</Dialog.Actions>
			</Dialog>

			{/* Step 3 — 신고 완료 */}
			<Dialog visible={step === "done"}>
				<Dialog.Title>{config.doneTitle(target)}</Dialog.Title>
				<Dialog.Content>
					<Text className="font-regular text-sm text-content-secondary">
						{config.doneBody(target)}
					</Text>
				</Dialog.Content>
				<Dialog.Actions>
					<Dialog.ConfirmButton onPress={close}>확인</Dialog.ConfirmButton>
				</Dialog.Actions>
			</Dialog>
		</>
	);
}
