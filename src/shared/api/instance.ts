import axios from "axios";
import { ENV } from "@/shared/config/env";

export const apiInstance = axios.create({
	baseURL: ENV.API_BASE_URL,
	timeout: 10_000,
	headers: {
		"Content-Type": "application/json",
	},
});
