import type { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import type { UserType } from "@/entities/user/model/types";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

/**
 * TODO: SVG 머지 후 activeIconName/inactiveIconName 필드를
 *       Icon: ComponentType<{ size: number; color: string }> 으로 교체
 */
export interface TabItem {
	route: string;
	label: string;
	activeIconName: IoniconName;
	inactiveIconName: IoniconName;
}

export const TAB_CONFIG: Record<UserType, TabItem[]> = {
	STUDENT: [
		{
			route: "home",
			label: "홈",
			activeIconName: "home",
			inactiveIconName: "home-outline",
		},
		{
			route: "map",
			label: "맵",
			activeIconName: "location",
			inactiveIconName: "location-outline",
		},
		{
			route: "suggestion",
			label: "제휴건의함",
			activeIconName: "pricetag",
			inactiveIconName: "pricetag-outline",
		},
		{
			route: "profile",
			label: "프로필",
			activeIconName: "person",
			inactiveIconName: "person-outline",
		},
	],
	ADMIN: [
		{
			route: "home",
			label: "홈",
			activeIconName: "home",
			inactiveIconName: "home-outline",
		},
		{
			route: "map",
			label: "맵",
			activeIconName: "location",
			inactiveIconName: "location-outline",
		},
		{
			route: "dashboard",
			label: "대시보드",
			activeIconName: "bar-chart",
			inactiveIconName: "bar-chart-outline",
		},
		{
			route: "chat",
			label: "채팅",
			activeIconName: "chatbubble",
			inactiveIconName: "chatbubble-outline",
		},
		{
			route: "profile",
			label: "프로필",
			activeIconName: "person",
			inactiveIconName: "person-outline",
		},
	],
	PARTNER: [
		{
			route: "home",
			label: "홈",
			activeIconName: "home",
			inactiveIconName: "home-outline",
		},
		{
			route: "map",
			label: "맵",
			activeIconName: "location",
			inactiveIconName: "location-outline",
		},
		{
			route: "dashboard",
			label: "대시보드",
			activeIconName: "bar-chart",
			inactiveIconName: "bar-chart-outline",
		},
		{
			route: "chat",
			label: "채팅",
			activeIconName: "chatbubble",
			inactiveIconName: "chatbubble-outline",
		},
		{
			route: "profile",
			label: "프로필",
			activeIconName: "person",
			inactiveIconName: "person-outline",
		},
	],
};
