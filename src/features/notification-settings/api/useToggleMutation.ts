import { useMutation } from "@tanstack/react-query";
import { getToggleApi } from "@/shared/api";

const { toggle } = getToggleApi();

export function useToggleMutation() {
	return useMutation({ mutationFn: toggle });
}
