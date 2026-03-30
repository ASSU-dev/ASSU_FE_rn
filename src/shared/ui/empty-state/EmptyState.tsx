import { Text, View } from "react-native";

interface EmptyStateProps {
	title: string;
	description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
	return (
		<View className="items-center gap-2 px-6 py-32">
			<Text className="w-full text-center text-base font-medium text-content-primary">
				{title}
			</Text>
			<Text className="w-full text-center text-sm font-regular text-content-secondary">
				{description}
			</Text>
		</View>
	);
}
