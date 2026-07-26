import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { BackArrowIcon } from "@/shared/assets/icons";
import { MediumButton } from "@/shared/ui/buttons/SubmitButton";
import { PageLayout } from "@/shared/ui/layout";

type AuthMethod = "qr" | "number";

interface AuthMethodCardProps {
	method: AuthMethod;
	label: string;
	selected: boolean;
	onPress: () => void;
}

const AUTH_METHOD_IMAGES = {
	qr: require("@/shared/assets/images/partnership-qr-auth.png"),
	number: require("@/shared/assets/images/partnership-number-auth.png"),
} as const;

function AuthMethodCard({
	method,
	label,
	selected,
	onPress,
}: AuthMethodCardProps) {
	return (
		<Pressable
			accessibilityRole="radio"
			accessibilityState={{ selected }}
			onPress={onPress}
			className={`h-[214px] flex-1 items-center justify-center gap-[14px] rounded-[10px] bg-neutral ${
				selected ? "border-[3px] border-primary" : ""
			}`}
		>
			<View className="relative size-[100px] overflow-hidden">
				<Image
					source={AUTH_METHOD_IMAGES[method]}
					resizeMode="stretch"
					className="absolute size-[259px]"
					style={{
						left: method === "qr" ? -21 : -139,
						top: -67,
					}}
				/>
			</View>
			<Text className="text-md font-semibold text-primary">{label}</Text>
		</Pressable>
	);
}

export function PartnershipAuthPage() {
	const [selectedMethod, setSelectedMethod] = useState<AuthMethod | null>(null);

	const handleNext = () => {
		if (!selectedMethod) return;

		router.push(
			selectedMethod === "qr"
				? "/(protected)/student/partnership-qr-auth"
				: "/(protected)/student/partnership-number-auth",
		);
	};

	return (
		<PageLayout withBottomInset contentContainerClassName="flex-1 px-screen-m">
			<Pressable
				onPress={() => router.back()}
				hitSlop={8}
				className="mt-[9px] size-6 items-center justify-center"
			>
				<BackArrowIcon width={24} height={24} />
			</Pressable>

			<View className="mt-[45px] items-center gap-[12px]">
				<Text className="text-lg font-semibold leading-caption tracking-caption text-primary">
					가게에 있는 포스터를 찾고
				</Text>
				<Text className="text-[25px] font-semibold leading-[28px] tracking-caption text-content-primary">
					사용자 인증 방법을 선택해주세요
				</Text>
			</View>

			<View
				accessibilityRole="radiogroup"
				className="mt-[112px] flex-row gap-gutter"
			>
				<AuthMethodCard
					method="qr"
					label="QR 인증"
					selected={selectedMethod === "qr"}
					onPress={() => setSelectedMethod("qr")}
				/>
				<AuthMethodCard
					method="number"
					label="번호 인증"
					selected={selectedMethod === "number"}
					onPress={() => setSelectedMethod("number")}
				/>
			</View>

			<View className="mt-auto items-center pb-[4px]">
				<MediumButton disabled={!selectedMethod} onPress={handleNext}>
					다음
				</MediumButton>
			</View>
		</PageLayout>
	);
}
