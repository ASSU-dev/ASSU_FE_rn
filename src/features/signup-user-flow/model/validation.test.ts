import { USER_TYPE } from "@/entities/user/model/types";
import { DEFAULT_SIGNUP_FORM_STATE } from "./mock/signupUserFlow.mock";
import { isSignupStepValid } from "./validation";

function createForm() {
	return structuredClone(DEFAULT_SIGNUP_FORM_STATE);
}

const file = {
	uri: "file:///document.png",
	name: "document.png",
	mimeType: "image/png",
};

describe("isSignupStepValid", () => {
	it("allows identity verification only after a code is sent and still valid", () => {
		const form = createForm();
		form.identity = {
			phone: "01012345678",
			verificationCode: "123456",
			isCodeSent: true,
			verificationAttempted: false,
		};

		expect(isSignupStepValid({ step: "identity", form, secondsLeft: 1 })).toBe(
			true,
		);
		expect(isSignupStepValid({ step: "identity", form, secondsLeft: 0 })).toBe(
			false,
		);
	});

	it("requires privacy consent and a file before partner registration", () => {
		const form = createForm();
		form.role = USER_TYPE.PARTNER;
		form.partner.businessRegistrationFile = file;

		expect(
			isSignupStepValid({
				step: "partnerBusinessRegistration",
				form,
				secondsLeft: 300,
			}),
		).toBe(false);

		form.agreements.agreePrivacy = true;
		expect(
			isSignupStepValid({
				step: "partnerBusinessRegistration",
				form,
				secondsLeft: 300,
			}),
		).toBe(true);
	});

	it("requires organization-specific selections and address details for admins", () => {
		const form = createForm();
		form.role = USER_TYPE.ADMIN;
		form.admin.organizationType = "DEPARTMENT_STUDENT_COUNCIL";
		form.admin.collegeId = "IT";
		form.admin.departmentId = "SOFTWARE";
		form.admin.officeAddressId = "place-1";
		form.admin.officeAddressDetail = "학생회관 301호";

		expect(
			isSignupStepValid({
				step: "adminOrganizationInfo",
				form,
				secondsLeft: 300,
			}),
		).toBe(true);

		form.admin.officeAddressDetail = "   ";
		expect(
			isSignupStepValid({
				step: "adminOrganizationInfo",
				form,
				secondsLeft: 300,
			}),
		).toBe(false);
	});
});
