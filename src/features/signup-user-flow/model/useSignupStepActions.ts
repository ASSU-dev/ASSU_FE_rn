import { useMemo } from "react";
import type { UserType } from "@/entities/user/model/types";
import type { SignupAdminOrganizationType } from "./types";

type UseSignupStepActionsParams = {
	step: string;
	goTo: (step: "studentInput2" | "adminOrganizationInfo") => void;
	overlays: {
		openResendSheet: () => void;
		openPartnerAddressSearch: () => void;
		openAdminAddressSearch: () => void;
	};
	identity: {
		setPhone: (value: string) => void;
		setVerificationCode: (value: string) => void;
		sendVerificationCode: () => void;
	};
	student: {
		setRole: (value: UserType) => void;
		setSchool: (value: "숭실대학교") => void;
		onPressStudentVerify?: () => void;
	};
	partner: {
		setPartnerEmail: (value: string) => void;
		setPartnerPassword: (value: string) => void;
		setPartnerCompanyName: (value: string) => void;
		setPartnerOfficeAddressDetail: (value: string) => void;
		selectPartnerBusinessRegistrationMock: () => void;
	};
	admin: {
		setAdminEmail: (value: string) => void;
		setAdminPassword: (value: string) => void;
		setAdminOrganizationType: (
			value: SignupAdminOrganizationType | null,
		) => void;
		setAdminCollege: (value: string | null) => void;
		setAdminDepartment: (value: string | null) => void;
		setAdminOfficeAddressDetail: (value: string) => void;
		selectAdminSealMock: () => void;
	};
	agreementHandlers: {
		onToggleAgreeAll: () => void;
		onToggleAgreePrivacy: () => void;
		onToggleAgreeMarketing: () => void;
	};
};

export function useSignupStepActions({
	step,
	goTo,
	overlays,
	identity,
	student,
	partner,
	admin,
	agreementHandlers,
}: UseSignupStepActionsParams) {
	return useMemo(
		() => ({
			identity: {
				onChangePhone: identity.setPhone,
				onChangeVerificationCode: identity.setVerificationCode,
				onSendCode: identity.sendVerificationCode,
				onPressInfoLink: overlays.openResendSheet,
			},
			student: {
				onSelectRole: student.setRole,
				onSelectSchool: student.setSchool,
				onPressStudentVerify:
					student.onPressStudentVerify ?? (() => goTo("studentInput2")),
			},
			partner: {
				onChangePartnerEmail: partner.setPartnerEmail,
				onChangePartnerPassword: partner.setPartnerPassword,
				onChangePartnerCompanyName: partner.setPartnerCompanyName,
				onChangePartnerOfficeAddressDetail:
					partner.setPartnerOfficeAddressDetail,
				onPressPartnerOfficeAddress: overlays.openPartnerAddressSearch,
				onPressPartnerBusinessRegistrationUpload:
					partner.selectPartnerBusinessRegistrationMock,
			},
			admin: {
				onChangeAdminEmail: admin.setAdminEmail,
				onChangeAdminPassword: admin.setAdminPassword,
				onChangeAdminOrganizationType: (
					value: SignupAdminOrganizationType | null,
				) => {
					admin.setAdminOrganizationType(value);
					if (step === "adminOrganizationType" && value) {
						goTo("adminOrganizationInfo");
					}
				},
				onChangeAdminCollege: admin.setAdminCollege,
				onChangeAdminDepartment: admin.setAdminDepartment,
				onChangeAdminOfficeAddressDetail: admin.setAdminOfficeAddressDetail,
				onPressAdminOfficeAddress: overlays.openAdminAddressSearch,
				onPressAdminSealUpload: admin.selectAdminSealMock,
			},
			agreements: agreementHandlers,
		}),
		[
			admin,
			agreementHandlers,
			goTo,
			identity,
			overlays,
			partner,
			step,
			student,
		],
	);
}
