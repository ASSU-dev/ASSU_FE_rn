import { Image, View } from "react-native";

interface CommentImagesProps {
	images: string[];
}

export const CommentImages = ({ images }: CommentImagesProps) => {
	if (!images || images.length === 0) {
		return null;
	}

	return (
		<View className="flex-row gap-gutter">
			{images.map((imageUri, index) => (
				<Image
					key={imageUri || index}
					source={{ uri: imageUri }}
					className="w-[95px] h-[95px] rounded-md bg-gray-400"
				/>
			))}
		</View>
	);
};
