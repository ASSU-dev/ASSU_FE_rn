import { colorTokens } from "@/shared/styles/token";
import type { ReactNode } from "react";
import { Text } from "react-native";

type Props = {
  children: ReactNode;
};

export function FormFieldHelper({ children }: Props) {
  return (
    <Text
      className="mt-3 text-[11px] text-right"
      style={{
        color: colorTokens.contentSecondary,
      }}
    >
      {children}
    </Text>
  );
}
