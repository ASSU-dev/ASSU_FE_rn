import { useQuery } from "@tanstack/react-query";
import { getGetSettingsApi } from "@/shared/api";

const { getSettings } = getGetSettingsApi();

export function useGetSettingsQuery() {
	return useQuery({
		queryKey: ["notiSettings"],
		queryFn: getSettings,
	});
}
