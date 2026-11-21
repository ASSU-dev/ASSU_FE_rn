import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Platform, Pressable, Text, TextInput, View } from "react-native";
import { shadows } from "@/shared/styles/shadows";
import { colorTokens } from "@/shared/styles/tokens";
import type { SelectItem, SelectSize, SelectTextTone } from "./types";

// 펼쳐진 드롭다운 그림자 — shadows.neutral(opacity 0.15)보다 진하게
const OPEN_DROPDOWN_SHADOW = {
	...shadows.neutral,
	shadowOffset: { width: 0, height: 6 },
	shadowOpacity: 0.45,
	shadowRadius: 12,
	elevation: 10, // Android
} as const;

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
	const [triggerHeight, setTriggerHeight] = useState(0);
	const [listHeight, setListHeight] = useState(0);
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
	// iOS는 overflow: hidden이 같은 View의 그림자까지 잘라내므로,
	// 그림자는 바깥 View에, 모서리 클리핑은 안쪽 View에 분리해서 적용한다.
	const triggerRadius = {
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
		borderBottomLeftRadius: isOpen ? 0 : 12,
		borderBottomRightRadius: isOpen ? 0 : 12,
	};

	return (
		<View testID={testID}>
			{!!label && (
				<Text className="mb-2 font-regular text-content-secondary">
					{label}
				</Text>
			)}

			<View className="relative">
				{/* iOS: 배경이 불투명한 View의 그림자는 자기 영역 모양으로만 그려지므로,
				    트리거+옵션 목록을 합친 크기의 그림자 전용 판을 뒤에 깔아 하나의 그림자로 만든다.
				    (각자 그림자를 주면 이음새에서 겹쳐 진해짐) */}
				{isOpen && Platform.OS === "ios" ? (
					<View
						pointerEvents="none"
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							height: triggerHeight + listHeight,
							borderRadius: 12,
							backgroundColor: colorTokens.neutral,
							...OPEN_DROPDOWN_SHADOW,
						}}
					/>
				) : null}
				<View
					onLayout={(e) => setTriggerHeight(e.nativeEvent.layout.height)}
					style={{
						backgroundColor: colorTokens.neutral,
						...triggerRadius,
						...(isOpen && Platform.OS === "android"
							? { elevation: OPEN_DROPDOWN_SHADOW.elevation }
							: null),
					}}
				>
					<View className="overflow-hidden" style={triggerRadius}>
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

					{/* Android: elevation은 자기 영역에만 그려지므로 옵션 목록에 따로 준다 */}
					{isOpen ? (
						<View
							onLayout={(e) => setListHeight(e.nativeEvent.layout.height)}
							className="absolute left-0 right-0 top-full rounded-b-[12px]"
							style={{
								backgroundColor: colorTokens.neutral,
								...(Platform.OS === "android"
									? { elevation: OPEN_DROPDOWN_SHADOW.elevation }
									: null),
							}}
						>
							<View
								className="overflow-hidden rounded-b-[12px]"
								style={{
									borderTopWidth: 2,
									borderTopColor: colorTokens.neutralVariant,
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
						</View>
					) : null}
				</View>
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
