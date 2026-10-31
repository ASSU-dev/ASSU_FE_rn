import { screen } from "@testing-library/react-native";
import { renderWithProviders } from "@/shared/lib/test-utils";
import { useStudentHomeData } from "../model/useStudentHomeData";
import { StudentHomeWidget } from "./StudentHomeWidget";

jest.mock("expo-router", () => ({
	router: { push: jest.fn(), replace: jest.fn() },
	useRouter: () => ({ push: jest.fn() }),
	useFocusEffect: jest.fn(),
}));

jest.mock("react-native-keyboard-controller", () => {
	const { ScrollView } = require("react-native");
	return { KeyboardAwareScrollView: ScrollView };
});

jest.mock("@/features/qr-auth/ui/QRScannerButton", () => {
	const { Text } = require("react-native");
	return { QRScannerButton: () => <Text>QR_BUTTON</Text> };
});

jest.mock("../ad-list/ui/HomeAdList", () => {
	const { Text } = require("react-native");
	return { HomeAdList: () => <Text>AD_LIST</Text> };
});

jest.mock("../tab-section/ui/HomeTabSection", () => {
	const { Text } = require("react-native");
	return {
		HomeTabSection: ({ stampCount }: { stampCount: number }) => (
			<Text>{`TAB_SECTION:${stampCount}`}</Text>
		),
	};
});

jest.mock("../curation-section/ui/HomeCurationSection", () => {
	const { Text } = require("react-native");
	return {
		HomeCurationSection: ({
			groupTitle,
			isLoading,
		}: {
			groupTitle?: string;
			isLoading?: boolean;
		}) => (
			<Text>{`CURATION:${isLoading ? "loading" : (groupTitle ?? "none")}`}</Text>
		),
	};
});

jest.mock("../model/useStudentHomeData", () => ({
	useStudentHomeData: jest.fn(),
}));

type HomeData = ReturnType<typeof useStudentHomeData>;

function mockHomeData(overrides: Partial<HomeData>): void {
	jest.mocked(useStudentHomeData).mockReturnValue({
		userName: "사용자",
		stampCount: 0,
		curationResult: undefined,
		curationLists: undefined,
		isCurationLoading: false,
		...overrides,
	} as HomeData);
}

describe("StudentHomeWidget 인사말", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("훅이 반환한 이름을 그대로 인사말에 사용한다", () => {
		mockHomeData({ userName: "홍길동" });

		renderWithProviders(<StudentHomeWidget />);

		expect(screen.getByText("안녕하세요, 홍길동님!")).toBeTruthy();
	});

	it("이름이 비었을 때는 훅의 fallback 값을 그대로 사용한다", () => {
		// useStudentHomeData 훅이 fallback("사용자")을 책임지므로 홈 위젯은 그대로 노출만 한다
		mockHomeData({ userName: "사용자" });

		renderWithProviders(<StudentHomeWidget />);

		expect(screen.getByText("안녕하세요, 사용자님!")).toBeTruthy();
	});
});

describe("StudentHomeWidget 큐레이션 섹션", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("큐레이션 로딩 중일 때 두 섹션 모두에 로딩 상태를 전달한다", () => {
		mockHomeData({ isCurationLoading: true });

		renderWithProviders(<StudentHomeWidget />);

		expect(screen.getAllByText("CURATION:loading")).toHaveLength(2);
	});

	it("큐레이션 응답의 두 그룹을 각각 다른 섹션에 전달한다", () => {
		mockHomeData({
			isCurationLoading: false,
			curationResult: {
				curationTitle: "홍길동님을 위한 추천",
				curationLists: [
					{ groupIndex: 1, groupTitle: "첫 번째 그룹", stores: [] },
					{ groupIndex: 2, groupTitle: "두 번째 그룹", stores: [] },
				],
			},
			curationLists: [
				{ groupIndex: 1, groupTitle: "첫 번째 그룹", stores: [] },
				{ groupIndex: 2, groupTitle: "두 번째 그룹", stores: [] },
			],
		});

		renderWithProviders(<StudentHomeWidget />);

		expect(screen.getByText("CURATION:첫 번째 그룹")).toBeTruthy();
		expect(screen.getByText("CURATION:두 번째 그룹")).toBeTruthy();
	});
});

describe("StudentHomeWidget 스탬프 카운트", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("훅의 stampCount를 HomeTabSection에 그대로 전달한다", () => {
		mockHomeData({ stampCount: 7 });

		renderWithProviders(<StudentHomeWidget />);

		expect(screen.getByText("TAB_SECTION:7")).toBeTruthy();
	});
});
