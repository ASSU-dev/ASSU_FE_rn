import {
	ActivityIndicator,
	Modal,
	Platform,
	Pressable,
	Text,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colorTokens } from "@/shared/styles/tokens";

interface ProfileImageActionSheetProps {
	visible: boolean;
	hasImage: boolean;
	isPending: boolean;
	onSelectImage: () => void;
	onDeleteImage: () => void;
	onClose: () => void;
}

export function ProfileImageActionSheet({
	visible,
	hasImage,
	isPending,
	onSelectImage,
	onDeleteImage,
	onClose,
}: ProfileImageActionSheetProps) {
	const insets = useSafeAreaInsets();

	return (
		<Modal
			visible={visible}
			transparent
			animationType="slide"
			statusBarTranslucent={Platform.OS === "android"}
			onRequestClose={onClose}
		>
			<View className="flex-1 justify-end bg-overlay">
				<Pressable className="flex-1" onPress={onClose} disabled={isPending} />
				<View
					className="rounded-t-[20px] bg-canvas px-screen-m pt-card-p"
					style={{ paddingBottom: Math.max(insets.bottom, 20) }}
				>
					<View className="items-center">
						<View className="h-[5px] w-9 rounded-full bg-neutral-variant" />
					</View>
					<Text className="mb-5 mt-6 text-center text-xl font-semibold text-content-primary">
						프로필 사진
					</Text>
					{isPending ? (
						<View className="h-24 items-center justify-center">
							<ActivityIndicator color={colorTokens.primary} />
						</View>
					) : (
						<View className="overflow-hidden rounded-xl bg-neutral">
							<Pressable
								className="items-center px-4 py-4"
								onPress={onSelectImage}
							>
								<Text className="text-md font-medium text-primary">
									사진 선택
								</Text>
							</Pressable>
							{hasImage ? (
								<Pressable
									className="items-center border-t border-neutral-variant px-4 py-4"
									onPress={onDeleteImage}
								>
									<Text
										className="text-md font-medium"
										style={{ color: colorTokens.danger }}
									>
										현재 사진 삭제
									</Text>
								</Pressable>
							) : null}
						</View>
					)}
					<Pressable
						className="mt-gutter items-center py-4"
						onPress={onClose}
						disabled={isPending}
					>
						<Text className="text-md font-medium text-content-secondary">
							취소
						</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
}
