import { Image, Pressable, Text, View } from "react-native";
import { DefaultImageMagazine, SaleTag } from "@/shared/assets/icons";

interface StoreMagazineCardProps {
	profileImageUrl?: string;
	discountContent?: string;
	storeName?: string;
	onPress?: () => void;
}

export function StoreMagazineCard({
	profileImageUrl,
	discountContent,
	storeName,
	onPress,
}: StoreMagazineCardProps) {
	return (
		<Pressable onPress={onPress} className="flex-1 gap-2">
			<View
				className="relative w-full overflow-hidden rounded-lg bg-neutral"
				style={{ aspectRatio: 5 / 3 }}
			>
				{profileImageUrl ? (
					<Image
						source={{ uri: profileImageUrl }}
						className="absolute inset-0"
						resizeMode="cover"
					/>
				) : (
					<View className="flex-1 items-center justify-center">
						<DefaultImageMagazine width={150} height={150} />
					</View>
				)}
				{discountContent && (
					<View className="absolute bottom-0 left-0 flex-row items-center gap-1 rounded-tr-md rounded-b-md bg-primary px-2 py-1">
						<SaleTag width={12} height={10} />
						<Text
							className="font-semibold text-[11.5px] text-content-inverse"
							numberOfLines={1}
						>
							{discountContent}
						</Text>
					</View>
				)}
			</View>
			<Text
				className="font-semibold text-sm text-content-primary"
				numberOfLines={1}
			>
				{storeName}
			</Text>
		</Pressable>
	);
}
