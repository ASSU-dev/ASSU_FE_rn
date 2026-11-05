import { act, fireEvent, render, screen } from "@testing-library/react-native";
import type { BarcodeScanningResult } from "expo-camera";
import { useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { Alert, Linking, View } from "react-native";
import { usePartnershipAuthStore } from "@/features/partnership-auth";
import { PartnershipQrAuthPage } from "./PartnershipQrAuthPage";

jest.mock("expo-router", () => {
	const { useEffect } = require("react");
	return {
		router: { push: jest.fn(), back: jest.fn(), dismissAll: jest.fn() },
		useFocusEffect: (effect: () => void) => useEffect(effect, [effect]),
	};
});

let mockOnBarcodeScanned: ((result: BarcodeScanningResult) => void) | undefined;

jest.mock("expo-camera", () => ({
	useCameraPermissions: jest.fn(),
	CameraView: (props: {
		onBarcodeScanned?: (result: BarcodeScanningResult) => void;
	}) => {
		mockOnBarcodeScanned = props.onBarcodeScanned;
		return null;
	},
}));

jest.mock("react-native-safe-area-context", () => ({
	useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

// 카메라 영역과 스캔 프레임이 모두 (0,0)에서 시작하는 200x200 영역이라고 가정한다.
const FRAME_SIZE = 200;

const GROUP_QR = `assu-app://student/partnership-group-participant?payload=${encodeURIComponent(
	JSON.stringify({
		type: "ASSU_GROUP_CERTIFICATION",
		version: 1,
		adminId: 10,
		sessionId: 321,
		storeId: 7,
		storeName: "숭실 분식",
		contentId: 2,
		adminName: "총학생회",
		partnershipContent: "4인 이상 10% 할인",
		goods: ["떡볶이"],
		requiredPeople: 4,
	}),
)}`;

function mockCameraPermission(
	permission: { granted: boolean; status: string } | null,
): void {
	jest
		.mocked(useCameraPermissions)
		.mockReturnValue([
			permission,
			jest.fn(),
			jest.fn(),
		] as unknown as ReturnType<typeof useCameraPermissions>);
}

// 카메라 권한이 허용된 상태로 화면을 띄우고 스캔 프레임 위치를 측정시킨다.
function renderScannerWithCameraGranted(): void {
	mockCameraPermission({ granted: true, status: "granted" });
	render(<PartnershipQrAuthPage />);
	const scanFrame = screen.UNSAFE_root.findAll(
		(node: { props: { onLayout?: unknown } }) =>
			typeof node.props.onLayout === "function",
	)[0];
	fireEvent(scanFrame, "layout", {
		nativeEvent: {
			layout: { x: 0, y: 0, width: FRAME_SIZE, height: FRAME_SIZE },
		},
	});
}

function scanQr(data: string, center = { x: 100, y: 100 }): void {
	act(() => {
		mockOnBarcodeScanned?.({
			data,
			type: "qr",
			cornerPoints: [center],
			bounds: { origin: center, size: { width: 0, height: 0 } },
		} as BarcodeScanningResult);
	});
}

describe("PartnershipQrAuthPage QR 확인 후 인증 흐름 분기", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockOnBarcodeScanned = undefined;
		jest
			.spyOn(View.prototype as unknown as View, "measureInWindow")
			.mockImplementation((callback) => callback(0, 0, FRAME_SIZE, FRAME_SIZE));
		jest.spyOn(Alert, "alert").mockImplementation(() => {});
		usePartnershipAuthStore.getState().reset();
	});

	it("단체 인증 QR을 확인하면 참여자로 세션에 합류하고 참여 화면으로 이동한다", () => {
		// Given
		renderScannerWithCameraGranted();
		scanQr(GROUP_QR);

		// When
		fireEvent.press(screen.getByText("확인"));

		// Then
		const { store, selectedBenefit, groupSession } =
			usePartnershipAuthStore.getState();
		expect(store?.storeName).toBe("숭실 분식");
		expect(selectedBenefit).toMatchObject({ id: 2, type: "GROUP", people: 4 });
		expect(groupSession).toMatchObject({
			sessionId: 321,
			requiredPeople: 4,
			role: "PARTICIPANT",
			status: "WAITING",
		});
		expect(router.push).toHaveBeenCalledWith(
			"/(protected)/student/partnership-group-participant",
		);
	});

	it("매장 QR을 확인하면 해당 매장의 혜택 선택 화면으로 이동한다", () => {
		// Given
		renderScannerWithCameraGranted();
		scanQr('{"storeId":7}');

		// When
		fireEvent.press(screen.getByText("확인"));

		// Then
		expect(router.push).toHaveBeenCalledWith({
			pathname: "/(protected)/student/partnership-benefit-select",
			params: { storeId: 7 },
		});
	});

	it("제휴 QR이 아니면 실패를 안내하고 다시 스캔할 수 있게 한다", () => {
		// Given
		renderScannerWithCameraGranted();
		scanQr("https://example.com/not-assu");

		// When
		fireEvent.press(screen.getByText("확인"));

		// Then
		expect(Alert.alert).toHaveBeenCalledWith(
			"QR 확인 실패",
			"올바른 제휴 QR 코드가 아닙니다.",
		);
		expect(router.push).not.toHaveBeenCalled();
		expect(screen.getByText("제휴 QR 코드를 스캔해주세요")).toBeOnTheScreen();
	});

	it("스캔 프레임 밖에서 인식된 QR은 무시한다", () => {
		// Given
		renderScannerWithCameraGranted();

		// When
		scanQr('{"storeId":7}', { x: FRAME_SIZE + 50, y: FRAME_SIZE + 50 });
		fireEvent.press(screen.getByText("확인"));

		// Then
		expect(screen.getByText("제휴 QR 코드를 스캔해주세요")).toBeOnTheScreen();
		expect(router.push).not.toHaveBeenCalled();
	});

	it("카메라 권한이 거부되면 설정 이동 안내를 보여 주고 앱 설정을 연다", () => {
		// Given
		mockCameraPermission({ granted: false, status: "denied" });
		const openSettings = jest
			.spyOn(Linking, "openSettings")
			.mockResolvedValue(undefined);
		render(<PartnershipQrAuthPage />);

		// When
		fireEvent.press(screen.getByText("앱 설정 열기"));

		// Then
		expect(
			screen.getByText(/QR 코드를 스캔하려면 카메라 접근이 필요합니다/),
		).toBeOnTheScreen();
		expect(openSettings).toHaveBeenCalled();
	});
});
