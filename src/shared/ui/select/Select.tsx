import { useMemo, useState } from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";

import type { SelectItem, SelectProps } from "./types";
import { colorTokens } from "@/shared/styles/tokens";
import { shadows } from "@/shared/styles/shadows";

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
	const sizeToken = SIZES[size];
	const [isOpen, setIsOpen] = useState(false);

	const dropdownData = useMemo(() => {
		// react-native-element-dropdown은 disabled key가 없어서
		// item 렌더링/선택 로직에서 직접 처리한다.
		return items;
	}, [items]);

	return (
		<View testID={testID}>
			{!!label && (
				<Text className="mb-2 font-regular text-content-primary color-content-secondary">
					{label}
				</Text>
			)}

			<Dropdown
				data={dropdownData}
				labelField="label"
				valueField="value"
				disable={disabled}
				placeholder={placeholder}
				value={value}
				onFocus={() => setIsOpen(true)}
				onBlur={() => setIsOpen(false)}
				onChange={(item: SelectItem) => {
					// disabled 항목은 선택 무시
					if (item?.disabled) return;
					onChange(item?.value ?? null);
				}}
				// NOTE: Dropdown의 `style`은 내부에서 width를 측정하는 컨테이너(View)에 적용됩니다.
				// 따라서 필드 UI(보더/패딩)를 여기로 옮기면, 옵션 리스트 컨테이너 폭도 필드와 동일하게 맞습니다.
				style={{
					...(isOpen
						? {
								borderTopLeftRadius: 12,
								borderTopRightRadius: 12,
								borderBottomLeftRadius: 0,
								borderBottomRightRadius: 0,
								borderBottomWidth: 2,
								borderBottomColor: colorTokens.neutralVariant,
							}
						: {
								borderRadius: 12,
							}),
					backgroundColor: colorTokens.neutral,
					paddingHorizontal: sizeToken.fieldPx,
					paddingVertical: sizeToken.fieldPy,
					opacity: disabled ? 0.3 : 1,
				}}
				containerStyle={{
					marginTop: -2,
					borderBottomLeftRadius: 12,
					borderBottomRightRadius: 12,
					overflow: "hidden",
					backgroundColor: colorTokens.neutral,
					...shadows.neutral,
				}}
				itemContainerStyle={{
					paddingHorizontal: 16,
					paddingVertical: 14,
					opacity: 1,
				}}
				// activeColor={colorTokens.primaryTint}
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

					return (
						<View
							className="flex-row items-center justify-between"
						>
							<Text
								style={{
									fontFamily: "Pretendard-Regular",
									fontSize: sizeToken.fontSize,
									color: isSelected
										? colorTokens.primary
										: colorTokens.contentPrimary,
								}}
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

