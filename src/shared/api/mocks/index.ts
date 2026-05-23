import MockAdapter from "axios-mock-adapter";
import { ENV } from "@/shared/config/env";
import { apiInstance } from "../instance";
import { registerHandlers } from "./handlers";

export function initMocks() {
	if (!ENV.USE_MOCKS) return;
	const mock = new MockAdapter(apiInstance, { onNoMatch: "passthrough" });
	registerHandlers(mock);
}
