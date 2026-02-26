import { Text } from "react-native";

interface MessageTimeProps {
	time: string;
	variant: "sent" | "received";
}

export function MessageTime({ time, variant }: MessageTimeProps) {
	return (
		<Text
			className={[
				"font-light text-[11px] leading-[16px] text-[#666666]",
				variant === "sent" ? "text-right" : "text-left",
			].join(" ")}
		>
			{time}
		</Text>
	);
}
