import { View } from "react-native";
import { OfficeAddressPicker } from "../components/OfficeAddressPicker";
import { LabeledInputField } from "../LabeledInputField";
import { SignupStepTitle } from "../SignupStepTitle";

type PartnerCompanyInfoStepSectionProps = {
	partnerCompanyName: string;
	partnerOfficeAddress: string;
	partnerOfficeAddressDetail: string;
	onChangePartnerCompanyName: (value: string) => void;
	onChangePartnerOfficeAddressDetail: (value: string) => void;
	onPressOfficeAddress: () => void;
};

export function PartnerCompanyInfoStepSection({
	partnerCompanyName,
	partnerOfficeAddress,
	partnerOfficeAddressDetail,
	onChangePartnerCompanyName,
	onChangePartnerOfficeAddressDetail,
	onPressOfficeAddress,
}: PartnerCompanyInfoStepSectionProps) {
	return (
		<View className="mt-[46px] gap-[56px]">
			<SignupStepTitle
				firstLine="제휴업체의 정보를"
				secondLine="입력해주세요"
			/>
			<View className="gap-[15px]">
				<LabeledInputField
					label="제휴업체명"
					placeholder="업체명을 입력해주세요"
					value={partnerCompanyName}
					onChangeText={onChangePartnerCompanyName}
				/>
				<OfficeAddressPicker
					officeAddress={partnerOfficeAddress}
					officeAddressDetail={partnerOfficeAddressDetail}
					onPressOfficeAddress={onPressOfficeAddress}
					onChangeOfficeAddressDetail={onChangePartnerOfficeAddressDetail}
				/>
			</View>
		</View>
	);
}
