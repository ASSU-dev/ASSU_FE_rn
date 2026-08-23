import { useRef, useState } from "react";
import { Dimensions, FlatList, Image, View } from "react-native";
import { DefaultImageMagazine } from "@/shared/assets/icons";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_HEIGHT = Math.round(SCREEN_WIDTH * (9 / 16));

interface StoreImageCarouselProps {
	images?: string[];
}

export function StoreImageCarousel({ images = [] }: StoreImageCarouselProps) {
	const [activeIndex, setActiveIndex] = useState(0);
	const flatListRef = useRef<FlatList>(null);

	const items = images.length > 0 ? images : ["__placeholder__"];

	return (
		<View style={{ height: CARD_HEIGHT }}>
			<FlatList
				ref={flatListRef}
				data={items}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				keyExtractor={(_, i) => String(i)}
				scrollEventThrottle={16}
				onScroll={(e) => {
					const index = Math.round(
						e.nativeEvent.contentOffset.x / SCREEN_WIDTH,
					);
					setActiveIndex(index);
				}}
				renderItem={({ item }) => (
					<View
						style={{ width: SCREEN_WIDTH, height: CARD_HEIGHT }}
						className="bg-neutral"
					>
						{item === "__placeholder__" ? (
							<View className="flex-1 items-center justify-center">
								<DefaultImageMagazine width={80} height={80} />
							</View>
						) : (
							<Image
								source={{ uri: item }}
								style={{ width: SCREEN_WIDTH, height: CARD_HEIGHT }}
								resizeMode="cover"
							/>
						)}
					</View>
				)}
			/>
			<View className="absolute bottom-3 w-full flex-row justify-center gap-1.5">
				{items.map((item, i) => (
					<View
						key={item}
						className={`h-1.5 rounded-full ${
							i === activeIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"
						}`}
					/>
				))}
			</View>
		</View>
	);
}
