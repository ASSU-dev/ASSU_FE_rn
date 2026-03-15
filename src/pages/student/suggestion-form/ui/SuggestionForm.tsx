import { Ionicons } from "@expo/vector-icons";
import { Controller } from "react-hook-form";
import { Text, View } from "react-native";
import { colorTokens } from "@/shared/styles/tokens";
import { MediumButton } from "@/shared/ui/buttons/SubmitButton";
import {
	FormField,
	FormFieldInput,
	FormFieldLabel,
} from "@/shared/ui/FormField";
import { SUGGESTION_TARGET_ITEMS } from "../model/suggestionTargetItems";
import { useSuggestionForm } from "../model/useSuggestionForm";
import { SuggestionTargetField } from "./SuggestionTargetField";

export function SuggestionForm() {
	const { control, onSubmit, isValid } = useSuggestionForm();

	return (
		<View className="flex-1 justify-between">
			<View className="px-screen-m pt-9">
				{/* 건의대상 */}
				<Controller
					control={control}
					name="target"
					render={({ field, fieldState }) => (
						<SuggestionTargetField
							items={SUGGESTION_TARGET_ITEMS}
							value={field.value || null}
							onChange={(val) => field.onChange(val ?? "")}
							errorText={fieldState.error?.message}
						/>
					)}
				/>

				{/* 제휴 희망 가게 */}
				<FormField
					control={control}
					name="storeName"
					label="제휴 희망 가게"
					placeholder="가게 이름을 입력해주세요"
				/>

				{/* 희망 혜택 */}
				<Controller
					control={control}
					name="desiredBenefit"
					render={({ field, fieldState }) => (
						<View className="mb-3">
							<FormFieldLabel>희망 혜택</FormFieldLabel>
							<FormFieldInput
								appearance="filled"
								multiline
								placeholder="ex ) 식사시 음료제공을 원해요!"
								value={field.value}
								onChangeText={field.onChange}
								onBlur={field.onBlur}
								hasError={Boolean(fieldState.error)}
								fontSize={14}
								inputStyle={{
									minHeight: 134,
									paddingTop: 15,
									paddingBottom: 15,
									lineHeight: 20,
									letterSpacing: 0.25,
								}}
							/>
						</View>
					)}
				/>

				{/* 안내 문구 */}
				<View className="flex-row items-center gap-1">
					<Ionicons
						name="information-circle-outline"
						size={12}
						color={colorTokens.contentSecondary}
					/>
					<Text className="text-[11px] font-regular leading-caption tracking-caption text-content-secondary">
						학부, 학번, 재학여부 등의 개인정보가 건의대상에 제공됩니다
					</Text>
				</View>
			</View>

			{/* 입력 완료 버튼 */}
			<View className="items-center pb-4">
				<MediumButton onPress={onSubmit} disabled={!isValid}>
					입력 완료
				</MediumButton>
			</View>
		</View>
	);
}
