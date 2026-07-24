import {
	ADMIN_COLLEGE_OPTIONS,
	ADMIN_DEPARTMENT_OPTIONS,
} from "./data/adminOptions";
import type { SignupAdminFormState } from "./types";

export function findAdminCollegeOption(value: string | null) {
	if (!value) {
		return null;
	}

	return ADMIN_COLLEGE_OPTIONS.find((item) => item.value === value) ?? null;
}

export function findAdminDepartmentOption(value: string | null) {
	if (!value) {
		return null;
	}

	return ADMIN_DEPARTMENT_OPTIONS.find((item) => item.value === value) ?? null;
}

export function shouldShowAdminOfficeAddress(admin: SignupAdminFormState) {
	return shouldShowAdminOfficeAddressBySelection(
		admin.organizationType,
		admin.collegeId,
		admin.departmentId,
	);
}

export function shouldShowAdminOfficeAddressBySelection(
	organizationType: SignupAdminFormState["organizationType"],
	collegeId: SignupAdminFormState["collegeId"],
	departmentId: SignupAdminFormState["departmentId"],
) {
	if (organizationType === "GENERAL_STUDENT_COUNCIL") {
		return true;
	}

	if (organizationType === "COLLEGE_STUDENT_COUNCIL") {
		return Boolean(collegeId);
	}

	if (organizationType === "DEPARTMENT_STUDENT_COUNCIL") {
		return Boolean(collegeId && departmentId);
	}

	return false;
}

export function isAdminOrganizationInfoComplete(admin: SignupAdminFormState) {
	if (!admin.organizationType || !shouldShowAdminOfficeAddress(admin)) {
		return false;
	}

	if (admin.organizationType === "COLLEGE_STUDENT_COUNCIL") {
		return (
			Boolean(admin.collegeId) &&
			Boolean(admin.officeAddressId) &&
			admin.officeAddressDetail.length > 0
		);
	}

	if (admin.organizationType === "DEPARTMENT_STUDENT_COUNCIL") {
		return (
			Boolean(admin.collegeId) &&
			Boolean(admin.departmentId) &&
			Boolean(admin.officeAddressId) &&
			admin.officeAddressDetail.length > 0
		);
	}

	return Boolean(admin.officeAddressId) && admin.officeAddressDetail.length > 0;
}

export function getAdminCompletionName(admin: SignupAdminFormState) {
	if (admin.organizationType === "GENERAL_STUDENT_COUNCIL") {
		return "숭실대학교 총학생회";
	}

	if (admin.organizationType === "COLLEGE_STUDENT_COUNCIL") {
		const college = findAdminCollegeOption(admin.collegeId);
		return college?.label ? `${college.label} 학생회` : "";
	}

	if (admin.organizationType === "DEPARTMENT_STUDENT_COUNCIL") {
		const department = findAdminDepartmentOption(admin.departmentId);
		return department?.label ? `${department.label} 학생회` : "";
	}

	return "";
}
