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

	/**
	 * 부모(채팅 입력창) 위에 붙이기 위한 bottom offset.
	 * - 입력창 컨테이너 높이(+gap)를 측정해 전달하면 "항상 입력창 바로 위"를 보장할 수 있습니다.
	 */
	bottomOffset?: number;

	/** 좌우 인셋(기본 24) */
	horizontalInset?: number;

	/** 테스트용 id */
	testID?: string;
};

