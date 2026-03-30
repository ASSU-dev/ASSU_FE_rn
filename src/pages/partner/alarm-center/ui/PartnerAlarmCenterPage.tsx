import type { Notification } from "@/entities/notification/model/types";
import { PageLayout } from "@/shared/ui/layout";
import { AlarmCenterHeader, AlarmCenterSection } from "@/widgets/alarm-center";

// TODO: features/view-notifications 구현 후 실제 API 데이터로 교체
const MOCK_NOTIFICATIONS: Notification[] = [
	{
		id: "1",
		category: "제휴 건의",
		message: "새로운 제휴 건의가 도착했어요!",
		createdAt: new Date(Date.now() - 10 * 60 * 1000),
		isRead: true,
	},
	{
		id: "2",
		category: "제휴 제안",
		message: "역전할머니맥주 어쩌 숭실대점에서 제휴 제안이 왔어요!",
		createdAt: new Date(Date.now() - 60 * 60 * 1000),
		isRead: true,
	},
	{
		id: "3",
		category: "제휴 제안",
		message: "역전할머니맥주 숭실대점에서 제휴 제안이 왔어요! 역전할머니맥주",
		createdAt: new Date(Date.now() - 60 * 60 * 1000),
		isRead: false,
	},
	{
		id: "4",
		category: "제휴 제안",
		message: "역전할머니맥주 숭실대점에서 제휴 제안이 왔어요!",
		createdAt: new Date(Date.now() - 60 * 60 * 1000),
		isRead: false,
	},
];

export function PartnerAlarmCenterPage() {
	return (
		<PageLayout contentContainerClassName="flex-1">
			<AlarmCenterHeader />
			<AlarmCenterSection notifications={MOCK_NOTIFICATIONS} />
		</PageLayout>
	);
}
