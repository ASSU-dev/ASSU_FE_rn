import { Text, View } from "react-native";

interface MessageBubbleProps {
	text: string;
	variant: "sent" | "received";
}

export function MessageBubble({ text, variant }: MessageBubbleProps) {
	const isSent = variant === "sent";

	return (
		<View
			className={[
				"max-w-[260px] rounded-[10px] px-[10px] py-[10px]",
				isSent ? "bg-primary" : "bg-neutral",
			].join(" ")}
		>
			<Text
				className={[
					"font-light text-[14px]",
					isSent ? "text-content-inverse" : "text-content-primary",
				].join(" ")}
			>
				{text}
			</Text>
		</View>
	);
}
