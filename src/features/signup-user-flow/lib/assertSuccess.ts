export function assertSuccess<R>(
	response: { isSuccess?: boolean; result?: R; message?: string },
	fallback: string,
): asserts response is {
	isSuccess: true;
	result: NonNullable<R>;
	message?: string;
} {
	if (!response.isSuccess || response.result == null) {
		throw new Error(response.message ?? fallback);
	}
}
