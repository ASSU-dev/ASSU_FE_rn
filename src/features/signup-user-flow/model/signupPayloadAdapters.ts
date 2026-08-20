import { USER_TYPE } from "@/entities/user/model/types";
import {
	type AdminSignUpRequestDTO,
	CommonAuthPayloadDTODepartment,
	CommonAuthPayloadDTOMajor,
	CommonAuthPayloadDTOUniversity,
	type PartnerSignUpRequestDTO,
	type SignupPartnerBody,
} from "@/shared/api";
import { getAdminCompletionName } from "./admin";
import type { SignupFormState, SignupUploadFile } from "./types";

export function toStudentSignupPayload(form: SignupFormState) {
	return {
		role: USER_TYPE.STUDENT,
		email: form.auth.email,
		password: form.auth.password,
		phone: form.identity.phone,
		school: form.student.school,
		major: form.student.major,
		studentId: form.student.studentId,
		agreements: {
			agreePrivacy: form.agreements.agreePrivacy,
			agreeMarketing: form.agreements.agreeMarketing,
		},
	};
}

export function toPartnerSignupPayload(form: SignupFormState) {
	return {
		role: USER_TYPE.PARTNER,
		email: form.partner.email,
		password: form.partner.password,
		phone: form.identity.phone,
		companyName: form.partner.companyName,
		officeAddressId: form.partner.officeAddressId,
		officeAddress: form.partner.officeAddress,
		officeAddressDetail: form.partner.officeAddressDetail,
		businessRegistrationFileName:
			form.partner.businessRegistrationFile?.name ?? "",
		agreements: {
			agreePrivacy: form.agreements.agreePrivacy,
			agreeMarketing: form.agreements.agreeMarketing,
		},
	};
}

export function toAdminSignupPayload(form: SignupFormState) {
	return {
		role: USER_TYPE.ADMIN,
		email: form.admin.email,
		password: form.admin.password,
		phone: form.identity.phone,
		organizationType: form.admin.organizationType,
		collegeId: form.admin.collegeId,
		departmentId: form.admin.departmentId,
		officeAddressId: form.admin.officeAddressId,
		officeAddress: form.admin.officeAddress,
		officeAddressDetail: form.admin.officeAddressDetail,
		sealFileName: form.admin.sealFile?.name ?? "",
		displayName: getAdminCompletionName(form.admin),
		agreements: {
			agreePrivacy: form.agreements.agreePrivacy,
			agreeMarketing: form.agreements.agreeMarketing,
		},
	};
}

function mapAdminCollegeToDepartmentEnum(value: string | null) {
	switch (value) {
		case "HUMANITIES":
			return CommonAuthPayloadDTODepartment.HUMANITIES;
		case "NATURAL_SCIENCE":
			return CommonAuthPayloadDTODepartment.NATURAL_SCIENCE;
		case "IT":
			return CommonAuthPayloadDTODepartment.IT;
		case "ENGINEERING":
			return CommonAuthPayloadDTODepartment.ENGINEERING;
		case "SOCIAL_SCIENCE":
			return CommonAuthPayloadDTODepartment.SOCIAL_SCIENCE;
		default:
			return undefined;
	}
}

function mapAdminDepartmentToMajorEnum(value: string | null) {
	switch (value) {
		case "COMPUTER":
			return CommonAuthPayloadDTOMajor.COMPUTER_SCIENCE;
		case "SOFTWARE":
			return CommonAuthPayloadDTOMajor.SOFTWARE;
		case "GLOBAL_MEDIA":
			return CommonAuthPayloadDTOMajor.GLOBAL_MEDIA;
		case "EE":
			return CommonAuthPayloadDTOMajor.ELECTRONIC_ENGINEERING;
		case "AI":
			return CommonAuthPayloadDTOMajor.AI_SOFTWARE;
		default:
			return undefined;
	}
}

/**
 * React Native의 FormData는 Blob 대신 { uri, name, type } 형태를 받는다.
 * 생성된 클라이언트 타입이 Blob이라 캐스팅이 필요하다.
 */
function toFormDataFile(file: SignupUploadFile) {
	return {
		uri: file.uri,
		name: file.name,
		type: file.mimeType,
	} as unknown as Blob;
}

export function toAdminSignupBody(form: SignupFormState) {
	const sealFile = form.admin.sealFile;
	if (!sealFile) {
		throw new Error("인감 이미지를 등록해주세요.");
	}

	const request: AdminSignUpRequestDTO = {
		phoneNumber: form.identity.phone || "01012345678",
		marketingAgree: form.agreements.agreeMarketing,
		locationAgree: form.agreements.agreePrivacy,
		commonAuth: {
			email: form.admin.email,
			password: form.admin.password,
			university: CommonAuthPayloadDTOUniversity.SSU,
			department: mapAdminCollegeToDepartmentEnum(form.admin.collegeId),
			major: mapAdminDepartmentToMajorEnum(form.admin.departmentId),
		},
		commonInfo: {
			name: getAdminCompletionName(form.admin) || form.profile.name,
			detailAddress: form.admin.officeAddressDetail,
			selectedPlace: {
				placeId: form.admin.officeAddressId || "mock-admin-place-id",
				name: form.admin.officeAddress || getAdminCompletionName(form.admin),
				address: form.admin.officeAddress || "서울시 동작구 상도로 369",
				roadAddress: form.admin.officeAddress || "서울시 동작구 상도로 369",
				latitude: 37.4959,
				longitude: 126.9567,
			},
		},
	};

	return {
		request,
		signImage: toFormDataFile(sealFile),
	};
}

export function toPartnerSignupBody(form: SignupFormState) {
	const licenseFile = form.partner.businessRegistrationFile;
	if (!licenseFile) {
		throw new Error("사업자 등록증을 등록해주세요.");
	}

	const request: PartnerSignUpRequestDTO = {
		phoneNumber: form.identity.phone || "01012345678",
		marketingAgree: form.agreements.agreeMarketing,
		locationAgree: form.agreements.agreePrivacy,
		commonAuth: {
			email: form.partner.email,
			password: form.partner.password,
			university: CommonAuthPayloadDTOUniversity.SSU,
		},
		commonInfo: {
			name: form.partner.companyName || form.profile.name,
			detailAddress: form.partner.officeAddressDetail,
			selectedPlace: {
				placeId: form.partner.officeAddressId || "mock-partner-place-id",
				name: form.partner.officeAddress || form.partner.companyName,
				address: form.partner.officeAddress || "서울시 동작구 상도로 369",
				roadAddress: form.partner.officeAddress || "서울시 동작구 상도로 369",
				latitude: 37.4959,
				longitude: 126.9567,
			},
		},
	};

	return {
		request,
		licenseImage: toFormDataFile(licenseFile),
	} satisfies SignupPartnerBody;
}
