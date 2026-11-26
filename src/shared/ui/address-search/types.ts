export type AddressSearchItem = {
	id: string;
	label: string;
	latitude?: number;
	longitude?: number;
	/** 장소 이름 — 장소 정보 전체가 필요한 화면(제휴 수동 등록 등)에서 사용 */
	name?: string;
	/** 지번 주소 */
	address?: string;
	/** 도로명 주소 */
	roadAddress?: string;
};
