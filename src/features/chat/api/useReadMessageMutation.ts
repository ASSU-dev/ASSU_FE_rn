import { useMutation } from "@tanstack/react-query";
import { getReadMessageApi } from "@/shared/api";

const { readMessage } = getReadMessageApi();

export function useReadMessageMutation() {
	return useMutation({ mutationFn: readMessage });
}
