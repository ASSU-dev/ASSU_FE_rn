import type MockAdapter from "axios-mock-adapter";
import { registerExampleHandlers } from "./example.handlers";
import { registerStudentHandlers } from "./student.handlers";

export function registerHandlers(mock: MockAdapter) {
	registerExampleHandlers(mock);
	registerStudentHandlers(mock);
}
