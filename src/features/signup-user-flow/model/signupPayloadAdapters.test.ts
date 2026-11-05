import { USER_TYPE } from "@/entities/user/model/types";
import { DEFAULT_SIGNUP_FORM_STATE } from "./mock/signupUserFlow.mock";
import {
	toAdminSignupBody,
	toPartnerSignupBody,
	toStudentSignupPayload,
} from "./signupPayloadAdapters";

function createForm() {
	return structuredClone(DEFAULT_SIGNUP_FORM_STATE);
}

const file = {
	uri: "file:///document.png",
	name: "document.png",
	mimeType: "image/png",
};

describe("signup payload adapters", () => {
	it("maps student identity and consent fields into the student payload", () => {
		const form = createForm();
		form.role = USER_TYPE.STUDENT;
		form.auth.email = "student@ssu.ac.kr";
		form.auth.password = "password";
		form.identity.phone = "01012345678";
		form.agreements.agreePrivacy = true;

		expect(toStudentSignupPayload(form)).toMatchObject({
			role: USER_TYPE.STUDENT,
			email: "student@ssu.ac.kr",
			phone: "01012345678",
			agreements: { agreePrivacy: true, agreeMarketing: false },
		});
	});

	it("creates a partner multipart body and preserves the uploaded file", () => {
		const form = createForm();
		form.partner.email = "partner@assu.kr";
		form.partner.companyName = "ASSU 상점";
		form.partner.officeAddressId = "place-1";
		form.partner.officeAddress = "서울시 동작구";
		form.partner.officeAddressDetail = "101호";
		form.partner.businessRegistrationFile = file;

		const body = toPartnerSignupBody(form);
		expect(body.request.commonAuth.email).toBe("partner@assu.kr");
		expect(body.request.commonInfo.selectedPlace.placeId).toBe("place-1");
		expect(body.licenseImage).toEqual({
			uri: file.uri,
			name: file.name,
			type: file.mimeType,
		});
	});

	it("rejects partner signup without a business registration file", () => {
		expect(() => toPartnerSignupBody(createForm())).toThrow(
			"사업자 등록증을 등록해주세요.",
		);
	});

	it("creates an admin multipart body with its organization display name", () => {
		const form = createForm();
		form.admin.email = "admin@assu.kr";
		form.admin.organizationType = "GENERAL_STUDENT_COUNCIL";
		form.admin.officeAddress = "서울시 동작구 상도로 369";
		form.admin.officeAddressDetail = "학생회관";
		form.admin.sealFile = file;

		const body = toAdminSignupBody(form);
		expect(body.request.commonAuth.email).toBe("admin@assu.kr");
		expect(body.request.commonInfo.name).toBe("숭실대학교 총학생회");
		expect(body.signImage).toEqual({
			uri: file.uri,
			name: file.name,
			type: file.mimeType,
		});
	});
});
