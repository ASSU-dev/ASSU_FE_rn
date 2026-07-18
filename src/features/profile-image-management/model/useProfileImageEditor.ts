import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert } from "react-native";

import {
	useDeleteProfileImage,
	useProfileImage,
	useReplaceProfileImage,
} from "./useProfileImage";

export function useProfileImageEditor() {
	const [isOpen, setIsOpen] = useState(false);
	const profileImage = useProfileImage();
	const replaceImage = useReplaceProfileImage();
	const deleteImage = useDeleteProfileImage();
	const isPending = replaceImage.isPending || deleteImage.isPending;

	const selectImage = async () => {
		try {
			const permission =
				await ImagePicker.requestMediaLibraryPermissionsAsync();

			if (!permission.granted) {
				Alert.alert(
					"사진 접근 권한 필요",
					"프로필 사진을 선택하려면 사진 접근 권한을 허용해 주세요.",
				);
				return;
			}

			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ["images"],
				allowsEditing: true,
				aspect: [1, 1],
				quality: 0.9,
			});

			if (result.canceled) return;

			const asset = result.assets[0];
			await replaceImage.mutateAsync({
				uri: asset.uri,
				name: asset.fileName ?? `profile-${Date.now()}.jpg`,
				type: asset.mimeType ?? "image/jpeg",
			});
			setIsOpen(false);
		} catch {
			Alert.alert(
				"업로드 실패",
				"프로필 사진을 업로드하지 못했습니다. 다시 시도해 주세요.",
			);
		}
	};

	const removeImage = () => {
		Alert.alert("프로필 사진 삭제", "현재 프로필 사진을 삭제할까요?", [
			{ text: "취소", style: "cancel" },
			{
				text: "삭제",
				style: "destructive",
				onPress: async () => {
					try {
						await deleteImage.mutateAsync();
						setIsOpen(false);
					} catch {
						Alert.alert(
							"삭제 실패",
							"프로필 사진을 삭제하지 못했습니다. 다시 시도해 주세요.",
						);
					}
				},
			},
		]);
	};

	return {
		imageSource: profileImage.data ? { uri: profileImage.data } : undefined,
		hasImage: Boolean(profileImage.data),
		isOpen,
		isPending,
		open: () => setIsOpen(true),
		close: () => setIsOpen(false),
		selectImage,
		removeImage,
	};
}
