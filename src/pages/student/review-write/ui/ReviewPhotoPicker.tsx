import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";
import type { ReviewImageFile } from "@/entities/review";
import { ImageFillIcon } from "@/shared/assets/icons";

interface ReviewPhotoPickerProps {
	images: ReviewImageFile[];
	maxImages: number;
	onAdd: () => void;
	onRemove: (uri: string) => void;
}

export function ReviewPhotoPicker({
	images,
	maxImages,
	onAdd,
	onRemove,
}: ReviewPhotoPickerProps) {
	return (
		<View className="gap-gutter">
			<Text className="px-[4px] font-medium text-lg leading-caption tracking-caption text-content-primary">
				사진을 올려주세요
			</Text>
			<View className="flex-row gap-[9px] px-[4px]">
				{images.map((image) => (
					<Pressable
						key={image.uri}
						onPress={() => onRemove(image.uri)}
						accessibilityLabel="선택한 리뷰 사진 삭제"
						className="size-[100px] overflow-hidden rounded-md"
					>
						<Image
							source={{ uri: image.uri }}
							style={{ width: 100, height: 100 }}
							contentFit="cover"
						/>
					</Pressable>
				))}
				{images.length < maxImages && (
					<Pressable
						onPress={onAdd}
						accessibilityLabel="리뷰 사진 추가"
						className="size-[100px] items-center justify-center rounded-md border border-content-secondary bg-neutral"
					>
						<ImageFillIcon width={24} height={24} />
						<Text className="font-regular text-sm leading-caption tracking-caption text-content-secondary">
							{images.length}/{maxImages}
						</Text>
					</Pressable>
				)}
			</View>
		</View>
	);
}
