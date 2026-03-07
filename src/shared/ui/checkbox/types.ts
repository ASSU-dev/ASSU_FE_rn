import type { Control, FieldValues, Path } from "react-hook-form";

export type CheckboxProps = {
  checked: boolean;
  label: string;
  showDivider?: boolean;
  onPress?: () => void;
};

export type CheckboxFieldProps<T extends FieldValues> = Omit<
  CheckboxProps,
  "checked" | "onPress"
> & {
  control: Control<T>;
  name: Path<T>;
};
