import { Pressable, Text, View } from "react-native";
import { QrIcon } from "@/shared/assets/icons";
import { InfoLinkText } from "@/shared/ui/info";

export const QRScannerButton = () => {
	return (
		<Pressable className="bg-neutral rounded-2xl p-6 flex-row items-center">
			<View>
				<QrIcon width={40} height={40} className="pl-2" />
			</View>
			<View>
				<Text className="text-lg font-bold text-content-primary">
					제휴 QR 인증하기
				</Text>
				<InfoLinkText message="숭실대학교 학생인증이 완료된 사용자" />
			</View>
		</Pressable>
	);
};
