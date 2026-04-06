import { Text } from "react-native";
import { Dialog } from "@/shared/ui/dialog";
import { REPORT_REASONS } from "../model/constants";
import type { ReportTarget } from "../model/types";
import type { useReportSuggestion } from "../model/useReportSuggestion";

type ReportSuggestionState = ReturnType<typeof useReportSuggestion>;

interface ReportSuggestionDialogProps {
	state: ReportSuggestionState;
}

export function ReportSuggestionDialog({ state }: ReportSuggestionDialogProps) {
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

	const reasonTitle =
		target === "user"
			? "사용자를 신고하는 사유를 선택해주세요"
			: "글을 신고하는 사유를 선택해주세요";

	const doneTitle =
		target === "user"
			? "제휴를 건의한 사용자의 신고가\n완료되었습니다!"
			: "제휴 건의 글의 신고가 완료되었습니다!";

	const doneBody =
		target === "user"
			? "신고 직후 해당 사용자가 작성한 모든 제휴건의글은 비공개 처리되며, 해당 사실이 작성자에게 고지되지 않습니다."
			: "신고 직후 해당 글은 비공개 처리되며, 해당 사실이 작성자에게 고지되지 않습니다.";

	return (
		<>
			{/* Step 1 — 신고 대상 선택 */}
			<Dialog visible={step === "select-target"} onDismiss={close}>
				<Dialog.Title>신고하고자 하는 대상을 선택해주세요</Dialog.Title>
				<Dialog.Content>
					<Text className="font-regular text-sm text-content-secondary">
						사용자를 신고할 경우 해당 사용자가 작성한 모든 건의글이 삭제됩니다
					</Text>
					<Dialog.SelectGroup
						value={target}
						onChange={(v) => setTarget(v as ReportTarget)}
					>
						<Dialog.SelectButton value="user">
							제휴 건의 사용자
						</Dialog.SelectButton>
						<Dialog.SelectButton value="post">제휴 건의 글</Dialog.SelectButton>
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
				<Dialog.Title>{reasonTitle}</Dialog.Title>
				<Dialog.Content>
					<Dialog.RadioGroup value={reason} onChange={setReason}>
						{REPORT_REASONS.map(({ value, label }) => (
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
				<Dialog.Title>{doneTitle}</Dialog.Title>
				<Dialog.Content>
					<Text className="font-regular text-sm text-content-secondary">
						{doneBody}
					</Text>
				</Dialog.Content>
				<Dialog.Actions>
					<Dialog.ConfirmButton onPress={close}>확인</Dialog.ConfirmButton>
				</Dialog.Actions>
			</Dialog>
		</>
	);
}
