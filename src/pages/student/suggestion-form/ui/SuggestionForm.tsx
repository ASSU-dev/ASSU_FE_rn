import { Ionicons } from "@expo/vector-icons";
import { Controller } from "react-hook-form";
import { Text, View } from "react-native";

import { useSuggestionAdmins } from "@/entities/suggestion";
import { colorTokens } from "@/shared/styles/tokens";
import { MediumButton } from "@/shared/ui/buttons/SubmitButton";
import { FormField } from "@/shared/ui/FormField";
import { Select } from "@/shared/ui/select";
import { useSuggestionForm } from "../model";

export function SuggestionForm() {
	const { control, onSubmit, isValid } = useSuggestionForm();
	const { data: targetItems = [] } = useSuggestionAdmins();

	return (
		<View className="flex-1 justify-between">
			<View className="px-screen-m pt-8">
				{/* 건의대상 */}
				<Controller
					control={control}
					name="target"
					rules={{ required: "건의 대상을 선택해주세요." }}
					render={({ field, fieldState }) => (
						<View className="flex-row items-center gap-[50px] mb-4">
							<View className="w-[54px] justify-center">
								<Text className="text-sm font-regular leading-caption tracking-caption text-content-secondary">
									건의대상
								</Text>
							</View>
							<View className="flex-1">
								<Select
									items={targetItems}
									value={field.value || null}
									onChange={(val) => field.onChange(val ?? "")}
									placeholder="건의대상 선택"
									errorText={fieldState.error?.message}
								/>
							</View>
						</View>
					)}
				/>

				{/* 제휴 희망 가게 */}
				<FormField
					control={control}
					name="storeName"
					label="제휴 희망 가게"
					placeholder="가게 이름을 입력해주세요"
					rules={{
						required: "가게 이름을 입력해주세요.",
						validate: (value: string) =>
							!!value.trim() || "공백만으로는 입력할 수 없습니다.",
					}}
				/>

				{/* 희망 혜택 */}
				<FormField
					control={control}
					name="desiredBenefit"
					label="희망 혜택"
					placeholder="ex ) 식사시 음료제공을 원해요!"
					rules={{
						required: "희망 혜택을 입력해주세요.",
						validate: (value: string) =>
							!!value.trim() || "공백만으로는 입력할 수 없습니다.",
					}}
					multiline
					fontSize={14}
					inputStyle={{
						minHeight: 134,
						paddingTop: 15,
						paddingBottom: 15,
						lineHeight: 20,
						letterSpacing: 0.25,
					}}
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
			<View className="items-center pb-4 px-screen-m">
				<MediumButton onPress={onSubmit} disabled={!isValid}>
					입력 완료
				</MediumButton>
			</View>
		</View>
	);
}
