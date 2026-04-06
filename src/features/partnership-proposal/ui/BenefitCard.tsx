import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CheckIcon, CheckGrayIcon } from "@/shared/assets/icons";
import { colorTokens } from "@/shared/styles/tokens";
import { SERVICE_TYPES, type BenefitCriteria, type BenefitItem, type ServiceType } from "../model";

interface Props {
	benefit: BenefitItem;
	onRemove: () => void;
	onUpdate: (data: Partial<BenefitItem>) => void;
}

export function BenefitCard({ benefit, onRemove, onUpdate }: Props) {
	const [showItemInput, setShowItemInput] = useState(false);
	const [itemInput, setItemInput] = useState("");
	const [focusedField, setFocusedField] = useState<string | null>(null);
	const [showServiceTypeMenu, setShowServiceTypeMenu] = useState(false);

	const borderColor = (field: string) =>
		focusedField === field ? colorTokens.primary : "#e0e0e0";

	const selectServiceType = (type: ServiceType) => {
		// 서비스 타입 변경 시 관련 값 전부 초기화
		onUpdate({
			serviceType: type,
			criteria: "금액",
			amount: "",
			minCount: "",
			categories: [],
			items: [],
			discountRate: "",
			content: "",
		});
		setShowServiceTypeMenu(false);
	};

	const selectCriteria = (value: BenefitCriteria) => {
		// 기준 변경 시 금액/인원수 초기화
		onUpdate({ criteria: value, amount: "", minCount: "" });
	};

	const removeCategory = (idx: number) => {
		onUpdate({ categories: benefit.categories.filter((_, i) => i !== idx) });
	};

	const addItem = () => {
		const trimmed = itemInput.trim();
		if (!trimmed) return;
		onUpdate({ items: [...benefit.items, trimmed] });
		setItemInput("");
		setShowItemInput(false);
	};

	const removeItem = (idx: number) => {
		onUpdate({ items: benefit.items.filter((_, i) => i !== idx) });
	};

	return (
		<View className="bg-[#f4f4f5] rounded-lg p-[10px] gap-[15px]">
			{/* 헤더 */}
			<View className="flex-row items-center justify-between">
				<View>
					<Pressable
						onPress={() => setShowServiceTypeMenu((v) => !v)}
						className="border border-primary rounded-lg px-[10px] py-[10px] flex-row items-center gap-[2px]"
					>
						<Text className="text-primary text-[13px]">{benefit.serviceType}</Text>
						<Ionicons name="chevron-down" size={14} color={colorTokens.primary} />
					</Pressable>
					{showServiceTypeMenu && (
						<View className="absolute top-[42px] left-0 z-10 bg-white rounded-lg shadow-md border border-[#e0e0e0] overflow-hidden">
							{SERVICE_TYPES.map((type) => (
								<Pressable
									key={type}
									onPress={() => selectServiceType(type)}
									className="px-[14px] py-[10px]"
								>
									<Text className={`text-[13px] ${benefit.serviceType === type ? "text-primary font-medium" : "text-content-primary"}`}>
										{type}
									</Text>
								</Pressable>
							))}
						</View>
					)}
				</View>
				<Pressable onPress={onRemove}>
					<Text className="text-content-secondary text-[13px]">삭제하기</Text>
				</Pressable>
			</View>

			<View style={{ height: 0.5, backgroundColor: "#e0e0e0" }} />

			{benefit.serviceType === "기타 혜택" ? (
				/* 기타 혜택: 제휴 내용 입력 */
				<View className="gap-[8px] py-[5px]">
					<Text className="text-[15px] text-content-primary">제휴 내용 입력</Text>
					<TextInput
						value={benefit.content}
						onChangeText={(v) => onUpdate({ content: v })}
						onFocus={() => setFocusedField("content")}
						onBlur={() => setFocusedField(null)}
						placeholder="제휴 내용을 입력해주세요"
						placeholderTextColor={colorTokens.contentSecondary}
						className="text-[15px] text-content-primary px-[4px]"
						style={{ borderBottomWidth: 1, borderBottomColor: borderColor("content"), height: 36 }}
					/>
				</View>
			) : (
				<>
					{/* 제공 기준 */}
					<View className="flex-row items-center">
						<Text className="w-[77px] text-[13px] text-content-primary">제공 기준</Text>
						<View className="flex-row gap-[12px]">
							{(["금액", "인원수"] as BenefitCriteria[]).map((option) => {
								const selected = benefit.criteria === option;
								return (
									<Pressable
										key={option}
										onPress={() => selectCriteria(option)}
										className="flex-row items-center gap-[5px]"
									>
										{selected ? <CheckIcon width={15} height={15} /> : <CheckGrayIcon width={15} height={15} />}
										<Text className="text-[13px] text-content-primary">{option}</Text>
									</Pressable>
								);
							})}
						</View>
					</View>

					{/* 기준 입력 */}
					{benefit.criteria === "금액" && (
						<View className="flex-row items-center gap-[8px]">
							<View className="w-[77px]" />
							<TextInput
								value={benefit.amount ? benefit.amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}
								onChangeText={(v) => onUpdate({ amount: v.replace(/,/g, "") })}
								onFocus={() => setFocusedField("amount")}
								onBlur={() => setFocusedField(null)}
								placeholder="금액 입력"
								placeholderTextColor={colorTokens.contentSecondary}
								keyboardType="numeric"
								textAlign="right"
								className="flex-1 text-[15px] text-content-primary px-[4px]"
								style={{ borderBottomWidth: 0.5, borderBottomColor: borderColor("amount"), height: 36 }}
							/>
							<Text className="text-[13px] text-content-secondary w-[88px]">원 이상일 경우,</Text>
						</View>
					)}

					{benefit.criteria === "인원수" && (
						<View className="flex-row items-center gap-[8px]">
							<View className="w-[77px]" />
							<TextInput
								value={benefit.minCount}
								onChangeText={(v) => onUpdate({ minCount: v })}
								onFocus={() => setFocusedField("minCount")}
								onBlur={() => setFocusedField(null)}
								placeholder="인원 입력"
								placeholderTextColor={colorTokens.contentSecondary}
								keyboardType="numeric"
								textAlign="right"
								className="flex-1 text-[15px] text-content-primary px-[4px]"
								style={{ borderBottomWidth: 0.5, borderBottomColor: borderColor("minCount"), height: 36 }}
							/>
							<Text className="text-[13px] text-content-secondary w-[88px]">인 이상일 경우,</Text>
						</View>
					)}

					{/* 카테고리 / 할인율 */}
					{benefit.serviceType === "할인 혜택" ? (
						<View className="flex-row items-center gap-[8px]">
							<Text className="w-[77px] text-[13px] text-content-primary">할인율</Text>
							<TextInput
								value={benefit.discountRate}
								onChangeText={(v) => onUpdate({ discountRate: v })}
								onFocus={() => setFocusedField("discountRate")}
								onBlur={() => setFocusedField(null)}
								placeholder="0"
								placeholderTextColor={colorTokens.contentSecondary}
								keyboardType="numeric"
								textAlign="right"
								className="flex-1 text-[15px] text-content-primary px-[4px]"
								style={{ borderBottomWidth: 0.5, borderBottomColor: borderColor("discountRate"), height: 36 }}
							/>
							<Text className="text-[13px] text-content-secondary w-[88px]">% 할인</Text>
						</View>
					) : (
						<View className="gap-[8px]">
							<View className="flex-row items-center gap-[8px]">
								<Text className="text-[13px] text-content-secondary">카테고리 입력</Text>
								<TextInput
									value={benefit.categories[0] ?? ""}
									onChangeText={(v) => onUpdate({ categories: v ? [v] : [] })}
									onFocus={() => setFocusedField("category")}
									onBlur={() => setFocusedField(null)}
									placeholder="카테고리를 입력해주세요"
									placeholderTextColor={colorTokens.contentSecondary}
									textAlign="center"
									className="flex-1 text-[13px] text-content-primary px-[4px]"
									style={{ borderBottomWidth: 0.5, borderBottomColor: borderColor("category"), height: 36 }}
								/>
							</View>
							{benefit.categories.length > 1 && (
								<View className="flex-row flex-wrap gap-[6px]">
									{benefit.categories.slice(1).map((cat, idx) => (
										<Pressable
											key={idx}
											onPress={() => removeCategory(idx + 1)}
											className="flex-row items-center bg-[#e5f6fe] rounded-full px-[8px] py-[4px] gap-[3px]"
										>
											<Text className="text-[11px] text-[#66a4fe]">{cat}</Text>
											<Ionicons name="close" size={10} color="#66a4fe" />
										</Pressable>
									))}
								</View>
							)}
						</View>
					)}

					<View style={{ height: 0.5, backgroundColor: "#e0e0e0" }} />

					{/* 제공 항목 */}
					<View className="flex-row items-start gap-[8px]">
						<Text className="w-[77px] text-[13px] text-content-primary mt-[4px]">제공 항목</Text>
						<View className="flex-1 gap-[8px]">
							<View className="flex-row flex-wrap items-center gap-[6px]">
								{benefit.items.map((item, idx) => (
									<Pressable
										key={idx}
										onPress={() => removeItem(idx)}
										className="flex-row items-center bg-[#e5f6fe] rounded-full px-[8px] py-[4px] gap-[3px]"
									>
										<Text className="text-[11px] text-[#66a4fe]">{item}</Text>
										<Ionicons name="close" size={10} color="#66a4fe" />
									</Pressable>
								))}
								{!showItemInput && (
									<Pressable
										onPress={() => setShowItemInput(true)}
										className="bg-primary rounded-full px-[10px] py-[4px]"
									>
										<Text className="text-[11px] text-white">+ 추가</Text>
									</Pressable>
								)}
							</View>
							{showItemInput && (
								<View className="flex-row items-center gap-[8px]">
									<TextInput
										value={itemInput}
										onChangeText={setItemInput}
										onSubmitEditing={addItem}
										onFocus={() => setFocusedField("itemInput")}
										onBlur={() => setFocusedField(null)}
										placeholder="항목을 입력해주세요"
										placeholderTextColor={colorTokens.contentSecondary}
										returnKeyType="done"
										autoFocus
										className="flex-1 text-[13px] text-content-primary px-[4px]"
										style={{ borderBottomWidth: 0.5, borderBottomColor: borderColor("itemInput"), height: 32 }}
									/>
									<Pressable onPress={addItem}>
										<Text className="text-[13px] text-primary font-medium">추가</Text>
									</Pressable>
									<Pressable onPress={() => { setShowItemInput(false); setItemInput(""); }}>
										<Text className="text-[13px] text-content-secondary">취소</Text>
									</Pressable>
								</View>
							)}
						</View>
					</View>
				</>
			)}
		</View>
	);
}
