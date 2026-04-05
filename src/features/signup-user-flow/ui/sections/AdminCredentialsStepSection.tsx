import { AdminStepLayout } from "../layout/AdminStepLayout";
import { CredentialsFields } from "../components/CredentialsFields";

type AdminCredentialsStepSectionProps = {
	adminEmail: string;
	adminPassword: string;
	onChangeAdminEmail: (value: string) => void;
	onChangeAdminPassword: (value: string) => void;
};

export function AdminCredentialsStepSection({
	adminEmail,
	adminPassword,
	onChangeAdminEmail,
	onChangeAdminPassword,
}: AdminCredentialsStepSectionProps) {
	return (
		<AdminStepLayout
			firstLine="아이디/비밀번호를"
			secondLine="입력해주세요!"
		>
			<CredentialsFields
				emailValue={adminEmail}
				passwordValue={adminPassword}
				onChangeEmail={onChangeAdminEmail}
				onChangePassword={onChangeAdminPassword}
			/>
		</AdminStepLayout>
	);
}
