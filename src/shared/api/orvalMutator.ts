import type { AxiosRequestConfig } from "axios";
import { apiInstance } from "./instance";

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
	return apiInstance(config).then((res) => res.data);
};
