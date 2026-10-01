import { act, renderHook } from "@testing-library/react-native";

import { useBlockDialog } from "./useBlockDialog";

describe("useBlockDialog", () => {
	it("openConfirm을 호출하면 confirmVisible이 true가 된다", async () => {
		const { result } = await renderHook(() =>
			useBlockDialog({ onBlock: jest.fn() }),
		);

		await act(() => {
			result.current.openConfirm();
		});

		expect(result.current.confirmVisible).toBe(true);
	});

	it("closeConfirm을 호출하면 confirmVisible이 false가 된다", async () => {
		const { result } = await renderHook(() =>
			useBlockDialog({ onBlock: jest.fn() }),
		);

		await act(() => {
			result.current.openConfirm();
		});
		await act(() => {
			result.current.closeConfirm();
		});

		expect(result.current.confirmVisible).toBe(false);
	});

	it("제출 중에 closeConfirm을 호출하면 다이얼로그가 닫히지 않는다", async () => {
		let resolveBlock!: () => void;
		const onBlock = jest.fn(
			() =>
				new Promise<void>((resolve) => {
					resolveBlock = resolve;
				}),
		);
		const { result } = await renderHook(() => useBlockDialog({ onBlock }));

		await act(() => {
			result.current.openConfirm();
		});

		// handleConfirm 시작 → isSubmitting = true 로 React 상태 반영
		await act(async () => {
			void result.current.handleConfirm();
		});

		// isSubmitting이 true이므로 closeConfirm은 무시돼야 함
		await act(() => {
			result.current.closeConfirm();
		});

		expect(result.current.confirmVisible).toBe(true);

		// 정리: onBlock 완료 → handleConfirm 후처리 flush
		await act(async () => {
			resolveBlock();
		});
	});

	it("handleConfirm 성공 시 successVisible이 true, confirmVisible이 false가 된다", async () => {
		const onBlock = jest.fn().mockResolvedValue(undefined);
		const { result } = await renderHook(() => useBlockDialog({ onBlock }));

		await act(() => {
			result.current.openConfirm();
		});
		await act(async () => {
			await result.current.handleConfirm();
		});

		expect(result.current.successVisible).toBe(true);
		expect(result.current.confirmVisible).toBe(false);
		expect(result.current.isSubmitting).toBe(false);
	});

	it("handleConfirm 실패 시 errorMessage가 세팅되고 isSubmitting이 false가 된다", async () => {
		const onBlock = jest.fn().mockRejectedValue(new Error("network error"));
		const { result } = await renderHook(() => useBlockDialog({ onBlock }));

		await act(() => {
			result.current.openConfirm();
		});
		await act(async () => {
			await result.current.handleConfirm();
		});

		expect(result.current.errorMessage).toBe(
			"차단 처리 중 문제가 발생했어요. 다시 시도해주세요.",
		);
		expect(result.current.isSubmitting).toBe(false);
	});

	it("closeSuccess를 호출하면 successVisible이 false가 된다", async () => {
		const onBlock = jest.fn().mockResolvedValue(undefined);
		const { result } = await renderHook(() => useBlockDialog({ onBlock }));

		await act(() => {
			result.current.openConfirm();
		});
		await act(async () => {
			await result.current.handleConfirm();
		});
		await act(() => {
			result.current.closeSuccess();
		});

		expect(result.current.successVisible).toBe(false);
	});
});
