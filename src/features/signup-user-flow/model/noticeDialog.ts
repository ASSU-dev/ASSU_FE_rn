/** 로그인 흐름에서 사용자에게 알릴 안내 — 시스템 알림 대신 NoticeDialog로 보여준다 */
export interface NoticeDialogState {
	title: string;
	message: string;
	visible: boolean;
}

export type ShowNotice = (title: string, message: string) => void;

export const INITIAL_NOTICE_DIALOG_STATE: NoticeDialogState = {
	title: "",
	message: "",
	visible: false,
};
