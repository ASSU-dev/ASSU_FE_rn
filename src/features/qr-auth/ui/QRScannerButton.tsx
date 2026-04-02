import { QRIcon } from "@/shared/assets/icons";
import { InfoLinkText } from "@/shared/ui/info";
import { Pressable, Text, View } from "react-native";

export const QRScannerButton = () => {
	return (
		<Pressable className="bg-gray-100 rounded-2xl p-6 flex-row items-center">
			<View>
				<QRIcon width={40} height={40} className="pl-2" />
			</View>
			<View>
				<Text className="text-lg font-bold text-slate-900">
					제휴 QR 인증하기
				</Text>
				<InfoLinkText message="숭실대학교 학생인증이 완료된 사용자" />
			</View>
		</Pressable>
	);
};
