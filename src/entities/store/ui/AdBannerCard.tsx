import { Image, Pressable, Text, View } from "react-native";
import { DefaultImageCircle } from "@/shared/assets/icons";

interface AdBannerCardProps {
	imageUri?: string;
	badge?: string;
	storeName: string;
	onPress?: () => void;
}

// 광고 배너 카드 — 홈 화면 내 광고 리스트에서 사용
export function AdBannerCard({
	imageUri,
	badge,
	storeName,
	onPress,
}: AdBannerCardProps) {
	return (
		<Pressable
			onPress={onPress}
			className="items-center gap-1"
			style={{ width: 60 }}
		>
			<View className="w-full items-center" style={{ paddingTop: 12 }}>
				{badge && (
					<View className="absolute top-0 z-10 rounded-full border border-gray-200 bg-white px-1.5 py-0.5">
						<Text
							className="font-semibold text-[10px] text-primary"
							numberOfLines={1}
						>
							{badge}
						</Text>
					</View>
				)}
				<View
					className="overflow-hidden rounded-full bg-neutral"
					style={{ width: 55, height: 55 }}
				>
					{imageUri ? (
						<Image
							source={{ uri: imageUri }}
							style={{ width: 55, height: 55 }}
							resizeMode="cover"
						/>
					) : (
						<View className="flex-1 items-center justify-center">
							<DefaultImageCircle width={45} height={45} />
						</View>
					)}
				</View>
			</View>
			<Text
				className="w-full font-regular text-xs text-content-primary text-center"
				numberOfLines={1}
			>
				{storeName}
			</Text>
		</Pressable>
	);
}
