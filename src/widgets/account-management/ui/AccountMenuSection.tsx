import { Text, View } from "react-native";

import type { AccountMenuSectionProps } from "../model/types";
import { AccountMenuItem } from "./AccountMenuItem";

export function AccountMenuSection({
	title,
	items,
}: AccountMenuSectionProps) {
	return (
		<View className="gap-2.5">
			<Text className="px-1 text-xs font-semibold text-content-secondary">
				{title}
			</Text>
			<View className="gap-2.5">
				{items.map((item, index) => (
					<AccountMenuItem
						key={`${title}-${item.label}-${index}`}
						label={item.label}
						iconName={item.iconName}
						onPress={item.onPress}
					/>
				))}
			</View>
		</View>
	);
}
