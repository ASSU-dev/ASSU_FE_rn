import QRIcon from "@/shared/assets/icons/qr-icon.svg";
import { Pressable, Text, View } from "react-native";

export const QRScannerButton = () => {
  return (
    <Pressable className="bg-gray-100 rounded-2xl p-6 flex-row items-center">
      <View>
        <QRIcon width={40} height={40} />
      </View>
      <View>
        <Text className="text-lg font-bold text-slate-900">
          제휴 QR 인증하기
        </Text>
        <Text className="text-xs text-slate-400">
          숭실대학교 학생인증이 완료된 사용자
        </Text>
      </View>
    </Pressable>
  );
};
