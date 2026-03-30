import { useMutation } from "@tanstack/react-query";
import type { InquiryFormData } from "../model/types";

// Mock API call - 실제 API 엔드포인트는 나중에 연결
const submitInquiry = async (data: InquiryFormData) => {
	// In production, replace with actual API call:
	// return fetch("/api/inquiries", {
	//   method: "POST",
	//   headers: { "Content-Type": "application/json" },
	//   body: JSON.stringify(data),
	// }).then(res => res.json());

	// Mock response
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({ id: `mock-${Date.now()}`, ...data });
		}, 500);
	});
};

export function useSubmitInquiry() {
	return useMutation({
		mutationFn: (data: InquiryFormData) => submitInquiry(data),
	});
}
