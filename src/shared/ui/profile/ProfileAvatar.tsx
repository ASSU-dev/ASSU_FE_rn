import { Image } from "expo-image";
import type { ImageSource } from "expo-image";
import { View } from "react-native";

const DEFAULT_PROFILE = require("@/shared/assets/images/default-profile.png");

interface ProfileAvatarProps {
	source?: ImageSource;
	/** 프레임 크기 (px). 이미지는 size-2 만큼 작게 렌더링. default: 48 */
	size?: number;
}

export function ProfileAvatar({ source, size = 48 }: ProfileAvatarProps) {
	const imageSize = size - 2;

	return (
		<View
			className="items-center justify-center overflow-hidden rounded-full border-[0.5px] border-black"
			style={{ width: size, height: size }}
		>
			<Image
				source={source ?? DEFAULT_PROFILE}
				style={{ width: imageSize, height: imageSize }}
				contentFit="cover"
			/>
		</View>
	);
}
