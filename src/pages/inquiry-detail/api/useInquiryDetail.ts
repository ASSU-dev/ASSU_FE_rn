import { useQuery } from "@tanstack/react-query";
import type { InquiryDetail } from "@/entities/inquiry";

// Mock data
const MOCK_INQUIRY_DETAILS: InquiryDetail[] = [
	{
		id: "1",
		title: "상호명 변경 문의드립니다.",
		createdAt: "2025-03-15 18:36",
		status: "waiting",
		content:
			"안녕하세요. 역전할머니 맥주 숭실대점 대표 이수민입니다. 다름이 아니라 상호명이 역전할머니 맥주 숭실대점에서 역후할머니 맥주 숭실대점으로 변경하게 되어 이를 변경 요청하고자 문의드렸습니다. 감사합니다.",
	},
	{
		id: "2",
		title: "제휴 관련 추가정보 문의 드립니다.",
		createdAt: "2025-03-15 18:36",
		status: "completed",
		content: "제휴 관련하여 추가 정보가 필요합니다. 확인 부탁드립니다.",
		answer:
			"안녕하세요. A:SSU입니다.\n문의 주신 내용 확인하였습니다. 추가적인 안내가 필요하시면 말씀해 주세요. 감사합니다.",
	},
	{
		id: "3",
		title: "제휴 인증이 안돼요 ㅜ",
		createdAt: "2025-03-15 18:36",
		status: "completed",
		content: "제휴 인증을 시도했는데 계속 오류가 납니다. 도움 부탁드립니다.",
		answer:
			"안녕하세요. A:SSU입니다.\n제휴 인증 관련 문제를 확인하였습니다. 현재 정상적으로 처리되도록 조치하였습니다. 감사합니다.",
	},
];

const fetchInquiryDetail = async (id: string): Promise<InquiryDetail> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const inquiry = MOCK_INQUIRY_DETAILS.find((item) => item.id === id);
			if (inquiry) {
				resolve(inquiry);
			} else {
				reject(new Error("문의를 찾을 수 없습니다."));
			}
		}, 500);
	});
};

export function useInquiryDetail(id: string) {
	return useQuery<InquiryDetail>({
		queryKey: ["inquiry", id],
		queryFn: () => fetchInquiryDetail(id),
		enabled: !!id,
	});
}
