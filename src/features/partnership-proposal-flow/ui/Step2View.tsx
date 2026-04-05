import { Alert, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colorTokens } from "@/shared/styles/tokens";
import { PageLayout } from "@/shared/ui/layout";
import { MediumButton } from "@/shared/ui/buttons/SubmitButton";
import { useProposalStore } from "@/features/partnership-proposal-flow";

type Props = {
	onBack: () => void;
	onComplete: () => void;
};

export function Step2View({ onBack, onComplete }: Props) {
	const { step2, setStep2 } = useProposalStore();
	const isValid = !!step2.startDate && !!step2.endDate && !!step2.contractFile;

	const pickDate = (field: "startDate" | "endDate") => {
		Alert.alert("날짜 선택", "날짜를 선택하세요", [
			{
				text: "오늘",
				onPress: () => setStep2({ [field]: new Date().toISOString().slice(0, 10) }),
			},
			{ text: "취소", style: "cancel" },
		]);
	};

	const pickFile = () => {
		Alert.alert("파일 선택", "계약서 파일을 선택하세요", [
			{
				text: "선택",
				onPress: () =>
					setStep2({ contractFile: { uri: "placeholder://contract", name: "계약서.pdf" } }),
			},
			{ text: "취소", style: "cancel" },
		]);
	};

	const formatDate = (d: string | null) => (d ? d.replace(/-/g, " - ") : "YYYY - MM - DD");

	return (
		<PageLayout withTopInset withBottomInset contentContainerClassName="flex-1">
			<View className="flex-row items-center px-[15px] pt-[10px] pb-[16px]">
				<Pressable onPress={onBack} hitSlop={8} className="mr-2">
					<Ionicons name="arrow-back" size={24} color={colorTokens.contentPrimary} />
				</Pressable>
				<View className="flex-1 items-center">
					<Text className="text-[17px] font-semibold text-content-primary">제휴 계약서</Text>
				</View>
				<View style={{ width: 24 }} />
			</View>

			<View className="px-[15px] gap-[10px]">
				<Text className="text-[13px] text-content-secondary">제휴 기간 선택</Text>
				<View className="flex-row items-center gap-[8px]">
					<Pressable
						className="bg-[#f4f4f5] rounded-lg flex-1 p-[15px] flex-row justify-between items-center"
						onPress={() => pickDate("startDate")}
					>
						<Text className="text-[14px] text-content-secondary">{formatDate(step2.startDate)}</Text>
						<Ionicons name="calendar-outline" size={20} color={colorTokens.contentSecondary} />
					</Pressable>

					<Text className="text-[14px] text-content-secondary">~</Text>

					<Pressable
						className="bg-[#f4f4f5] rounded-lg flex-1 p-[15px] flex-row justify-between items-center"
						onPress={() => pickDate("endDate")}
					>
						<Text className="text-[14px] text-content-secondary">{formatDate(step2.endDate)}</Text>
						<Ionicons name="calendar-outline" size={20} color={colorTokens.contentSecondary} />
					</Pressable>
				</View>
			</View>

			<View className="px-[15px] gap-[10px] mt-[24px]">
				<Text className="text-[13px] text-content-secondary">제휴 계약서 등록</Text>
				<Pressable
					className="bg-[#f4f4f5] rounded-lg p-[15px] flex-row justify-between items-center"
					onPress={pickFile}
				>
					<Text className="text-[17px] text-content-secondary flex-1 mr-2">
						{step2.contractFile ? step2.contractFile.name : "갤러리에서 사진 업로드"}
					</Text>
					{step2.contractFile ? (
						<Ionicons name="checkmark" size={24} color={colorTokens.primary} />
					) : (
						<Ionicons name="cloud-upload-outline" size={24} color={colorTokens.primary} />
					)}
				</Pressable>
			</View>

			<View className="flex-1" />

			<View className="items-center pb-[16px]">
				<MediumButton
					disabled={!isValid}
					style={!isValid ? { opacity: 0.3 } : undefined}
					onPress={onComplete}
				>
					계약서 등록하기
				</MediumButton>
			</View>
		</PageLayout>
	);
}
