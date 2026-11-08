import { DEFAULT_SIGNUP_FORM_STATE } from "./mock/signupUserFlow.mock";
import {
	toAdminSignupBody,
	toPartnerSignupBody,
} from "./signupPayloadAdapters";
import type { SignupFormState } from "./types";

function createForm(): SignupFormState {
	return {
		...DEFAULT_SIGNUP_FORM_STATE,
		identity: { ...DEFAULT_SIGNUP_FORM_STATE.identity, phone: "01012345678" },
		partner: {
			...DEFAULT_SIGNUP_FORM_STATE.partner,
			email: "partner@assu.com",
			password: "partner-password",
			companyName: "ASSU 카페",
			officeAddressId: "partner-place",
			officeAddress: "서울 동작구 상도로 369",
			officeAddressDetail: "101호",
			businessRegistrationFile: {
				uri: "file:///license.png",
				name: "license.png",
				mimeType: "image/png",
			},
		},
		admin: {
			...DEFAULT_SIGNUP_FORM_STATE.admin,
			email: "admin@assu.com",
			password: "admin-password",
			organizationType: "DEPARTMENT_STUDENT_COUNCIL",
			collegeId: "IT",
			departmentId: "SOFTWARE",
			officeAddressId: "admin-place",
			officeAddress: "서울 동작구 상도로 369",
			officeAddressDetail: "학생회실",
			sealFile: {
				uri: "file:///seal.png",
				name: "seal.png",
				mimeType: "image/png",
			},
		},
		agreements: {
			agreeAll: true,
			agreePrivacy: true,
			agreeMarketing: true,
		},
	};
}

describe("회원가입 payload 변환", () => {
	it("제휴업체 가입은 사업자 등록증과 주소를 multipart 요청 형태로 변환한다", () => {
		const { request, licenseImage } = toPartnerSignupBody(createForm());

		expect(request).toMatchObject({
			phoneNumber: "01012345678",
			commonAuth: { email: "partner@assu.com", password: "partner-password" },
			commonInfo: {
				name: "ASSU 카페",
				detailAddress: "101호",
				selectedPlace: { placeId: "partner-place" },
			},
		});
		expect(licenseImage).toMatchObject({
			uri: "file:///license.png",
			name: "license.png",
			type: "image/png",
		});
	});

	it("관리자 가입은 학과 학생회 이름·대학/학과 enum과 인감 이미지를 변환한다", () => {
		const { request, signImage } = toAdminSignupBody(createForm());

		expect(request).toMatchObject({
			commonAuth: {
				email: "admin@assu.com",
				password: "admin-password",
				department: "IT",
				major: "SOFTWARE",
			},
			commonInfo: {
				name: "소프트웨어학부 학생회",
				detailAddress: "학생회실",
				selectedPlace: { placeId: "admin-place" },
			},
		});
		expect(signImage).toMatchObject({
			uri: "file:///seal.png",
			name: "seal.png",
			type: "image/png",
		});
	});

	it.each([
		{ type: "사업자 등록증", build: toPartnerSignupBody, update: "partner" },
		{ type: "인감 이미지", build: toAdminSignupBody, update: "admin" },
	])("$type이 없으면 가입 요청을 만들지 않는다", ({ build, update }) => {
		const form = createForm();
		if (update === "partner") form.partner.businessRegistrationFile = null;
		if (update === "admin") form.admin.sealFile = null;

		expect(() => build(form)).toThrow();
	});
});
