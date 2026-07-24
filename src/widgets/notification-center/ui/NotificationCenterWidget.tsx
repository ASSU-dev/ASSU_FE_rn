import {
	NotificationHeader,
	NotificationSection,
} from "@/features/notifications";
import { PageLayout } from "@/shared/ui/layout";

export function NotificationCenterWidget() {
	return (
		<PageLayout contentContainerClassName="flex-1">
			<NotificationHeader />
			<NotificationSection />
		</PageLayout>
	);
}
