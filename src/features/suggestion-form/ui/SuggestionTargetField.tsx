import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { shadows } from "@/shared/styles/shadows";
import { colorTokens } from "@/shared/styles/tokens";
import type { SelectItem } from "@/shared/ui/select";

type Props = {
	items: SelectItem[];
	value: string | null;
	onChange: (value: string | null) => void;
	errorText?: string;
};

export function SuggestionTargetField({
	items,
	value,
	onChange,
	errorText,
}: Props) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<View className="mb-3">
			<View className="flex-row items-center gap-[50px]">
				<View className="w-[54px] justify-center">
					<Text className="text-[13px] font-regular leading-caption tracking-caption text-content-secondary">
						건의대상
					</Text>
				</View>
				<View className="flex-1">
					<Dropdown
						data={items}
						labelField="label"
						valueField="value"
						placeholder="건의대상 선택"
						value={value}
						onFocus={() => setIsOpen(true)}
						onBlur={() => setIsOpen(false)}
						onChange={(item: SelectItem) => onChange(item?.value ?? null)}
						style={{
							paddingHorizontal: 15,
							paddingVertical: 12,
							borderBottomWidth: 1.5,
							borderBottomColor: colorTokens.primary,
							backgroundColor: colorTokens.canvas,
						}}
						containerStyle={{
							borderRadius: 12,
							overflow: "hidden",
							backgroundColor: colorTokens.canvas,
							...shadows.neutral,
						}}
						itemContainerStyle={{
							paddingHorizontal: 16,
							paddingVertical: 14,
						}}
						renderRightIcon={() => (
							<Ionicons
								name={isOpen ? "chevron-up" : "chevron-down"}
								size={20}
								color={colorTokens.primary}
							/>
						)}
						placeholderStyle={{
							fontFamily: "Pretendard-Medium",
							fontSize: 17,
							color: colorTokens.contentSecondary,
						}}
						selectedTextStyle={{
							fontFamily: "Pretendard-Medium",
							fontSize: 17,
							color: colorTokens.contentPrimary,
						}}
						renderItem={(item: SelectItem) => {
							const isSelected = item.value === value;
							return (
								<View className="flex-row items-center justify-between px-4 py-3">
									<Text
										className={`font-regular text-base ${
											isSelected ? "text-primary" : "text-content-primary"
										}`}
									>
										{item.label}
									</Text>
									{isSelected && (
										<Ionicons
											name="checkmark"
											size={18}
											color={colorTokens.primary}
										/>
									)}
								</View>
							);
						}}
					/>
				</View>
			</View>
			{errorText && (
				<Text className="mt-2 text-xs text-danger font-regular">
					{errorText}
				</Text>
			)}
		</View>
	);
}
