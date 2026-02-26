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
	customer: [
		{
			route: "index",
			label: "홈",
			activeIconName: "home",
			inactiveIconName: "home-outline",
		},
		{
			route: "nearby",
			label: "내 주변",
			activeIconName: "location",
			inactiveIconName: "location-outline",
		},
		{
			route: "coupons",
			label: "제휴권의함",
			activeIconName: "pricetag",
			inactiveIconName: "pricetag-outline",
		},
		{
			route: "account",
			label: "계정관리",
			activeIconName: "person",
			inactiveIconName: "person-outline",
		},
	],
	manager: [
		{
			route: "index",
			label: "홈",
			activeIconName: "home",
			inactiveIconName: "home-outline",
		},
		{
			route: "nearby",
			label: "주변 매장",
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
			route: "account",
			label: "계정관리",
			activeIconName: "person",
			inactiveIconName: "person-outline",
		},
	],
	company: [
		{
			route: "index",
			label: "홈",
			activeIconName: "home",
			inactiveIconName: "home-outline",
		},
		{
			route: "nearby",
			label: "주변 업체",
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
			route: "account",
			label: "계정관리",
			activeIconName: "person",
			inactiveIconName: "person-outline",
		},
	],
};
