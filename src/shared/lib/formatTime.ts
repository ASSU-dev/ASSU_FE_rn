import { format } from "date-fns";

export function formatChatTime(date: Date = new Date()): string {
	return format(date, "HH:mm");
}
