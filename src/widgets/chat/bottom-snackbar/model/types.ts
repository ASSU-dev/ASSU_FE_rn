import type { ReactNode } from "react";

export type BottomSnackbarProps = {
	/** 노출 여부 (외부 상태로 제어) */
	visible: boolean;

	/** 제목 */
	title: string;

	/** 부제목 */
	subtitle?: string;

	/**
	 * 하단 액션 영역.
	 * 버튼 1개/2개 등 원하는 UI를 그대로 넣습니다.
	 */
	actions?: ReactNode;

	/** 테스트용 id */
	testID?: string;
};

