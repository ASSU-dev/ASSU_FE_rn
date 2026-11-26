import { fireEvent, render, screen } from "@testing-library/react-native";
import { NoticeDialog } from "./NoticeDialog";

describe("NoticeDialog 로그인 안내", () => {
	it("제목과 메시지를 보여준다", () => {
		render(
			<NoticeDialog
				visible
				title="로그인 실패"
				message="로그인에 실패했습니다."
				onClose={jest.fn()}
			/>,
		);

		expect(screen.getByText("로그인 실패")).toBeTruthy();
		expect(screen.getByText("로그인에 실패했습니다.")).toBeTruthy();
	});

	it("확인을 누르면 닫는다", () => {
		const onClose = jest.fn();
		render(
			<NoticeDialog
				visible
				title="가입 승인 대기 중"
				message="백오피스 승인 후 로그인할 수 있습니다."
				onClose={onClose}
			/>,
		);

		fireEvent.press(screen.getByText("확인"));

		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it("visible이 false이면 내용을 보여주지 않는다", () => {
		render(
			<NoticeDialog
				visible={false}
				title="로그인 실패"
				message="로그인에 실패했습니다."
				onClose={jest.fn()}
			/>,
		);

		expect(screen.queryByText("로그인 실패")).toBeNull();
	});
});
