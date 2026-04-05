import { Pressable, View } from "react-native";
import { SearchIcon } from "@/shared/assets/icons";
import { LabeledInputField } from "../LabeledInputField";

type OfficeAddressPickerProps = {
	officeAddress: string;
	officeAddressDetail: string;
	onPressOfficeAddress: () => void;
	onChangeOfficeAddressDetail: (value: string) => void;
	gapClassName?: string;
};

export function OfficeAddressPicker({
	officeAddress,
	officeAddressDetail,
	onPressOfficeAddress,
	onChangeOfficeAddressDetail,
	gapClassName = "gap-[15px]",
}: OfficeAddressPickerProps) {
	return (
		<View className={gapClassName}>
			<Pressable onPress={onPressOfficeAddress}>
				<View pointerEvents="none">
					<LabeledInputField
						label="사무실주소"
						value={officeAddress}
						editable={false}
						rightElement={<SearchIcon width={20} height={20} />}
					/>
				</View>
			</Pressable>

			<LabeledInputField
				placeholder="상세주소를 입력해주세요"
				value={officeAddressDetail}
				onChangeText={onChangeOfficeAddressDetail}
			/>
		</View>
	);
}

