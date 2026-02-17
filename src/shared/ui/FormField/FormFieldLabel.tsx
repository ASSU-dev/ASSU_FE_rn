import { colorTokens } from "@/shared/styles/token";
import { Text } from "react-native";
import type { ColorTokenKey } from "./types";

type Props = {
  children: string;
  color?: ColorTokenKey;
};

export function FormFieldLabel({ children, color }: Props) {
  return (
    <Text
      className="mb-[5px] text-[13px] font-semibold"
      style={{
        color: color ? colorTokens[color] : colorTokens.contentSecondary,
      }}
    >
      {children}
    </Text>
  );
}
