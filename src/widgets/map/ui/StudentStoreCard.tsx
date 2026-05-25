import { Image, Pressable, Text, View } from "react-native";

import type { SearchResultStore } from "@/entities/store";

interface StudentStoreCardProps {
	store: SearchResultStore;
	onPress?: () => void;
}

export function StudentStoreCard({ store, onPress }: StudentStoreCardProps) {
	return (
		<Pressable
			onPress={onPress}
			className="flex-row items-center gap-5 rounded-lg bg-canvas px-5 py-5"
		>
			<StoreImage uri={store.imageUri} />
			<View className="flex-1 gap-2.5">
				<View className="gap-2">
					<Text className="text-base font-semibold text-content-primary">
						{store.name}
					</Text>
					<View className="flex-row items-center gap-2">
						{store.tag && (
							<View className="shrink-0 rounded-full bg-neutral px-2.5 py-1">
								<Text className="font-regular text-[11px] text-content-secondary">
									{store.tag}
								</Text>
							</View>
						)}
						{store.benefit && (
							<Text
								className="flex-1 font-regular text-xs text-content-secondary"
								numberOfLines={1}
							>
								{store.benefit}
							</Text>
						)}
					</View>
				</View>
			</View>
		</Pressable>
	);
}

function StoreImage({ uri }: { uri?: string }) {
	return (
		<View
			className="shrink-0 overflow-hidden rounded-lg bg-neutral"
			style={{ width: 70, height: 70 }}
		>
			{uri ? (
				<Image
					source={{ uri }}
					style={{ width: 70, height: 70 }}
					resizeMode="cover"
				/>
			) : null}
		</View>
	);
}
