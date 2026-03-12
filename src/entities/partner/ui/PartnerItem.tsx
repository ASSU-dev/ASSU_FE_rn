import { Text, View } from "react-native";

interface PartnerItemProps {
  rank: number;
  name: string;
}
export const PartnerItem = ({ rank, name }: PartnerItemProps) => {
  return (
    <View className="flex-1 flex-row items-center py-2.5 px-1">
      <Text className="text-blue-600 font-bold w-7 text-base">
        {rank}
      </Text>
      
      {/* 매장명 line 제한 */}
      <Text 
        className="text-slate-800 text-base font-medium flex-1"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {name}
      </Text>
    </View>
  );
};