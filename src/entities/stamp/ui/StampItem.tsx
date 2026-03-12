import { View } from "react-native";
import { StampActive, StampInactive } from "@/shared/assets/icons";

interface StampItemProps {
  isAchieved: boolean;
}

export const StampItem = ({ isAchieved }: StampItemProps) => {
  return (
    <View className="flex aspect-square items-center justify-center mb-3">
      {isAchieved ? (
        <StampActive width={48} height={48} fill="#FFD700" />
      ) : (
        <StampInactive width={48} height={48} fill="#C0C0C0" />    
      )}
    </View>
  );
};