import type { ImageSource } from "expo-image";

export type AccountMenuIconName =
	| "ban"
	| "bell"
	| "exitRight"
	| "folder"
	| "headphone"
	| "list"
	| "speechBubble"
	| "user"
	| "writing";

export interface AccountProfileHeaderProps {
	name: string;
	subtitle?: string;
	profileImage?: ImageSource;
	avatarSize?: number;
	onProfileImagePress?: () => void;
}

export interface AccountMenuItemProps {
	label: string;
	iconName: AccountMenuIconName;
	onPress?: () => void;
}

export interface AccountMenuSectionProps {
	title: string;
	items: AccountMenuItemProps[];
}
