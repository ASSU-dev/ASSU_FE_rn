import { useMutation } from "@tanstack/react-query";
import { getRefreshTokenApi } from "@/shared/api";

const { refreshToken } = getRefreshTokenApi();

export function useRefreshTokenMutation() {
	return useMutation({ mutationFn: refreshToken });
}
