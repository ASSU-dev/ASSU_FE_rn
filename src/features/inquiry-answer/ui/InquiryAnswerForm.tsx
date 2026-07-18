import { useState } from "react";
import {
	ActivityIndicator,
	Pressable,
	Text,
	TextInput,
	View,
} from "react-native";
import { colorTokens } from "@/shared/styles/tokens";
import { useAnswerInquiry } from "../api/useAnswerInquiry";

interface InquiryAnswerFormProps {
	inquiryId: string;
}

export function InquiryAnswerForm({ inquiryId }: InquiryAnswerFormProps) {
	const [answer, setAnswer] = useState("");
	const { mutate, isPending, isError } = useAnswerInquiry(inquiryId);
	const trimmedAnswer = answer.trim();

	const handleSubmit = () => {
		if (!trimmedAnswer) return;
		mutate(trimmedAnswer);
	};

	return (
		<View className="gap-gutter">
			<Text className="text-sm font-medium text-primary">Answer</Text>
			<TextInput
				value={answer}
				onChangeText={setAnswer}
				placeholder="답변 내용을 입력해주세요"
				placeholderTextColor={colorTokens.contentSecondary}
				multiline
				textAlignVertical="top"
				editable={!isPending}
				className="min-h-[120px] rounded-lg border border-neutral-variant p-card-p text-sm text-content-primary"
			/>
			{isError ? (
				<Text className="text-xs text-danger">
					답변 등록에 실패했습니다. 다시 시도해주세요.
				</Text>
			) : null}
			<Pressable
				onPress={handleSubmit}
				disabled={!trimmedAnswer || isPending}
				className="h-[48px] items-center justify-center rounded-lg bg-primary"
				style={{ opacity: !trimmedAnswer || isPending ? 0.6 : 1 }}
			>
				{isPending ? (
					<ActivityIndicator color={colorTokens.contentInverse} />
				) : (
					<Text className="text-md font-semibold text-content-inverse">
						답변 등록
					</Text>
				)}
			</Pressable>
		</View>
	);
}
