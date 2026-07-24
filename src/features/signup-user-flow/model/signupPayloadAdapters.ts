import { Asset } from "expo-asset";
import { USER_TYPE } from "@/entities/user/model/types";
import {
	type AdminSignUpRequestDTO,
	CommonAuthPayloadDTODepartment,
	CommonAuthPayloadDTOMajor,
	CommonAuthPayloadDTOUniversity,
} from "@/shared/api";
import { findAddressOption, getAdminCompletionName } from "./admin";
import type { SignupFormState } from "./types";

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
		officeAddressDetail: form.partner.officeAddressDetail,
		businessRegistrationFileName: form.partner.businessRegistrationFileName,
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
		officeAddressDetail: form.admin.officeAddressDetail,
		sealFileName: form.admin.sealFileName,
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

export type AdminSealFile = {
	uri: string;
	name: string;
	type: string;
};

async function createMockAdminSealImage(): Promise<AdminSealFile> {
	const [asset] = await Asset.loadAsync(
		require("@/shared/assets/images/icon.png"),
	);

	return {
		uri: asset.localUri ?? asset.uri,
		name: "admin-seal.jpg",
		type: "image/jpeg",
	};
}

export async function toAdminSignupBody(form: SignupFormState) {
	const addressOption = findAddressOption(form.admin.officeAddressId);
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
				name: addressOption?.label || getAdminCompletionName(form.admin),
				address: addressOption?.label || "서울시 동작구 상도로 369",
				roadAddress: addressOption?.label || "서울시 동작구 상도로 369",
				latitude: 37.4959,
				longitude: 126.9567,
			},
		},
	};

	return {
		request,
		signImage: await createMockAdminSealImage(),
	};
}
