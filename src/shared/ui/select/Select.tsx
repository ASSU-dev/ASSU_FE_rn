import { useMemo } from "react";
import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import type { SelectItem, SelectProps } from "./types";

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

export function Select({
	items,
	value,
	onChange,
	placeholder = "선택",
	disabled = false,
	label,
	helperText,
	errorText,
	size = "md",
	testID,
}: SelectProps) {
	const hasError = Boolean(errorText);
	const sizeToken = SIZES[size];

	const dropdownData = useMemo(() => {
		// react-native-element-dropdown은 disabled key가 없어서
		// item 렌더링/선택 로직에서 직접 처리한다.
		return items;
	}, [items]);

	const selectedItem: SelectItem | null = useMemo(() => {
		if (value == null) return null;
		return items.find((it) => it.value === value) ?? null;
	}, [items, value]);

	return (
		<View testID={testID}>
			{!!label && (
				<Text className="mb-2 font-regular text-content-primary">
					{label}
				</Text>
			)}

			<View
				className={[
					"rounded-xl border bg-canvas",
					hasError ? "border-danger" : "border-neutral-variant",
					disabled ? "opacity-disabled" : "",
				]
					.filter(Boolean)
					.join(" ")}
				style={{
					paddingHorizontal: sizeToken.fieldPx,
					paddingVertical: sizeToken.fieldPy,
				}}
			>
				<Dropdown
					data={dropdownData}
					labelField="label"
					valueField="value"
					disable={disabled}
					placeholder={placeholder}
					value={value}
					onChange={(item: SelectItem) => {
						// disabled 항목은 선택 무시
						if (item?.disabled) return;
						onChange(item?.value ?? null);
					}}
					style={{
						backgroundColor: "transparent",
					}}
					containerStyle={{
						borderRadius: 12,
						overflow: "hidden",
					}}
					itemContainerStyle={{
						paddingHorizontal: 12,
						paddingVertical: 12,
						opacity: 1,
					}}
					activeColor="#E5F6FE"
					placeholderStyle={{
						fontFamily: "Pretendard-Regular",
						fontSize: sizeToken.fontSize,
						color: "#8E9398",
					}}
					selectedTextStyle={{
						fontFamily: selectedItem?.value ? "Pretendard-Regular" : "Pretendard-Regular",
						fontSize: sizeToken.fontSize,
						color: "#040404",
					}}
					renderItem={(item: SelectItem) => {
						return (
							<View
								className="flex-row items-center"
								style={{
									opacity: item.disabled ? 0.4 : 1,
								}}
							>
								<Text
									style={{
										fontFamily: "Pretendard-Regular",
										fontSize: sizeToken.fontSize,
										color: "#040404",
									}}
								>
									{item.label}
								</Text>
							</View>
						);
					}}
				/>
			</View>

			{errorText ? (
				<Text className="mt-2 text-danger font-regular">{errorText}</Text>
			) : helperText ? (
				<Text className="mt-2 text-content-secondary font-regular">
					{helperText}
				</Text>
			) : null}
		</View>
	);
}

