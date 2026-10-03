import * as ImagePicker from "expo-image-picker";
import { useReviewDraftStore } from "./useReviewDraftStore";

const MAX_REVIEW_IMAGES = 3;

export function useReviewImagePicker() {
	const images = useReviewDraftStore((state) => state.images);
	const setImages = useReviewDraftStore((state) => state.setImages);

	const selectImages = async () => {
		const remainingCount = MAX_REVIEW_IMAGES - images.length;
		if (remainingCount <= 0) return;

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsMultipleSelection: true,
			selectionLimit: remainingCount,
			quality: 0.9,
		});

		if (result.canceled) return;

		const selectedImages = result.assets.map((asset, index) => ({
			uri: asset.uri,
			name: asset.fileName ?? `review-${Date.now()}-${index}.jpg`,
			type: asset.mimeType ?? "image/jpeg",
		}));

		setImages([...images, ...selectedImages].slice(0, MAX_REVIEW_IMAGES));
	};

	const removeImage = (uri: string) => {
		setImages(images.filter((image) => image.uri !== uri));
	};

	return {
		images,
		maxImages: MAX_REVIEW_IMAGES,
		selectImages,
		removeImage,
	};
}
