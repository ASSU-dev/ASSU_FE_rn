import { useQuery } from "@tanstack/react-query";
import type { Inquiry } from "@/entities/inquiry";

// Mock data
const MOCK_INQUIRIES: Inquiry[] = [
	{
		id: "1",
		title: "상호명 변경 문의드립니다.",
		createdAt: "2025-03-15 18:36",
		status: "waiting",
	},
	{
		id: "2",
		title: "제휴 관련 추가정보 문의 드립니다.",
		createdAt: "2025-03-15 18:36",
		status: "completed",
	},
	{
		id: "3",
		title: "제휴 인증이 안돼요 ㅜ",
		createdAt: "2025-03-15 18:36",
		status: "completed",
	},
];

// Mock API call - 실제 API 엔드포인트는 나중에 연결
const fetchInquiries = async () => {
	// In production, replace with actual API call:
	// return fetch("/api/inquiries").then(res => res.json());

	return new Promise<Inquiry[]>((resolve) => {
		setTimeout(() => {
			resolve(MOCK_INQUIRIES);
		}, 500);
	});
};

export function useInquiryList() {
	return useQuery<Inquiry[]>({
		queryKey: ["inquiries"],
		queryFn: () => fetchInquiries(),
	});
}
