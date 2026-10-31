import { act, renderHook } from "@testing-library/react-native";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { SOONGSIL } from "@/shared/config/map";
import { useUserLocation } from "./useUserLocation";

jest.mock("expo-router", () => {
	const { useEffect } = require("react");
	return {
		// 화면 포커스를 마운트 시점으로 대체한다.
		useFocusEffect: (effect: () => undefined | (() => void)) =>
			useEffect(effect, [effect]),
	};
});

jest.mock("expo-location", () => ({
	Accuracy: { High: 4 },
	getForegroundPermissionsAsync: jest.fn(),
	requestForegroundPermissionsAsync: jest.fn(),
	getLastKnownPositionAsync: jest.fn(),
	getCurrentPositionAsync: jest.fn(),
	watchPositionAsync: jest.fn(),
	watchHeadingAsync: jest.fn(),
}));

const CURRENT_POSITION = { lat: 37.51, lng: 126.96 };

interface PermissionState {
	status: "granted" | "denied" | "undetermined";
	canAskAgain: boolean;
}

function toPermissionResponse(
	permission: PermissionState,
): Location.LocationPermissionResponse {
	return permission as unknown as Location.LocationPermissionResponse;
}

function mockPermissionRequest(permission: PermissionState): void {
	jest
		.mocked(Location.requestForegroundPermissionsAsync)
		.mockResolvedValue(toPermissionResponse(permission));
}

/**
 * 현재 권한 상태로 훅을 렌더하고, 권한·좌표 조회와 상태 반영이 모두 끝난 결과를 돌려준다.
 * 첫 권한 응답을 act 안에서 풀어 주어 모든 상태 변경이 act 범위에서 일어나게 한다.
 */
async function renderLocationHook(currentPermission: PermissionState) {
	let resolvePermission: (value: Location.LocationPermissionResponse) => void =
		() => {};
	jest.mocked(Location.getForegroundPermissionsAsync).mockReturnValue(
		new Promise((resolve) => {
			resolvePermission = resolve;
		}),
	);

	const hook = await renderHook(() => useUserLocation());
	await act(async () => {
		resolvePermission(toPermissionResponse(currentPermission));
		// 이후 mock은 즉시 resolve되므로 macrotask 한 번이면 비동기 체인이 모두 끝난다.
		await new Promise((resolve) => setTimeout(resolve, 0));
	});
	return hook;
}

describe("useUserLocation 위치 권한에 따른 지도 시작 위치", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.spyOn(Alert, "alert").mockImplementation(() => {});
		jest.mocked(Location.getLastKnownPositionAsync).mockResolvedValue(null);
		jest.mocked(Location.getCurrentPositionAsync).mockResolvedValue({
			coords: {
				latitude: CURRENT_POSITION.lat,
				longitude: CURRENT_POSITION.lng,
			},
		} as unknown as Location.LocationObject);
		jest
			.mocked(Location.watchPositionAsync)
			.mockResolvedValue({ remove: jest.fn() });
		jest
			.mocked(Location.watchHeadingAsync)
			.mockResolvedValue({ remove: jest.fn() });
	});

	it("위치 권한이 허용되어 있으면 현재 위치에서 지도를 열고 내 위치를 표시한다", async () => {
		// When
		const { result, unmount } = await renderLocationHook({
			status: "granted",
			canAskAgain: true,
		});

		// Then
		expect(result.current.center).toEqual(CURRENT_POSITION);
		expect(result.current.myLocation).toEqual(CURRENT_POSITION);
		expect(Location.requestForegroundPermissionsAsync).not.toHaveBeenCalled();
		await unmount();
	});

	it("권한을 아직 정하지 않았으면 권한을 요청하고, 허용하면 현재 위치를 사용한다", async () => {
		// Given
		mockPermissionRequest({ status: "granted", canAskAgain: true });

		// When
		const { result, unmount } = await renderLocationHook({
			status: "undetermined",
			canAskAgain: true,
		});

		// Then
		expect(result.current.center).toEqual(CURRENT_POSITION);
		expect(Location.requestForegroundPermissionsAsync).toHaveBeenCalledTimes(1);
		await unmount();
	});

	it("권한 요청을 거부하면 숭실대에서 지도를 열고 내 위치는 표시하지 않는다", async () => {
		// Given
		mockPermissionRequest({ status: "denied", canAskAgain: true });

		// When
		const { result, unmount } = await renderLocationHook({
			status: "undetermined",
			canAskAgain: true,
		});

		// Then
		expect(result.current.center).toEqual(SOONGSIL);
		expect(result.current.myLocation).toBeNull();
		expect(Location.getCurrentPositionAsync).not.toHaveBeenCalled();
		expect(Alert.alert).not.toHaveBeenCalled();
		await unmount();
	});

	it("다시 묻지 않도록 거부된 상태면 숭실대에서 지도를 열고 설정 안내를 띄운다", async () => {
		// When
		const { result, unmount } = await renderLocationHook({
			status: "denied",
			canAskAgain: false,
		});

		// Then
		expect(result.current.center).toEqual(SOONGSIL);
		expect(result.current.myLocation).toBeNull();
		expect(Location.requestForegroundPermissionsAsync).not.toHaveBeenCalled();
		expect(Alert.alert).toHaveBeenCalledWith(
			"위치 권한 필요",
			expect.any(String),
			expect.any(Array),
		);
		await unmount();
	});
});
