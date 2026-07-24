import type MockAdapter from "axios-mock-adapter";
import { registerAdminHandlers } from "./admin.handlers";
import { registerExampleHandlers } from "./example.handlers";
import { registerPartnerHandlers } from "./partner.handlers";
import { registerPartnershipHandlers } from "./partnership.handlers";
import { registerStudentHandlers } from "./student.handlers";

export function registerHandlers(mock: MockAdapter) {
	registerExampleHandlers(mock);
	registerAdminHandlers(mock);
	registerPartnerHandlers(mock);
	registerPartnershipHandlers(mock);
	registerStudentHandlers(mock);
}
