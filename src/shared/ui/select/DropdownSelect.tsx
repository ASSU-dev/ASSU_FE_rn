import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { shadows } from "@/shared/styles/shadows";
import { colorTokens } from "@/shared/styles/tokens";
import type { SelectItem, SelectSize } from "./types";

const SIZES = {
	sm: {
		fieldPx: 12,
		fieldPy: 10,
		fontSize: 14,
	},
	md: {
		fieldPx: 12,
		fieldPy: 12,
		fontSize: 16,
	},
} as const;

type DropdownSelectProps = {
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
	testID?: string;
};

export function DropdownSelect({
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
	testID,
}: DropdownSelectProps) {
	const sizeToken = SIZES[size];
	const [isOpen, setIsOpen] = useState(false);
	const [disabledTapNonce, setDisabledTapNonce] = useState(0);

	return (
		<View testID={testID}>
			{!!label && (
				<Text className="mb-2 font-regular text-content-secondary">
					{label}
				</Text>
			)}

			<Dropdown
				key={`${value ?? "null"}-${disabledTapNonce}`}
				data={items}
				labelField="label"
				valueField="value"
				disable={disabled || readOnly}
				placeholder={placeholder}
				value={value}
				onFocus={() => setIsOpen(true)}
				onBlur={() => setIsOpen(false)}
				onChange={(item: SelectItem) => {
					if (item?.disabled) {
						setDisabledTapNonce((n) => n + 1);
						return;
					}
					onChange(item?.value ?? null);
				}}
				style={{
					...(isOpen
						? {
								borderTopLeftRadius: 12,
								borderTopRightRadius: 12,
								borderBottomLeftRadius: 0,
								borderBottomRightRadius: 0,
								borderBottomColor: colorTokens.neutralVariant,
							}
						: {
								borderRadius: 12,
								borderBottomColor: "transparent",
							}),
					borderBottomWidth: 2,
					backgroundColor: colorTokens.canvas,
					paddingHorizontal: sizeToken.fieldPx,
					paddingVertical: sizeToken.fieldPy,
					opacity: disabled ? 0.3 : 1,
				}}
				containerStyle={{
					marginTop: -2,
					borderBottomLeftRadius: 12,
					borderBottomRightRadius: 12,
					overflow: "hidden",
					backgroundColor: colorTokens.canvas,
					...shadows.neutral,
				}}
				itemContainerStyle={{
					paddingHorizontal: 16,
					paddingVertical: 14,
					opacity: 1,
				}}
				renderRightIcon={() => (
					<Ionicons
						name={isOpen ? "chevron-up" : "chevron-down"}
						size={20}
						color={colorTokens.contentPrimary}
					/>
				)}
				placeholderStyle={{
					fontFamily: "Pretendard-Regular",
					fontSize: sizeToken.fontSize,
					color: colorTokens.contentSecondary,
				}}
				selectedTextStyle={{
					fontFamily: "Pretendard-Regular",
					fontSize: sizeToken.fontSize,
					color: colorTokens.contentPrimary,
				}}
				renderItem={(item: SelectItem) => {
					const isSelected = item.value === value;
					const isDisabled = Boolean(item.disabled);

					return (
						<View
							className="flex-row items-center justify-between"
							style={{ opacity: isDisabled ? 0.4 : 1 }}
						>
							<Text
								className={`font-regular ${
									isDisabled
										? "text-content-secondary"
										: isSelected
											? "text-primary"
											: "text-content-primary"
								}`}
								style={{ fontSize: sizeToken.fontSize }}
							>
								{item.label}
							</Text>

							{isDisabled ? (
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
							) : null}
						</View>
					);
				}}
			/>

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
