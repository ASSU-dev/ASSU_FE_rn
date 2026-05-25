export const BLOCK_USER_DIALOG = {
	confirm: {
		title: "정말로 차단하시겠습니까?",
		body: "차단하실 경우 대화내용은 삭제되고,\n채팅 목록도 제거됩니다.",
		cancel: "취소",
		confirm: "차단하기",
	},
	success: {
		title: "차단이 완료되었습니다!",
		bodySuffix:
			"(이)가 차단되었습니다.\n차단 해제는 계정관리 탭을 확인해주세요.",
		confirm: "확인",
	},
} as const;
