import { Ionicons } from "@expo/vector-icons";
import type { ImageSource } from "expo-image";
import type { ComponentProps } from "react";

export type AccountMenuIconName = ComponentProps<typeof Ionicons>["name"];

export interface AccountProfileHeaderProps {
	name: string;
	subtitle?: string;
	profileImage?: ImageSource;
	avatarSize?: number;
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
