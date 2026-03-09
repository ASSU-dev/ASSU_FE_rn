import { InfoFillIcon } from "@/shared/assets/icons";
import { Text, View } from "react-native";

type InfoBannerProps = {
  message: string;
};

export function InfoBanner({ message }: InfoBannerProps) {
  return (
    <View className="w-full flex-row items-center rounded-[3px] px-[7px] py-[4px] gap-1 bg-neutral">
      <InfoFillIcon width={10} height={10} />
      <Text className="text-[11px] flex-shrink text-content-secondary">
        {message}
      </Text>
    </View>
  );
}
