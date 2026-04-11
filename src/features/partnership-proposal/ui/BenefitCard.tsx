import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import { CheckGrayIcon, CheckIcon } from "@/shared/assets/icons";
import { colorTokens } from "@/shared/styles/tokens";
import type { ProposalFormData } from "../model";
import {
	type BenefitCriteria,
	SERVICE_TYPES,
	type ServiceType,
} from "../model";

interface Props {
	index: number;
	onRemove: () => void;
}

export function BenefitCard({ index, onRemove }: Props) {
	const { control, setValue } = useFormContext<ProposalFormData>();
	const [showItemInput, setShowItemInput] = useState(false);
	const [itemInput, setItemInput] = useState("");
	const [focusedField, setFocusedField] = useState<string | null>(null);
	const [showServiceTypeMenu, setShowServiceTypeMenu] = useState(false);

	const serviceType = useWatch({
		control,
		name: `benefits.${index}.serviceType`,
	});
	const criteria = useWatch({ control, name: `benefits.${index}.criteria` });
	const categories = useWatch({
		control,
		name: `benefits.${index}.categories`,
	});
	const items = useWatch({ control, name: `benefits.${index}.items` });

	const borderColor = (field: string) =>
		focusedField === field ? colorTokens.primary : "#e0e0e0";

	const selectServiceType = (type: ServiceType) => {
		setValue(`benefits.${index}.serviceType`, type);
		setValue(`benefits.${index}.criteria`, "금액");
		setValue(`benefits.${index}.amount`, "");
		setValue(`benefits.${index}.minCount`, "");
		setValue(`benefits.${index}.categories`, []);
		setValue(`benefits.${index}.items`, []);
		setValue(`benefits.${index}.discountRate`, "");
		setValue(`benefits.${index}.content`, "");
		setShowServiceTypeMenu(false);
	};

	const selectCriteria = (value: BenefitCriteria) => {
		setValue(`benefits.${index}.criteria`, value);
		setValue(`benefits.${index}.amount`, "");
		setValue(`benefits.${index}.minCount`, "");
	};

	const removeCategory = (idx: number) => {
		setValue(
			`benefits.${index}.categories`,
			categories.filter((_, i) => i !== idx),
		);
	};

	const addItem = () => {
		const trimmed = itemInput.trim();
		if (!trimmed) return;
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
		<View className="bg-[#f4f4f5] rounded-lg p-[10px] gap-[15px]">
			{/* 헤더 */}
			<View className="flex-row items-center justify-between">
				<View>
					<Pressable
						onPress={() => setShowServiceTypeMenu((v) => !v)}
						className="border border-primary rounded-lg px-[10px] py-[10px] flex-row items-center gap-[2px]"
					>
						<Text className="text-primary text-[13px]">{serviceType}</Text>
						<Ionicons
							name="chevron-down"
							size={14}
							color={colorTokens.primary}
						/>
					</Pressable>
					{showServiceTypeMenu && (
						<View className="absolute top-[42px] left-0 z-10 bg-white rounded-lg shadow-md border border-[#e0e0e0] overflow-hidden">
							{SERVICE_TYPES.map((type) => (
								<Pressable
									key={type}
									onPress={() => selectServiceType(type)}
									className="px-[14px] py-[10px]"
								>
									<Text
										className={`text-[13px] ${serviceType === type ? "text-primary font-medium" : "text-content-primary"}`}
									>
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

			{serviceType === "기타 혜택" ? (
				/* 기타 혜택: 제휴 내용 입력 */
				<View className="gap-[8px] py-[5px]">
					<Text className="text-[15px] text-content-primary">
						제휴 내용 입력
					</Text>
					<Controller
						control={control}
						name={`benefits.${index}.content`}
						render={({ field: { value, onChange } }) => (
							<TextInput
								value={value}
								onChangeText={onChange}
								onFocus={() => setFocusedField("content")}
								onBlur={() => setFocusedField(null)}
								placeholder="제휴 내용을 입력해주세요"
								placeholderTextColor={colorTokens.contentSecondary}
								className="text-[15px] text-content-primary px-[4px]"
								style={{
									borderBottomWidth: 1,
									borderBottomColor: borderColor("content"),
									height: 36,
								}}
							/>
						)}
					/>
				</View>
			) : (
				<>
					{/* 제공 기준 */}
					<View className="flex-row items-center">
						<Text className="w-[77px] text-[13px] text-content-primary">
							제공 기준
						</Text>
						<View className="flex-row gap-[12px]">
							{(["금액", "인원수"] as BenefitCriteria[]).map((option) => {
								const selected = criteria === option;
								return (
									<Pressable
										key={option}
										onPress={() => selectCriteria(option)}
										className="flex-row items-center gap-[5px]"
									>
										{selected ? (
											<CheckIcon width={15} height={15} />
										) : (
											<CheckGrayIcon width={15} height={15} />
										)}
										<Text className="text-[13px] text-content-primary">
											{option}
										</Text>
									</Pressable>
								);
							})}
						</View>
					</View>

					{/* 기준 입력 */}
					{criteria === "금액" && (
						<View className="flex-row items-center gap-[8px]">
							<View className="w-[77px]" />
							<Controller
								control={control}
								name={`benefits.${index}.amount`}
								render={({ field: { value, onChange } }) => (
									<TextInput
										value={
											value ? value.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""
										}
										onChangeText={(v) => onChange(v.replace(/,/g, ""))}
										onFocus={() => setFocusedField("amount")}
										onBlur={() => setFocusedField(null)}
										placeholder="금액 입력"
										placeholderTextColor={colorTokens.contentSecondary}
										keyboardType="numeric"
										textAlign="right"
										className="flex-1 text-[15px] text-content-primary px-[4px]"
										style={{
											borderBottomWidth: 0.5,
											borderBottomColor: borderColor("amount"),
											height: 36,
										}}
									/>
								)}
							/>
							<Text className="text-[13px] text-content-secondary w-[88px]">
								원 이상일 경우,
							</Text>
						</View>
					)}

					{criteria === "인원수" && (
						<View className="flex-row items-center gap-[8px]">
							<View className="w-[77px]" />
							<Controller
								control={control}
								name={`benefits.${index}.minCount`}
								render={({ field: { value, onChange } }) => (
									<TextInput
										value={value}
										onChangeText={onChange}
										onFocus={() => setFocusedField("minCount")}
										onBlur={() => setFocusedField(null)}
										placeholder="인원 입력"
										placeholderTextColor={colorTokens.contentSecondary}
										keyboardType="numeric"
										textAlign="right"
										className="flex-1 text-[15px] text-content-primary px-[4px]"
										style={{
											borderBottomWidth: 0.5,
											borderBottomColor: borderColor("minCount"),
											height: 36,
										}}
									/>
								)}
							/>
							<Text className="text-[13px] text-content-secondary w-[88px]">
								인 이상일 경우,
							</Text>
						</View>
					)}

					{/* 카테고리 / 할인율 */}
					{serviceType === "할인 혜택" ? (
						<View className="flex-row items-center gap-[8px]">
							<Text className="w-[77px] text-[13px] text-content-primary">
								할인율
							</Text>
							<Controller
								control={control}
								name={`benefits.${index}.discountRate`}
								render={({ field: { value, onChange } }) => (
									<TextInput
										value={value}
										onChangeText={onChange}
										onFocus={() => setFocusedField("discountRate")}
										onBlur={() => setFocusedField(null)}
										placeholder="0"
										placeholderTextColor={colorTokens.contentSecondary}
										keyboardType="numeric"
										textAlign="right"
										className="flex-1 text-[15px] text-content-primary px-[4px]"
										style={{
											borderBottomWidth: 0.5,
											borderBottomColor: borderColor("discountRate"),
											height: 36,
										}}
									/>
								)}
							/>
							<Text className="text-[13px] text-content-secondary w-[88px]">
								% 할인
							</Text>
						</View>
					) : (
						<View className="gap-[8px]">
							<View className="flex-row items-center gap-[8px]">
								<Text className="text-[13px] text-content-secondary">
									카테고리 입력
								</Text>
								<Controller
									control={control}
									name={`benefits.${index}.categories`}
									render={({ field: { value, onChange } }) => (
										<TextInput
											value={value[0] ?? ""}
											onChangeText={(v) => onChange(v ? [v] : [])}
											onFocus={() => setFocusedField("category")}
											onBlur={() => setFocusedField(null)}
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
							{categories.length > 1 && (
								<View className="flex-row flex-wrap gap-[6px]">
									{categories.slice(1).map((cat, id) => (
										<Pressable
											key={`category-${cat}`}
											onPress={() => removeCategory(id + 1)}
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

					{serviceType !== "할인 혜택" && (
						<>
							<View style={{ height: 0.5, backgroundColor: "#e0e0e0" }} />

							{/* 제공 항목 */}
							<View className="flex-row items-start gap-[8px]">
								<Text className="w-[77px] text-[13px] text-content-primary mt-[4px]">
									제공 항목
								</Text>
								<View className="flex-1 gap-[8px]">
									<View className="flex-row flex-wrap items-center gap-[6px]">
										{items.map((item, id) => (
											<Pressable
												key={`item-${item}`}
												onPress={() => removeItem(id)}
												className="flex-row items-center bg-[#e5f6fe] rounded-full px-[8px] py-[4px] gap-[3px]"
											>
												<Text className="text-[11px] text-[#66a4fe]">
													{item}
												</Text>
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
												<Text className="text-[13px] text-content-secondary">
													취소
												</Text>
											</Pressable>
										</View>
									)}
								</View>
							</View>
						</>
					)}
				</>
			)}
		</View>
	);
}
