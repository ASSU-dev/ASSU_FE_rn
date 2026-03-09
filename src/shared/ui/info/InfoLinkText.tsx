import { InfoIcon } from "@/shared/assets/icons";
import { colorTokens } from "@/shared/styles/tokens";
import { Pressable, Text } from "react-native";

type InfoLinkTextProps = {
  message: string;
  onPress?: () => void;
};

export function InfoLinkText({ message, onPress }: InfoLinkTextProps) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center gap-1">
      <InfoIcon width={10} height={10} />
      <Text
        className="text-[11px] flex-shrink"
        style={{ color: colorTokens.contentSecondary }}
      >
        {message}
      </Text>
    </Pressable>
  );
}
