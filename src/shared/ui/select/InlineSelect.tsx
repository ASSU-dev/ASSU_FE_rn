import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { shadows } from "@/shared/styles/shadows";
import { colorTokens } from "@/shared/styles/tokens";
import type { SelectItem, SelectSize, SelectTextTone } from "./types";

const SIZES = {
	sm: {
		fontSize: 14,
	},
	md: {
		fontSize: 16,
	},
} as const;

type InlineSelectProps = {
	items: SelectItem[];
	value: string | null;
	onChange: (value: string | null) => void;
	placeholder: string;
	disabled: boolean;
	readOnly: boolean;
	label?: string;
	helperText?: string;
	errorText?: string;
	size: SelectSize;
	onOpenChange?: (isOpen: boolean) => void;
	placeholderTone?: SelectTextTone;
	optionTone?: SelectTextTone;
	testID?: string;
};

export function InlineSelect({
	items,
	value,
	onChange,
	placeholder,
	disabled,
	readOnly,
	label,
	helperText,
	errorText,
	size,
	onOpenChange,
	placeholderTone = "muted",
	optionTone = "muted",
	testID,
}: InlineSelectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const sizeToken = SIZES[size];
	const selectedItem = useMemo(
		() => items.find((item) => item.value === value) ?? null,
		[items, value],
	);
	const getToneClassName = (tone: SelectTextTone) =>
		tone === "default" ? "text-content-primary" : "text-content-secondary";
	const toggleDropdown = () => {
		const nextIsOpen = !isOpen;

		if (nextIsOpen) {
			TextInput.State.blurTextInput(TextInput.State.currentlyFocusedInput());
		}

		setIsOpen(nextIsOpen);
		onOpenChange?.(nextIsOpen);
	};
	const closeDropdown = () => {
		setIsOpen(false);
		onOpenChange?.(false);
	};

	return (
		<View testID={testID}>
			{!!label && (
				<Text className="mb-2 font-regular text-content-secondary">
					{label}
				</Text>
			)}

			<View className="relative">
				<View
					className="overflow-hidden"
					style={{
						backgroundColor: colorTokens.neutral,
						borderTopLeftRadius: 12,
						borderTopRightRadius: 12,
						borderBottomLeftRadius: isOpen ? 0 : 12,
						borderBottomRightRadius: isOpen ? 0 : 12,
						...shadows.neutral,
					}}
				>
					<Pressable
						disabled={disabled || readOnly}
						onPress={toggleDropdown}
						className="flex-row items-center justify-between px-[12px] py-[12px]"
						style={{
							opacity: disabled ? 0.3 : 1,
						}}
					>
						<Text
							className={`font-regular ${
								selectedItem
									? "text-content-primary"
									: getToneClassName(placeholderTone)
							}`}
							style={{ fontSize: sizeToken.fontSize }}
						>
							{selectedItem?.label ?? placeholder}
						</Text>
						<Ionicons
							name={isOpen ? "chevron-up" : "chevron-down"}
							size={20}
							color={colorTokens.contentPrimary}
						/>
					</Pressable>
				</View>

				{isOpen ? (
					<View
						className="absolute left-0 right-0 top-full overflow-hidden rounded-b-[12px]"
						style={{
							backgroundColor: colorTokens.neutral,
							borderTopWidth: 2,
							borderTopColor: colorTokens.neutralVariant,
							...shadows.neutral,
						}}
					>
						{items.map((item, index) => {
							const isSelected = item.value === value;
							const isLast = index === items.length - 1;

							return (
								<Pressable
									key={item.value}
									disabled={item.disabled}
									onPress={() => {
										if (item.disabled) {
											return;
										}
										onChange(item.value);
										closeDropdown();
									}}
									className="flex-row items-center justify-between px-[16px] py-[14px]"
									style={{
										borderBottomWidth: isLast ? 0 : 0.5,
										borderBottomColor: colorTokens.neutralVariant,
										opacity: item.disabled ? 0.4 : 1,
									}}
								>
									<Text
										className={`font-regular ${
											item.disabled
												? getToneClassName(optionTone)
												: isSelected
													? "text-primary"
													: getToneClassName(optionTone)
										}`}
										style={{ fontSize: sizeToken.fontSize }}
									>
										{item.label}
									</Text>

									{item.disabled ? (
										<Ionicons
											name="lock-closed"
											size={18}
											color={colorTokens.contentSecondary}
										/>
									) : isSelected ? (
										<Ionicons
											name="checkmark"
											size={18}
											color={colorTokens.primary}
										/>
									) : (
										<View className="w-[18px]" />
									)}
								</Pressable>
							);
						})}
					</View>
				) : null}
			</View>

			{errorText ? (
				<Text className="mt-2 font-regular text-danger">{errorText}</Text>
			) : helperText ? (
				<Text className="mt-2 font-regular text-content-secondary">
					{helperText}
				</Text>
			) : null}
		</View>
	);
}
