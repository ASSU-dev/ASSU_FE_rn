import { useQueryClient } from "@tanstack/react-query";

import type { BaseResponseNotificationSettingsResponseDTO } from "@/shared/api";

import { useGetSettingsQuery } from "../api/useGetSettingsQuery";
import { useToggleMutation } from "../api/useToggleMutation";
import { NOTIFICATION_ITEMS } from "./notificationItems";
import type { NotificationRole, NotificationType } from "./types";

export function useNotificationSettings(role: NotificationRole) {
	const { parent, children } = NOTIFICATION_ITEMS[role];
	const queryClient = useQueryClient();

	const { data, isLoading, error } = useGetSettingsQuery();
	const settings = data?.result?.settings ?? {};

	const childSettings = Object.fromEntries(
		children.map((item) => [item.key, settings[item.key] ?? false]),
	);

	const isPushEnabled = Object.values(childSettings).some(Boolean);

	const { mutate: toggle } = useToggleMutation();

	const syncCache = (
		responseData: BaseResponseNotificationSettingsResponseDTO,
	) => {
		queryClient.setQueryData(["getSettings"], responseData);
	};

	const togglePush = () => toggle(parent.key, { onSuccess: syncCache });
	const toggleChild = (key: NotificationType) =>
		toggle(key, { onSuccess: syncCache });

	return {
		parent,
		children,
		childSettings,
		isPushEnabled,
		togglePush,
		toggleChild,
		isLoading,
		error,
	};
}
