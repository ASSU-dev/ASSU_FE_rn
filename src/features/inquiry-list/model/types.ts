export interface Inquiry {
	id: string;
	title: string;
	createdAt: string; // Format: YYYY-MM-DD HH:MM
	status: "waiting" | "completed";
}
