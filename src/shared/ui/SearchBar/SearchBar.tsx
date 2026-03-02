import { Pressable, Text, TextInput, View } from "react-native";

import { BackArrowIcon, CloseIcon, SearchIcon } from "@/shared/assets/icons";
import { colorTokens } from "@/shared/styles/tokens";

import type { SearchBarProps } from "./types";

/**
 * 서치바 공통 컴포넌트
 *
 * - mode="default": 전체 영역이 Pressable. 검색 화면 진입 전 사용.
 * - mode="active":  실제 TextInput. 검색 서브페이지에서 사용.
 *                  뒤로가기 버튼 포함, 텍스트 입력 시 X(초기화) 버튼 노출.
 *
 * Safe area 패딩은 이 컴포넌트를 사용하는 페이지/레이아웃에서 처리.
 *
 * 아이콘 파일:
 *   src/shared/assets/icons/search-icon.svg  → SearchIcon
 *   src/shared/assets/icons/close-icon.svg   → CloseIcon
 *   src/shared/assets/icons/back-arrow-icon.svg → BackArrowIcon
 */
export function SearchBar(props: SearchBarProps) {
	if (props.mode === "default") {
		return (
			<Pressable onPress={props.onPress}>
				{({ pressed }) => (
					<View
						className="flex-row items-center rounded-lg mx-4 my-3 px-2.5 py-3"
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
							className="flex-1 ml-2.5 font-regular text-sm leading-[21px] text-content-tertiary"
							numberOfLines={1}
						>
							{props.placeholder ?? "찾으시는 제휴 가게가 없나요?"}
						</Text>
					</View>
				)}
			</Pressable>
		);
	}

	return (
		<View className="flex-row items-center mx-4 my-3 gap-0.5">
			<Pressable onPress={props.onBack} hitSlop={8}>
				<BackArrowIcon
					width={24}
					height={24}
					color={colorTokens.contentPrimary}
				/>
			</Pressable>
			<View className="flex-1 flex-row items-center bg-neutral rounded-lg px-2.5 py-3">
				<SearchIcon
					width={20}
					height={20}
					color={colorTokens.contentSecondary}
				/>
				<TextInput
					className="flex-1 mx-2 font-regular text-sm leading-[21px] text-content-primary"
					style={{ paddingVertical: 0 }}
					value={props.value}
					onChangeText={props.onChangeText}
					placeholder={props.placeholder ?? "찾으시는 제휴 가게가 없나요?"}
					placeholderTextColor={colorTokens.contentTertiary}
					returnKeyType="search"
					clearButtonMode="never"
					autoFocus={props.autoFocus}
				/>
				{props.value.length > 0 && (
					<Pressable
						onPress={() => props.onChangeText("")}
						hitSlop={8}
					>
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
