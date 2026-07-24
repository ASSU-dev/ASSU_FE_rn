import { Image, Pressable, Text, View } from "react-native";

import type { SearchResultStore } from "@/entities/store";

interface AdminStoreCardProps {
	store: SearchResultStore;
	onActionPress?: () => void;
}

export function AdminStoreCard({ store, onActionPress }: AdminStoreCardProps) {
	const isPartner = store.isPartner ?? false;
	const dateRange =
		isPartner && store.partnershipStartDate && store.partnershipEndDate
			? `${store.partnershipStartDate} ~ ${store.partnershipEndDate}`
			: undefined;

	return (
		<View className="flex-row items-center gap-5 rounded-lg bg-canvas px-5 py-5">
			<StoreImage uri={store.imageUri} />
			<View className="flex-1 justify-between gap-2.5">
				{/* Title + status/address */}
				<View className="gap-2">
					<Text className="text-base font-semibold text-content-primary">
						{store.name}
					</Text>
					{isPartner ? (
						<View className="flex-row items-center gap-2">
							<View className="shrink-0 rounded-full bg-neutral px-2.5 py-1">
								<Text className="font-regular text-[11px] text-content-secondary">
									제휴중
								</Text>
							</View>
							{dateRange && (
								<Text
									className="flex-1 font-regular text-xs text-content-secondary"
									numberOfLines={1}
								>
									{dateRange}
								</Text>
							)}
						</View>
					) : store.address ? (
						<Text
							className="font-regular text-xs text-content-secondary"
							numberOfLines={1}
						>
							{store.address}
						</Text>
					) : null}
				</View>

				{/* Action button */}
				<Pressable
					onPress={onActionPress}
					className={`rounded-lg px-[10px] py-[5px] ${isPartner ? "bg-primary" : "bg-primary-tint"}`}
				>
					<Text
						className={`text-center font-regular text-[11px] leading-caption tracking-caption ${isPartner ? "text-content-inverse" : "text-primary"}`}
					>
						{isPartner ? "제휴 계약서 보기" : "문의하기"}
					</Text>
				</Pressable>
			</View>
		</View>
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
