import { NotificationToggleList } from "@/features/notification-settings";
import { AppTopBar } from "@/shared/ui/app-top-bar";
import { PageLayout } from "@/shared/ui/layout";

export function NotificationSettingsPage() {
	return (
		<PageLayout>
			<AppTopBar title="알림설정" />
			<NotificationToggleList userRole="ADMIN" />
		</PageLayout>
	);
}
