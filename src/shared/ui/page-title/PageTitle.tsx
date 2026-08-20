import { Text } from "react-native";

interface PageTitleProps {
	title: string;
}

export function PageTitle({ title }: PageTitleProps) {
	return (
		<Text className="mt-6 mb-8 px-1 text-[22px] font-semibold leading-caption tracking-caption text-content-primary">
			{title}
		</Text>
	);
}
