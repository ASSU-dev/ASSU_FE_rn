import { Image, View } from "react-native";

interface CommentImagesProps {
	images: string[];
}

export function CommentImages({ images }: CommentImagesProps) {
	if (!images || images.length === 0) {
		return null;
	}

	return (
		<View className="flex-row gap-gutter">
			{images.filter(Boolean).map((imageUri) => (
				<Image
					key={imageUri}
					source={{ uri: imageUri }}
					className="w-[95px] h-[95px] rounded-md bg-gray-400"
				/>
			))}
		</View>
	);
}
