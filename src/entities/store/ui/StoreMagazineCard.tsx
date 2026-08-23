import { Image, Pressable, Text, View } from "react-native";
import { DefaultImageMagazine, SaleTag } from "@/shared/assets/icons";

interface StoreMagazineCardProps {
	imageUri?: string;
	badge: string;
	storeName: string;
	note?: string;
	distance?: string;
	admin?: string;
	onPress?: () => void;
}

export function StoreMagazineCard({
	imageUri,
	badge,
	storeName,
	note,
	distance,
	admin,
	onPress,
}: StoreMagazineCardProps) {
	const infoParts = [note, distance].filter(Boolean);

	return (
		<Pressable onPress={onPress} className="flex-1 gap-2">
			<View
				className="relative w-full overflow-hidden rounded-lg bg-neutral"
				style={{ aspectRatio: 5 / 3 }}
			>
				{imageUri ? (
					<Image
						source={{ uri: imageUri }}
						className="absolute inset-0"
						resizeMode="cover"
					/>
				) : (
					<View className="flex-1 items-center justify-center">
						<DefaultImageMagazine width={150} height={150} />
					</View>
				)}
				<View className="absolute bottom-0 left-0 flex-row items-center gap-1 rounded-tr-md rounded-b-md bg-primary px-2 py-1">
					<SaleTag width={12} height={10} />
					<Text
						className="font-semibold text-[11.5px] text-content-inverse"
						numberOfLines={1}
					>
						{badge}
					</Text>
				</View>
			</View>
			<View className="gap-0.5">
				<Text
					className="font-semibold text-sm text-content-primary"
					numberOfLines={1}
				>
					{storeName}
				</Text>
				{(infoParts.length > 0 || admin) && (
					<Text
						className="font-regular text-xs text-content-secondary"
						numberOfLines={1}
					>
						{infoParts.length > 0 && (
							<Text className="text-content-secondary">
								{infoParts.join(" · ")}
							</Text>
						)}
						{infoParts.length > 0 && admin && (
							<Text className="text-content-secondary"> · </Text>
						)}
						{admin && <Text className="text-sub">{admin}</Text>}
					</Text>
				)}
			</View>
		</Pressable>
	);
}
