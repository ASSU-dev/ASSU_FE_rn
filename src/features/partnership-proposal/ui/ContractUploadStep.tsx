import { Modal, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { useFormContext } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as DocumentPicker from "expo-document-picker";
import { colorTokens } from "@/shared/styles/tokens";
import { MediumButton } from "@/shared/ui/buttons/SubmitButton";
import { UploadFilesIcon } from "@/shared/assets/icons";
import type { ProposalFormData } from "../model";
import { useDatePicker } from "../model";

type Props = { onComplete: () => void };

export function ContractUploadStep({ onComplete }: Props) {
	const { setValue, watch } = useFormContext<ProposalFormData>();
	const startDate = watch("startDate");
	const endDate = watch("endDate");
	const contractFile = watch("contractFile");
	const isValid = !!startDate && !!endDate && !!contractFile;

	const { dateField, tempDate, open, onChange, confirm, dismiss } = useDatePicker(
		(field, date) => setValue(field, date),
	);

	const pickFile = async () => {
		try {
			const result = await DocumentPicker.getDocumentAsync({
				type: ["application/pdf", "image/*"],
				copyToCacheDirectory: true,
			});
			if (!result.canceled && result.assets[0]) {
				const asset = result.assets[0];
				setValue("contractFile", { uri: asset.uri, name: asset.name });
			}
		} catch {
			// 사용자 취소 또는 권한 없음
		}
	};

	const formatDate = (d: string | null) => (d ? d.replace(/-/g, ". ") : "YYYY. MM. DD");

	return (
		<View className="flex-1">
			<ScrollView className="flex-1" contentContainerClassName="px-[24px] gap-[10px]">
				<Text className="text-[13px] text-content-secondary">제휴 기간 선택</Text>
				<View className="flex-row items-center gap-[8px]">
					<Pressable
						className="bg-[#f4f4f5] rounded-lg flex-1 p-[15px] flex-row justify-between items-center"
						onPress={() => open("startDate", startDate)}
					>
						<Text className={`text-[14px] ${startDate ? "text-content-primary" : "text-content-secondary"}`}>
							{formatDate(startDate)}
						</Text>
						<Ionicons name="calendar-outline" size={20} color={colorTokens.contentSecondary} />
					</Pressable>

					<Text className="text-[14px] text-content-secondary">~</Text>

					<Pressable
						className="bg-[#f4f4f5] rounded-lg flex-1 p-[15px] flex-row justify-between items-center"
						onPress={() => open("endDate", endDate)}
					>
						<Text className={`text-[14px] ${endDate ? "text-content-primary" : "text-content-secondary"}`}>
							{formatDate(endDate)}
						</Text>
						<Ionicons name="calendar-outline" size={20} color={colorTokens.contentSecondary} />
					</Pressable>
				</View>

				<Text className="text-[13px] text-content-secondary mt-[14px]">제휴 계약서 등록</Text>
				<Pressable
					className="bg-[#f4f4f5] rounded-lg p-[15px] flex-row justify-between items-center"
					onPress={pickFile}
				>
					<Text className="text-[17px] text-content-secondary flex-1 mr-2">
						{contractFile ? contractFile.name : "파일 업로드"}
					</Text>
					{contractFile ? (
						<Ionicons name="checkmark" size={20} color={colorTokens.primary} />
					) : (
						<UploadFilesIcon width={16} height={16} />
					)}
				</Pressable>
			</ScrollView>

			{Platform.OS === "android" && dateField && (
				<DateTimePicker
					value={tempDate}
					mode="date"
					display="calendar"
					onChange={onChange}
				/>
			)}

			{Platform.OS === "ios" && (
				<Modal transparent animationType="slide" visible={!!dateField}>
					<Pressable className="flex-1 bg-black/40" onPress={dismiss} />
					<View className="bg-white rounded-t-2xl px-4 pb-6 pt-2">
						<View className="flex-row justify-between items-center py-3">
							<Pressable onPress={dismiss}>
								<Text className="text-[16px] text-content-secondary">취소</Text>
							</Pressable>
							<Pressable onPress={confirm}>
								<Text className="text-[16px] text-primary font-semibold">확인</Text>
							</Pressable>
						</View>
						<DateTimePicker
							value={tempDate}
							mode="date"
							display="spinner"
							onChange={onChange}
							style={{ height: 200 }}
						/>
					</View>
				</Modal>
			)}

			<View className="items-center pb-[16px]">
				<MediumButton
					disabled={!isValid}
					style={!isValid ? { opacity: 0.3 } : undefined}
					onPress={onComplete}
				>
					계약서 등록하기
				</MediumButton>
			</View>
		</View>
	);
}
