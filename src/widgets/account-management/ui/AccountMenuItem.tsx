import type { ComponentType } from "react";
import { Pressable, Text } from "react-native";

import {
	BanIcon,
	BellIcon,
	ExitRightIcon,
	FolderIcon,
	HeadphoneIcon,
	ListIcon,
	SpeechBubbleIcon,
	UserIcon,
	WritingIcon,
} from "@/shared/assets/icons";

import type { AccountMenuIconName, AccountMenuItemProps } from "../model/types";

type AccountIconComponent = ComponentType<{
	width?: number;
	height?: number;
}>;

const ACCOUNT_MENU_ICONS: Record<AccountMenuIconName, AccountIconComponent> = {
	ban: BanIcon,
	bell: BellIcon,
	exitRight: ExitRightIcon,
	folder: FolderIcon,
	headphone: HeadphoneIcon,
	list: ListIcon,
	speechBubble: SpeechBubbleIcon,
	user: UserIcon,
	writing: WritingIcon,
};

export function AccountMenuItem({
	label,
	iconName,
	onPress,
}: AccountMenuItemProps) {
	const Icon = ACCOUNT_MENU_ICONS[iconName];

	return (
		<Pressable
			onPress={onPress}
			disabled={!onPress}
			className="flex-row items-center gap-3 rounded-2xl bg-canvas px-4 py-4"
		>
			<Icon width={20} height={20} />
			<Text className="flex-1 text-[15px] font-medium text-content-primary">
				{label}
			</Text>
		</Pressable>
	);
}
