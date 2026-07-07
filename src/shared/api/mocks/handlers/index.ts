import type MockAdapter from "axios-mock-adapter";
import { registerAdminHandlers } from "./admin.handlers";
import { registerAuthHandlers } from "./auth.handlers";
import { registerExampleHandlers } from "./example.handlers";
import { registerPartnerHandlers } from "./partner.handlers";
import { registerPartnershipHandlers } from "./partnership.handlers";

export function registerHandlers(mock: MockAdapter) {
	registerExampleHandlers(mock);
	registerAuthHandlers(mock);
	registerAdminHandlers(mock);
	registerPartnerHandlers(mock);
	registerPartnershipHandlers(mock);
}
