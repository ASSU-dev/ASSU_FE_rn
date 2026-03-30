import { useSubmitInquiry } from "../api/useSubmitInquiry";
import type { InquiryFormData } from "../model/types";
import { colorTokens } from "@/shared/styles/tokens";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Pressable, Text, TextInput, View, ActivityIndicator } from "react-native";
import { useState } from "react";

const schema = z.object({
	title: z.string().min(1, "제목을 작성해주세요"),
	content: z.string().min(1, "문의 내용을 작성해주세요"),
	email: z.string().email("유효한 이메일을 입력해주세요"),
});

interface InquiryFormProps {
	userEmail: string;
	onSubmitHandler?: (handleSubmit: any, onSubmit: any) => void;
}

export function InquiryForm({ userEmail, onSubmitHandler }: InquiryFormProps) {
	const { mutate, isPending } = useSubmitInquiry();
	const [successMessage, setSuccessMessage] = useState("");
	const [focusedField, setFocusedField] = useState<string | null>(null);

	const { control, handleSubmit, reset, formState: { errors } } = useForm<InquiryFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			title: "",
			content: "",
			email: userEmail,
		},
	});

	const onSubmit = (data: InquiryFormData) => {
		mutate(data, {
			onSuccess: () => {
				setSuccessMessage("문의가 등록되었습니다.");
				reset({ title: "", content: "", email: userEmail });
				setTimeout(() => setSuccessMessage(""), 3000);
			},
			onError: () => {
				setSuccessMessage("문의 등록에 실패했습니다. 다시 시도해주세요.");
				setTimeout(() => setSuccessMessage(""), 3000);
			},
		});
	};

	// Expose form methods to parent
	if (onSubmitHandler) {
		onSubmitHandler(handleSubmit, onSubmit);
	}

	const getInputBorderColor = (fieldName: string) => {
		return focusedField === fieldName ? colorTokens.contentPrimary : colorTokens.neutralVariant;
	};

	return (
		<View className="w-full gap-[15px]">
			{/* Title Field */}
			<View className="gap-[5px]">
				<Text className="text-[13px] font-semibold text-content-primary tracking-[-0.32px]">
					제목
				</Text>
				<Controller
					control={control}
					name="title"
					render={({ field: { value, onChange } }) => (
						<TextInput
							value={value}
							onChangeText={onChange}
							onFocus={() => setFocusedField("title")}
							onBlur={() => setFocusedField(null)}
							placeholder="제목을 작성해주세요"
							placeholderTextColor={colorTokens.contentSecondary}
							className="h-[50px] rounded-[7px] px-[15px] py-[15px] text-sm text-content-primary border"
							style={{
								borderColor: getInputBorderColor("title"),
							}}
						/>
					)}
				/>
				{errors.title && (
					<Text className="text-xs text-red-500">{errors.title.message}</Text>
				)}
			</View>

			{/* Content Field */}
			<View className="gap-[5px]">
				<Text className="text-[13px] font-semibold text-content-primary tracking-[-0.32px]">
					문의 내용
				</Text>
				<Controller
					control={control}
					name="content"
					render={({ field: { value, onChange } }) => (
						<TextInput
							value={value}
							onChangeText={onChange}
							onFocus={() => setFocusedField("content")}
							onBlur={() => setFocusedField(null)}
							placeholder="제목을 작성해주세요"
							placeholderTextColor={colorTokens.contentSecondary}
							multiline
							numberOfLines={5}
							className="h-[105px] rounded-[7px] px-[15px] py-[20px] text-sm text-content-primary border"
							textAlignVertical="top"
							style={{
								borderColor: getInputBorderColor("content"),
							}}
						/>
					)}
				/>
				{errors.content && (
					<Text className="text-xs text-red-500">{errors.content.message}</Text>
				)}
			</View>

			{/* Email Field */}
			<View className="gap-[5px]">
				<Text className="text-[13px] font-semibold text-content-primary tracking-[-0.32px]">
					작성자 이메일
				</Text>
				<Controller
					control={control}
					name="email"
					render={({ field: { value, onChange } }) => (
						<TextInput
							value={value}
							onChangeText={onChange}
							onFocus={() => setFocusedField("email")}
							onBlur={() => setFocusedField(null)}
							placeholder="example@gmail.com"
							placeholderTextColor={colorTokens.contentSecondary}
							keyboardType="email-address"
							className="h-[50px] rounded-[7px] px-[15px] py-[15px] text-sm text-content-primary border"
							style={{
								borderColor: getInputBorderColor("email"),
							}}
						/>
					)}
				/>
				{errors.email && (
					<Text className="text-xs text-red-500">{errors.email.message}</Text>
				)}
			</View>

			{/* Info Banner */}
			<View className="bg-neutral px-[7px] py-[10px] rounded-[3px] flex-row items-center gap-1">
				<Text className="text-[11px] text-content-secondary tracking-[-0.32px]">
					문의사항 등록 시 개인정보 수집 및 이용에 동의하는 것으로 간주됩니다.
				</Text>
			</View>


			{/* Success Message */}
			{successMessage && (
				<View className="bg-green-100 px-3 py-2 rounded">
					<Text className="text-sm text-green-700">{successMessage}</Text>
				</View>
			)}
		</View>
	);
}
