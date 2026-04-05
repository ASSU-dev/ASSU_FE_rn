export type SelectItem = {
	label: string;
	value: string;
	disabled?: boolean;
};

export type SelectSize = "sm" | "md";
export type SelectPresentation = "modal" | "inline";
export type SelectTextTone = "default" | "muted";

export type SelectProps = {
	/** 옵션 목록 */
	items: SelectItem[];

	/** 선택된 값 (없으면 null) */
	value: string | null;

	/** 값 변경 콜백 */
	onChange: (value: string | null) => void;

	/** placeholder 텍스트 */
	placeholder?: string;

	/** 비활성화 */
	disabled?: boolean;

	/** 값은 보이되 드롭다운은 열지 않음 */
	readOnly?: boolean;

	/** 드롭다운 표시 방식 */
	presentation?: SelectPresentation;

	/** 미선택 상태 텍스트 톤 */
	placeholderTone?: SelectTextTone;

	/** 선택되지 않은 옵션 텍스트 톤 */
	optionTone?: SelectTextTone;

	/** (옵션) 상단 라벨 */
	label?: string;

	/** (옵션) 도움말 */
	helperText?: string;

	/** (옵션) 에러 문구. 값이 있으면 에러 상태로 렌더링 */
	errorText?: string;

	/** 사이즈 */
	size?: SelectSize;

	/** 테스트용 id */
	testID?: string;
};
