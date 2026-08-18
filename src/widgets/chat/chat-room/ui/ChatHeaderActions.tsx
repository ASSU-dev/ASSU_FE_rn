import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { BlockUserDialog, useBlockDialog } from "@/features/chat-block-user";
import {
	LeaveChatRoomDialog,
	useLeaveChatRoom,
} from "@/features/chat-leave-room";
import { BanIcon, ExitRightIcon } from "@/shared/assets/icons";
import { shadows } from "@/shared/styles/shadows";
import { colorTokens } from "@/shared/styles/tokens";

import type { ChatHeaderActionsProps } from "../model/types";

export function ChatHeaderActions({
	partnerName,
	onBlock,
	onLeave,
}: ChatHeaderActionsProps) {
	const [menuVisible, setMenuVisible] = useState(false);
	const blockDialog = useBlockDialog({ onBlock });
	const leaveChatRoom = useLeaveChatRoom({ onLeave });

	function handleMenuBlock() {
		setMenuVisible(false);
		blockDialog.openConfirm();
	}

	return (
		<View className="relative z-50 flex-row items-center gap-3">
			<Pressable hitSlop={8} onPress={leaveChatRoom.open}>
				<ExitRightIcon
					width={24}
					height={24}
					color={colorTokens.contentPrimary}
				/>
			</Pressable>

			<Pressable
				hitSlop={8}
				onPress={() => setMenuVisible((visible) => !visible)}
			>
				<BanIcon width={24} height={24} color={colorTokens.contentPrimary} />
			</Pressable>

			{menuVisible ? (
				<Pressable
					onPress={handleMenuBlock}
					className="absolute top-[32px] right-0 z-50 rounded-[8px] bg-canvas px-4 py-3"
					style={shadows.neutral}
				>
					<Text className="text-[14px] font-regular text-content-primary">
						차단하기
					</Text>
				</Pressable>
			) : null}

			<LeaveChatRoomDialog state={leaveChatRoom} />
			<BlockUserDialog partnerName={partnerName} state={blockDialog} />
		</View>
	);
}
