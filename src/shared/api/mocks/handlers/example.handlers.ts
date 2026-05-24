import type MockAdapter from "axios-mock-adapter";

export function registerExampleHandlers(mock: MockAdapter) {
	mock.onGet("/api/health").reply(200, { status: "ok", mock: true });
}
