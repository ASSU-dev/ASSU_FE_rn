import { StampItem } from "@/entities/stamp/ui/StampItem";
import { Text, View } from "react-native";

export const StampBoard = ({ currentCount = 0 }) => {
  const STAMP_LIMIT = 10;
  const stamps = Array.from({ length: STAMP_LIMIT });

  return (
    <View>
        <View>
            <Text className="text-gray-900 text-lg font-bold pt-2">
              나의 스탬프 적립 현황
            </Text>
            <Text className="text-gray-400 text-xs mt-1">
              적립 내역 더보기 {">"}
            </Text>
          </View>
      <View className="bg-gray-100 border-gray-600 p-6 rounded-[24px] mt-4 ">

        <View className="flex-row flex-wrap justify-between px-1 pt-2">
          {stamps.map((_, index) => (
            <View key={index} style={{ width: '18%', aspectRatio: 1 }}>
            <StampItem key={index} isAchieved={index < currentCount} />
            </View>
          ))}
        </View>
      </View>
      <Text className="text-gray-400 text-xs pt-2">
        ⓘ 스탬프 10개 적립 시 기프티콘이 지급됩니다!
      </Text>
    </View>
  );
};
