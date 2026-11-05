import { useMapFilterStore } from "./useMapFilterStore";

describe("지도 카테고리·학생회 칩 선택", () => {
	beforeEach(() => {
		useMapFilterStore.getState().reset();
	});

	it("카테고리 칩을 탭하면 해당 카테고리가 선택된다", () => {
		useMapFilterStore.getState().toggleStoreCategory("CAFE");

		expect(useMapFilterStore.getState().storeCategory).toBe("CAFE");
	});

	it("선택된 카테고리 칩을 다시 탭하면 선택이 해제된다", () => {
		// Given
		useMapFilterStore.getState().toggleStoreCategory("CAFE");

		// When
		useMapFilterStore.getState().toggleStoreCategory("CAFE");

		// Then
		expect(useMapFilterStore.getState().storeCategory).toBeNull();
	});

	it("다른 카테고리 칩을 탭하면 새 카테고리로 바뀐다", () => {
		// Given
		useMapFilterStore.getState().toggleStoreCategory("CAFE");

		// When
		useMapFilterStore.getState().toggleStoreCategory("RESTAURANT");

		// Then
		expect(useMapFilterStore.getState().storeCategory).toBe("RESTAURANT");
	});

	it("선택된 학생회 칩을 다시 탭하면 선택이 해제되고, 다른 학생회를 탭하면 바뀐다", () => {
		// Given
		const { toggleAdminId } = useMapFilterStore.getState();
		toggleAdminId("3");

		// When & Then
		toggleAdminId("5");
		expect(useMapFilterStore.getState().adminId).toBe("5");

		toggleAdminId("5");
		expect(useMapFilterStore.getState().adminId).toBeNull();
	});

	it("필터를 초기화하면 카테고리와 학생회 선택이 모두 해제된다", () => {
		// Given
		useMapFilterStore.getState().toggleStoreCategory("CAFE");
		useMapFilterStore.getState().toggleAdminId("3");

		// When
		useMapFilterStore.getState().reset();

		// Then
		expect(useMapFilterStore.getState()).toMatchObject({
			storeCategory: null,
			adminId: null,
		});
	});
});
