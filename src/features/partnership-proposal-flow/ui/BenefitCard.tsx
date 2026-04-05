import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colorTokens } from "@/shared/styles/tokens";
import type { BenefitCriteria, BenefitItem } from "@/features/partnership-proposal-flow";

interface Props {
	benefit: BenefitItem;
	onRemove: () => void;
	onUpdate: (data: Partial<BenefitItem>) => void;
}

export function BenefitCard({ benefit, onRemove, onUpdate }: Props) {
	const [itemInput, setItemInput] = useState("");

	const selectServiceType = () => {
		Alert.alert("서비스 종류 선택", "", [
			{ text: "서비스 제공", onPress: () => onUpdate({ serviceType: "서비스 제공" }) },
			{ text: "할인", onPress: () => onUpdate({ serviceType: "할인" }) },
			{ text: "증정", onPress: () => onUpdate({ serviceType: "증정" }) },
			{ text: "기타", onPress: () => onUpdate({ serviceType: "기타" }) },
			{ text: "취소", style: "cancel" },
		]);
	};

	const toggleCriteria = (value: BenefitCriteria) => {
		const current = benefit.criteria;
		const next = current.includes(value)
			? current.filter((c) => c !== value)
			: [...current, value];
		onUpdate({ criteria: next });
	};

	const addItem = () => {
		const trimmed = itemInput.trim();
		if (!trimmed) return;
		onUpdate({ items: [...benefit.items, trimmed] });
		setItemInput("");
	};

	return (
		<View className="bg-[#f4f4f5] rounded-lg p-[10px] gap-[15px]">
			<View className="flex-row items-center justify-between">
				<Pressable
					onPress={selectServiceType}
					className="border border-primary rounded-lg px-[10px] py-[5px] flex-row items-center gap-[2px]"
				>
					<Text className="text-primary text-[13px]">{benefit.serviceType}</Text>
					<Ionicons name="chevron-down" size={14} color={colorTokens.primary} />
				</Pressable>
				<Pressable onPress={onRemove}>
					<Text className="text-content-secondary text-[13px]">삭제하기</Text>
				</Pressable>
			</View>

			<View style={{ height: 0.5, backgroundColor: "#e0e0e0" }} />

			<View className="flex-row items-center">
				<Text className="w-[77px] text-[13px] text-content-primary">제공 기준</Text>
				<View className="flex-row gap-[12px]">
					{(["금액", "인원수"] as BenefitCriteria[]).map((option) => {
						const selected = benefit.criteria.includes(option);
						return (
							<Pressable
								key={option}
								onPress={() => toggleCriteria(option)}
								className="flex-row items-center gap-[5px]"
							>
								<View
									style={{
										width: 14,
										height: 14,
										borderRadius: 7,
										borderWidth: 1.5,
										borderColor: selected ? colorTokens.primary : colorTokens.contentSecondary,
										backgroundColor: selected ? colorTokens.primary : "transparent",
									}}
								/>
								<Text className="text-[13px] text-content-primary">{option}</Text>
							</Pressable>
						);
					})}
				</View>
			</View>

			{benefit.criteria.includes("금액") && (
				<View className="flex-row items-center gap-[8px]">
					<TextInput
						value={benefit.amount}
						onChangeText={(v) => onUpdate({ amount: v })}
						placeholder="금액 입력"
						placeholderTextColor={colorTokens.contentSecondary}
						keyboardType="numeric"
						className="flex-1 bg-[#f4f4f5] rounded-[5px] px-[10px] text-[15px] text-content-primary"
						style={{ borderWidth: 0.5, borderColor: "#e0e0e0", height: 36 }}
					/>
					<Text className="text-[13px] text-content-secondary">원 이상일 경우,</Text>
				</View>
			)}

			<View style={{ height: 0.5, backgroundColor: "#e0e0e0" }} />

			<View className="flex-row items-start gap-[8px]">
				<Text className="w-[77px] text-[13px] text-content-primary mt-[8px]">제공 항목</Text>
				<View className="flex-1 gap-[8px]">
					<View className="flex-row gap-[8px]">
						<TextInput
							value={itemInput}
							onChangeText={setItemInput}
							placeholder="항목 입력"
							placeholderTextColor={colorTokens.contentSecondary}
							className="flex-1 text-[13px] text-content-primary px-[10px]"
							style={{ borderWidth: 0.5, borderColor: "#e0e0e0", borderRadius: 5, height: 32 }}
						/>
						<Pressable
							onPress={addItem}
							className="bg-primary rounded-full px-[10px] justify-center"
						>
							<Text className="text-[12px] text-white font-medium">+ 추가</Text>
						</Pressable>
					</View>
					{benefit.items.length > 0 && (
						<View className="flex-row flex-wrap gap-[6px]">
							{benefit.items.map((item, idx) => (
								<View key={idx} className="bg-[#e5f6fe] rounded-full px-[8px] py-[3px]">
									<Text className="text-[11px] text-[#66a4fe]">{item}</Text>
								</View>
							))}
						</View>
					)}
				</View>
			</View>
		</View>
	);
}
