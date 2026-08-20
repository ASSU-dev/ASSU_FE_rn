import type { BaseResponse } from "@/entities/partnership";
import { apiInstance } from "@/shared/api/instance";

/** DELETE /partnership/suspended/{paperId} — 대기 중(SUSPEND) 제휴 계약서 삭제 */
export async function deleteSuspendedPaper(paperId: number): Promise<void> {
	if (__DEV__) console.log("[deleteSuspendedPaper] 요청:", { paperId });
	const res = await apiInstance.delete<BaseResponse<unknown>>(
		`/partnership/suspended/${paperId}`,
	);
	if (!res.data.isSuccess) {
		throw new Error(res.data.message || "제휴 계약서 삭제에 실패했습니다.");
	}
	if (__DEV__)
		console.log("[deleteSuspendedPaper] 응답:", {
			paperId,
			code: res.data.code,
		});
}
