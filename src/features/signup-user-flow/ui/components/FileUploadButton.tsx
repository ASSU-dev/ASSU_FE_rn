import { CheckIcon, ImageUploadIcon } from "@/shared/assets/icons";
import { colorTokens } from "@/shared/styles/tokens";
import { Pressable, Text } from "react-native";

type FileUploadButtonProps = {
	fileName: string;
	onPressUpload: () => void;
	placeholderText?: string;
	className?: string;
};

export function FileUploadButton({
	fileName,
	onPressUpload,
	placeholderText = "갤러리에서 사진 업로드",
	className,
}: FileUploadButtonProps) {
	const hasUploadedFile = fileName.length > 0;

	return (
		<Pressable
			onPress={onPressUpload}
			className={`h-[50px] flex-row items-center justify-between rounded-lg border px-[15px] ${className ?? ""}`}
			style={{
				backgroundColor: colorTokens.neutral,
				borderColor: colorTokens.neutral,
				borderWidth: 0.5,
			}}
		>
			<Text className="text-[17px] font-medium leading-[20px] tracking-[0.25px] text-content-secondary">
				{fileName || placeholderText}
			</Text>
			{hasUploadedFile ? (
				<CheckIcon width={24} height={24} />
			) : (
				<ImageUploadIcon width={18} height={18} />
			)}
		</Pressable>
	);
}

