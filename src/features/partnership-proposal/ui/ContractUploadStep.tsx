import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { useController, useFormContext } from "react-hook-form";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UploadFilesIcon } from "@/shared/assets/icons";
import { colorTokens } from "@/shared/styles/tokens";
import { MediumButton } from "@/shared/ui/buttons/SubmitButton";
import type { ProposalFormData } from "../model";
import { DateRangeField } from "./DateRangeField";

type Props = { onComplete: () => void };

export function ContractUploadStep({ onComplete }: Props) {
	const { control } = useFormContext<ProposalFormData>();
	const { bottom } = useSafeAreaInsets();

	const { field: startDateField } = useController({
		control,
		name: "startDate",
	});
	const { field: endDateField } = useController({ control, name: "endDate" });
	const { field: contractFileField } = useController({
		control,
		name: "contractFile",
	});

	const startDate = startDateField.value;
	const endDate = endDateField.value;
	const contractFile = contractFileField.value;
	const isDateOrderInvalid = !!startDate && !!endDate && endDate <= startDate;
	const isValid =
		!!startDate && !!endDate && !isDateOrderInvalid && !!contractFile;

	const pickFile = async () => {
		try {
			const result = await DocumentPicker.getDocumentAsync({
				type: ["application/pdf", "image/*"],
				copyToCacheDirectory: true,
			});
			if (result.canceled) return;
			const asset = result.assets?.[0];
			if (!asset?.uri) {
				Alert.alert("오류", "파일을 불러올 수 없습니다. 다시 시도해 주세요.");
				return;
			}
			contractFileField.onChange({
				uri: asset.uri,
				name: asset.name ?? "파일",
			});
		} catch {
			Alert.alert(
				"오류",
				"파일 선택 중 문제가 발생했습니다. 다시 시도해 주세요.",
			);
		}
	};

	return (
		<View className="flex-1">
			<ScrollView
				className="flex-1"
				contentContainerClassName="px-[24px] gap-[10px]"
				keyboardShouldPersistTaps="handled"
			>
				<Text className="text-[13px] text-content-secondary">
					제휴 기간 선택
				</Text>
				<DateRangeField
					startDate={startDate}
					endDate={endDate}
					onStartDateChange={startDateField.onChange}
					onEndDateChange={endDateField.onChange}
					isDateOrderInvalid={isDateOrderInvalid}
				/>

				<Text className="text-[13px] text-content-secondary mt-[14px]">
					제휴 계약서 등록
				</Text>
				<Pressable
					className="bg-neutral rounded-lg p-[15px] flex-row justify-between items-center"
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

			<View
				className="items-center"
				style={{ paddingBottom: Math.max(bottom, 16) }}
			>
				<MediumButton disabled={!isValid} onPress={onComplete}>
					계약서 등록하기
				</MediumButton>
			</View>
		</View>
	);
}
