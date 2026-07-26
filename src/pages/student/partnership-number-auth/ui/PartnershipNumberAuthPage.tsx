import { router } from "expo-router";
import { useRef, useState } from "react";
import {
	Keyboard,
	Pressable,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { parsePartnershipStoreId } from "@/features/partnership-auth";
import { BackArrowIcon } from "@/shared/assets/icons";
import { MediumButton } from "@/shared/ui/buttons/SubmitButton";
import { PageLayout } from "@/shared/ui/layout";

export function PartnershipNumberAuthPage() {
	const [storeCode, setStoreCode] = useState("");
	const inputRef = useRef<TextInput>(null);

	const handleChangeText = (value: string) => {
		setStoreCode(value.replace(/\D/g, "").slice(0, 2));
	};

	const handleComplete = () => {
		const storeId = parsePartnershipStoreId(storeCode);
		if (!storeId) return;

		router.push({
			pathname: "/(protected)/student/partnership-benefit-select",
			params: { storeId },
		});
	};

	return (
		<PageLayout withBottomInset contentContainerClassName="flex-1 px-screen-m">
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<View className="flex-1">
					<Pressable
						onPress={() => router.back()}
						hitSlop={8}
						className="mt-[9px] size-6 items-center justify-center"
					>
						<BackArrowIcon width={24} height={24} />
					</Pressable>

					<View className="mt-[45px] items-center gap-[12px]">
						<Text className="text-lg font-semibold leading-caption tracking-caption text-primary">
							매장 포스터에 적힌
						</Text>
						<Text className="text-[25px] font-semibold leading-[28px] tracking-caption text-content-primary">
							매장 번호를 입력해주세요
						</Text>
					</View>

					<Pressable
						onPress={() => inputRef.current?.focus()}
						className="mt-[61px] flex-row justify-center gap-[13px]"
					>
						{[0, 1].map((index) => (
							<View
								key={index}
								className="size-[74px] items-center justify-center rounded-[8px] bg-neutral"
							>
								<Text className="text-[48px] font-medium leading-[54px] text-content-primary">
									{storeCode[index] ?? ""}
								</Text>
							</View>
						))}
						<TextInput
							ref={inputRef}
							value={storeCode}
							onChangeText={handleChangeText}
							keyboardType="number-pad"
							maxLength={2}
							autoFocus
							caretHidden
							className="absolute size-px opacity-0"
						/>
					</Pressable>

					<View className="mt-auto items-center pb-[4px]">
						<MediumButton
							disabled={storeCode.length !== 2}
							onPress={handleComplete}
						>
							입력 완료
						</MediumButton>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</PageLayout>
	);
}
