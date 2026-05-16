import { Pressable, Text, TextInput, View } from "react-native";

import {
	BackArrowIcon,
	CloseIcon,
	LocationIcon,
	SearchIcon,
} from "@/shared/assets/icons";
import { colorTokens } from "@/shared/styles/tokens";

import type { SearchBarProps } from "./types";

const DEFAULT_PLACEHOLDER = "찾으시는 제휴 가게가 없나요?";

export function SearchBar(props: SearchBarProps) {
	if (props.mode === "default") {
		return (
			<Pressable onPress={props.onPress}>
				{({ pressed }) => (
					<View
						className="mx-4 my-3 flex-row items-center rounded-lg px-2.5 py-3"
						style={{
							backgroundColor: pressed
								? colorTokens.neutralVariant
								: colorTokens.neutral,
						}}
					>
						<SearchIcon
							width={20}
							height={20}
							color={colorTokens.contentSecondary}
						/>
						<Text
							className="ml-2.5 flex-1 font-regular text-sm leading-[21px] text-content-tertiary"
							numberOfLines={1}
						>
							{props.placeholder ?? DEFAULT_PLACEHOLDER}
						</Text>
					</View>
				)}
			</Pressable>
		);
	}

	const LeadingIcon =
		props.iconVariant === "location" ? LocationIcon : SearchIcon;

	return (
		<View className="mx-4 my-3 flex-row items-center gap-0.5">
			<Pressable onPress={props.onBack} hitSlop={8}>
				<BackArrowIcon
					width={24}
					height={24}
					color={colorTokens.contentPrimary}
				/>
			</Pressable>
			<View className="flex-1 flex-row items-center rounded-lg bg-neutral px-2.5 py-3">
				<LeadingIcon
					width={20}
					height={20}
					color={colorTokens.contentSecondary}
				/>
				<TextInput
					className="mx-2 flex-1 font-regular text-sm text-content-primary"
					style={{ paddingVertical: 0 }}
					value={props.value}
					onChangeText={props.onChangeText}
					placeholder={props.placeholder ?? DEFAULT_PLACEHOLDER}
					placeholderTextColor={colorTokens.contentTertiary}
					returnKeyType="search"
					clearButtonMode="never"
					autoFocus={props.autoFocus}
				/>
				{props.value.length > 0 && (
					<Pressable onPress={() => props.onChangeText("")} hitSlop={8}>
						<CloseIcon
							width={16}
							height={16}
							color={colorTokens.contentSecondary}
						/>
					</Pressable>
				)}
			</View>
		</View>
	);
}
