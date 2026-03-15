import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { postSuggestion } from "../api/postSuggestion";

export type SuggestionFormValues = {
	target: string;
	storeName: string;
	desiredBenefit: string;
};

export function useSuggestionForm() {
	const {
		control,
		handleSubmit,
		formState: { isValid },
	} = useForm<SuggestionFormValues>({
		defaultValues: { target: "", storeName: "", desiredBenefit: "" },
		mode: "onChange",
	});

	const { mutate } = useMutation({
		mutationFn: postSuggestion,
		onSuccess: () => router.back(),
		// TODO: API 연동 시 에러 핸들링 추가 (예: 토스트 메시지)
	});

	const onSubmit = handleSubmit((formValues) => mutate(formValues));

	return { control, onSubmit, isValid };
}
