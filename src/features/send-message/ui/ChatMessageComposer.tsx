import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

import { colorTokens } from "@/shared/styles/tokens";

interface ChatMessageComposerProps {
	onSend: (message: string) => void;
	onAttach?: () => void;
}

export function ChatMessageComposer({
	onSend,
	onAttach,
}: ChatMessageComposerProps) {
	const [text, setText] = useState("");

	const canSend = text.trim().length > 0;

	function handleSend() {
		if (!canSend) return;
		onSend(text.trim());
		setText("");
	}

	return (
		<View className="px-screen-m pt-[18px] pb-[21px]">
			<View className="flex-row items-end rounded-[10px] bg-neutral px-[10px] pt-[10px] pb-[12px] gap-[10px]">
				<TouchableOpacity onPress={onAttach} activeOpacity={0.7}>
					<Ionicons name="add" size={22} color={colorTokens.contentSecondary} />
				</TouchableOpacity>

				<TextInput
					className="flex-1 font-light text-[14px] leading-[22px] text-content-primary"
					style={{
						paddingVertical: 0,
						textAlignVertical: "top",
						includeFontPadding: false,
						minHeight: 22,
						maxHeight: 220,
					}}
					value={text}
					onChangeText={setText}
					multiline
				/>

				<TouchableOpacity
					onPress={handleSend}
					disabled={!canSend}
					activeOpacity={0.7}
					className="py-[2px]"
				>
					<Ionicons
						name="send"
						size={18}
						color={canSend ? colorTokens.primary : colorTokens.contentSecondary}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
}
