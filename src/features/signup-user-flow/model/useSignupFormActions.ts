import { useMemo } from "react";
import type { SignupSchool } from "@/entities/signup";
import type { UserType } from "@/entities/user/model/types";
import type { AddressSearchItem } from "@/shared/ui/address-search";
import {
	findAdminCollegeOption,
	findAdminDepartmentOption,
} from "./admin";
import { getNextAgreementState } from "./agreements";
import type {
	SignupAdminOrganizationType,
	SignupFormState,
	SignupIdentityFormState,
} from "./types";

type SignupObjectSectionKey = Exclude<keyof SignupFormState, "role">;

type UpdateForm = (updater: (prev: SignupFormState) => SignupFormState) => void;
type UpdateSection = <K extends SignupObjectSectionKey>(
	section: K,
	updater: (value: SignupFormState[K]) => SignupFormState[K],
) => void;
type SetSectionField = <
	K extends SignupObjectSectionKey,
	F extends keyof SignupFormState[K],
>(
	section: K,
	field: F,
	value: SignupFormState[K][F],
) => void;

type UseSignupFormActionsParams = {
	updateForm: UpdateForm;
	updateSection: UpdateSection;
	setSectionField: SetSectionField;
	startVerificationCountdown: () => void;
};

function resetVerificationAttempt(
	identity: SignupIdentityFormState,
	verificationCode: string,
) {
	return {
		...identity,
		verificationCode,
		verificationAttempted: false,
	};
}

export function useSignupFormActions({
	updateForm,
	updateSection,
	setSectionField,
	startVerificationCountdown,
}: UseSignupFormActionsParams) {
	return useMemo(
		() => ({
			auth: {
				setEmail: (email: string) => setSectionField("auth", "email", email),
				setPassword: (password: string) =>
					setSectionField("auth", "password", password),
			},
			identity: {
				setPhone: (phone: string) => setSectionField("identity", "phone", phone),
				setVerificationCode: (verificationCode: string) => {
					updateSection("identity", (identity) =>
						resetVerificationAttempt(identity, verificationCode),
					);
				},
				sendVerificationCode: () => {
					updateSection("identity", (identity) => ({
						...identity,
						isCodeSent: true,
						verificationAttempted: false,
					}));
					startVerificationCountdown();
				},
			},
			student: {
				setRole: (role: UserType) => updateForm((prev) => ({ ...prev, role })),
				setSchool: (school: SignupSchool) =>
					setSectionField("student", "school", school),
			},
			partner: {
				setEmail: (email: string) => setSectionField("partner", "email", email),
				setPassword: (password: string) =>
					setSectionField("partner", "password", password),
				setCompanyName: (companyName: string) =>
					setSectionField("partner", "companyName", companyName),
				setOfficeAddress: ({ id }: AddressSearchItem) =>
					setSectionField("partner", "officeAddressId", id),
				setOfficeAddressDetail: (officeAddressDetail: string) =>
					setSectionField("partner", "officeAddressDetail", officeAddressDetail),
				selectBusinessRegistrationMock: () =>
					setSectionField(
						"partner",
						"businessRegistrationFileName",
						"사업자등록증.jpg",
					),
			},
			admin: {
				setEmail: (email: string) => setSectionField("admin", "email", email),
				setPassword: (password: string) =>
					setSectionField("admin", "password", password),
				setOrganizationType: (
					organizationType: SignupAdminOrganizationType | null,
				) => {
					updateSection("admin", (admin) => ({
						...admin,
						organizationType,
						collegeId: null,
						departmentId: null,
						officeAddressId: null,
						officeAddressDetail: "",
						sealFileName: "",
					}));
				},
				setCollege: (value: string | null) => {
					const selectedCollege = findAdminCollegeOption(value);

					updateSection("admin", (admin) => ({
						...admin,
						collegeId: selectedCollege?.value ?? null,
						departmentId: null,
					}));
				},
				setDepartment: (value: string | null) => {
					const selectedDepartment = findAdminDepartmentOption(value);

					setSectionField(
						"admin",
						"departmentId",
						selectedDepartment?.value ?? null,
					);
				},
				setOfficeAddress: ({ id }: AddressSearchItem) =>
					setSectionField("admin", "officeAddressId", id),
				setOfficeAddressDetail: (officeAddressDetail: string) =>
					setSectionField("admin", "officeAddressDetail", officeAddressDetail),
				selectSealMock: () => setSectionField("admin", "sealFileName", "IMG.127"),
			},
			agreements: {
				setPrivacy: (checked: boolean) => {
					updateSection("agreements", (agreements) =>
						getNextAgreementState(agreements, {
							agreePrivacy: checked,
						}),
					);
				},
				setMarketing: (checked: boolean) => {
					updateSection("agreements", (agreements) =>
						getNextAgreementState(agreements, {
							agreeMarketing: checked,
						}),
					);
				},
				setAll: (checked: boolean) => {
					updateSection("agreements", () => ({
						agreeAll: checked,
						agreePrivacy: checked,
						agreeMarketing: checked,
					}));
				},
			},
		}),
		[setSectionField, startVerificationCountdown, updateForm, updateSection],
	);
}
