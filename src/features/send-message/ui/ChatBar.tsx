import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

import { colorTokens } from "@/shared/styles/tokens";

interface ChatBarProps {
	onSend: (message: string) => void;
	onAttach?: () => void;
}

export function ChatBar({ onSend, onAttach }: ChatBarProps) {
	const [text, setText] = useState("");

	const canSend = text.trim().length > 0;

	function handleSend() {
		if (!canSend) return;
		onSend(text.trim());
		setText("");
	}

	return (
		<View className="px-screen-m pt-[18px] pb-[21px]">
			<View className="flex-row items-end rounded-[10px] bg-neutral px-[10px] py-[10px] gap-[10px]">
				{/* 첨부(+) 버튼 */}
				<TouchableOpacity onPress={onAttach} activeOpacity={0.7}>
					<Ionicons name="add" size={22} color={colorTokens.contentSecondary} />
				</TouchableOpacity>

				{/* 텍스트 입력 */}
				<TextInput
					className="flex-1 font-light text-[14px] leading-[22px] text-content-primary"
					style={{ paddingVertical: 0 }}
					value={text}
					onChangeText={setText}
					multiline
				/>

				{/* 전송 버튼 */}
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
