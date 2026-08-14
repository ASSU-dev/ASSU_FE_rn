import { isAxiosError } from "axios";

type LoginErrorResponse = {
	message?: unknown;
	result?: unknown;
};

function getFirstResultMessage(result: unknown): string | null {
	if (typeof result === "string") {
		return result.trim() ? result : null;
	}

	if (result && typeof result === "object") {
		const messages = Object.values(result).filter(
			(value): value is string =>
				typeof value === "string" && value.trim() !== "",
		);

		return messages[0] ?? null;
	}

	return null;
}

export function getLoginErrorMessage(
	error: unknown,
	fallback = "로그인에 실패했습니다.",
) {
	if (!isAxiosError(error)) {
		return fallback;
	}

	const response = error.response?.data as LoginErrorResponse | undefined;
	const resultMessage = getFirstResultMessage(response?.result);

	if (resultMessage) {
		return resultMessage;
	}

	if (typeof response?.message === "string" && response.message.trim() !== "") {
		return response.message;
	}

	return fallback;
}
