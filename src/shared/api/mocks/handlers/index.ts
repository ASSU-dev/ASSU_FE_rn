import type MockAdapter from "axios-mock-adapter";
import { registerExampleHandlers } from "./example.handlers";

export function registerHandlers(mock: MockAdapter) {
	registerExampleHandlers(mock);
}
