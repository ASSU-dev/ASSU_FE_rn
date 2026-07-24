import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import { colorTokens } from "@/shared/styles/tokens";
import type { ProposalFormData } from "../../model";
import { useFocusBorder } from "../../model";

interface Props {
	index: number;
}

export function ServiceBenefitFields({ index }: Props) {
	const { control, setValue } = useFormContext<ProposalFormData>();
	const { borderColor, onFocus, onBlur } = useFocusBorder();
	const [showItemInput, setShowItemInput] = useState(false);
	const [itemInput, setItemInput] = useState("");

	const items = useWatch({ control, name: `benefits.${index}.items` });

	const addItem = () => {
		const trimmed = itemInput.trim();
		if (!trimmed || items.includes(trimmed)) return;
		setValue(`benefits.${index}.items`, [...items, trimmed]);
		setItemInput("");
		setShowItemInput(false);
	};

	const removeItem = (idx: number) => {
		setValue(
			`benefits.${index}.items`,
			items.filter((_, i) => i !== idx),
		);
	};

	return (
		<>
			<View
				style={{ height: 0.5, backgroundColor: colorTokens.neutralVariant }}
			/>

			{/* 카테고리 */}
			<View className="gap-[8px]">
				<View className="flex-row items-center gap-[8px]">
					<Text className="text-[13px] text-content-primary">
						카테고리 입력
					</Text>
					<Controller
						control={control}
						name={`benefits.${index}.categories`}
						render={({ field: { value, onChange } }) => (
							<TextInput
								value={value[0] ?? ""}
								onChangeText={(v) => onChange(v ? [v] : [])}
								onFocus={onFocus("category")}
								onBlur={onBlur}
								placeholder="카테고리를 입력해주세요"
								placeholderTextColor={colorTokens.contentSecondary}
								textAlign="center"
								className="flex-1 text-[13px] text-content-primary px-[4px]"
								style={{
									borderBottomWidth: 0.5,
									borderBottomColor: borderColor("category"),
									height: 36,
								}}
							/>
						)}
					/>
				</View>
			</View>

			{/* 제공 항목 */}
			<View className="flex-row items-start gap-[8px]">
				<Text className="w-[77px] text-[13px] text-content-primary mt-[4px]">
					제공 항목
				</Text>
				<View className="flex-1 gap-[8px]">
					<View className="flex-row flex-wrap items-center gap-[6px]">
						{items.map((item, idx) => (
							<Pressable
								key={item}
								onPress={() => removeItem(idx)}
								className="flex-row items-center bg-primary-tint rounded-full px-[8px] py-[4px] gap-[3px]"
							>
								<Text className="text-[11px] text-sub">{item}</Text>
								<Ionicons
									name="close"
									size={10}
									color={colorTokens.primaryOnDark}
								/>
							</Pressable>
						))}
						{!showItemInput && (
							<Pressable
								onPress={() => setShowItemInput(true)}
								className="bg-primary rounded-full px-[10px] py-[4px]"
							>
								<Text className="text-[11px] text-content-inverse">+ 추가</Text>
							</Pressable>
						)}
					</View>
					{showItemInput && (
						<View className="flex-row items-center gap-[8px]">
							<TextInput
								value={itemInput}
								onChangeText={setItemInput}
								onSubmitEditing={addItem}
								onFocus={onFocus("itemInput")}
								onBlur={onBlur}
								placeholder="항목을 입력해주세요"
								placeholderTextColor={colorTokens.contentSecondary}
								returnKeyType="done"
								autoFocus
								className="flex-1 text-[13px] text-content-primary px-[4px]"
								style={{
									borderBottomWidth: 0.5,
									borderBottomColor: borderColor("itemInput"),
									height: 32,
								}}
							/>
							<Pressable onPress={addItem}>
								<Text className="text-[13px] text-primary font-medium">
									추가
								</Text>
							</Pressable>
							<Pressable
								onPress={() => {
									setShowItemInput(false);
									setItemInput("");
								}}
							>
								<Text className="text-[13px] text-content-secondary">취소</Text>
							</Pressable>
						</View>
					)}
				</View>
			</View>
		</>
	);
}
