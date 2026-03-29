import { Text } from "react-native";

interface PageTitleProps {
	title: string;
}

export function PageTitle({ title }: PageTitleProps) {
	return (
		<Text className="mb-10 text-2xl font-semibold text-content-primary">
			{title}
		</Text>
	);
}
