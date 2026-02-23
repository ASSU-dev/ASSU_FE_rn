import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { shadows } from "@/shared/styles/shadows";
import { colorTokens } from "@/shared/styles/tokens";
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
				// NOTE: react-native-element-dropdown은 item 단위 disabled를 지원하지 않습니다.
				// disabled 항목을 탭하면 내부 selected 상태는 바뀔 수 있으므로,
				// 이 key로 강제 리마운트해서 표시값을 즉시 원복합니다.
				key={`${value ?? "null"}-${disabledTapNonce}`}
				data={items}
				labelField="label"
				valueField="value"
				disable={disabled}
				placeholder={placeholder}
				value={value}
				onFocus={() => setIsOpen(true)}
				onBlur={() => setIsOpen(false)}
				onChange={(item: SelectItem) => {
					// disabled 항목은 선택 무시
					if (item?.disabled) {
						setDisabledTapNonce((n) => n + 1);
						return;
					}
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
				<Text className="mt-2 text-danger font-regular">{errorText}</Text>
			) : helperText ? (
				<Text className="mt-2 text-content-secondary font-regular">
					{helperText}
				</Text>
			) : null}
		</View>
	);
}
