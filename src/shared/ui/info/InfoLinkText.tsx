import { InfoIcon } from "@/shared/assets/icons";
import { colorTokens } from "@/shared/styles/tokens";
import { Text, View } from "react-native";

type InfoLinkTextProps = {
  message: string;
};

export function InfoLinkText({ message }: InfoLinkTextProps) {
  return (
    <View className="w-full flex-row items-center gap-1">
      <InfoIcon width={10} height={10} />
      <Text
        className="text-[11px]"
        style={{ color: colorTokens.contentSecondary }}
      >
        {message}
      </Text>
    </View>
  );
}
