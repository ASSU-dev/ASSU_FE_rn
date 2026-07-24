import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { parsePartnershipStoreId } from "@/features/partnership-auth";
import { colorTokens } from "@/shared/styles/tokens";
import { MediumButton } from "@/shared/ui/buttons/SubmitButton";

export function PartnershipQrAuthPage() {
	const [scannedValue] = useState<string | null>(null);

	// TODO: expo-camera가 포함된 개발 빌드를 설치한 뒤 아래 import와 함께 복구합니다.
	// import {
	// 	type BarcodeScanningResult,
	// 	CameraView,
	// 	useCameraPermissions,
	// } from "expo-camera";
	//
	// const [permission, requestPermission] = useCameraPermissions();
	// const handleBarcodeScanned = ({ data }: BarcodeScanningResult) => {
	// 	if (!scannedValue) setScannedValue(data);
	// };

	const handleConfirm = () => {
		if (!scannedValue) return;
		const storeId = parsePartnershipStoreId(scannedValue);
		if (!storeId) {
			Alert.alert("QR 확인 실패", "올바른 제휴 QR 코드가 아닙니다.");
			return;
		}

		router.push({
			pathname: "/(protected)/student/partnership-benefit-select",
			params: { storeId },
		});
	};

	return (
		<View className="flex-1 bg-content-primary">
			{/* TODO: expo-camera 네이티브 모듈 설치 후 이 영역을 복구합니다.
			<CameraView
				className="absolute inset-0"
				facing="back"
				barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
				onBarcodeScanned={scannedValue ? undefined : handleBarcodeScanned}
			/>
			*/}

			<View
				className="absolute inset-0 bg-overlay-strong"
				pointerEvents="none"
			/>

			<View className="flex-row items-center px-screen-m pt-[68px]">
				<Pressable
					onPress={() => router.back()}
					hitSlop={8}
					className="size-6 items-center justify-center"
				>
					<Ionicons
						name="chevron-back"
						size={24}
						color={colorTokens.contentInverse}
					/>
				</Pressable>
				<Text className="px-[5px] text-[20px] font-semibold text-content-inverse">
					제휴 사용자 인증
				</Text>
			</View>

			<View className="flex-1 items-center justify-center pb-[40px]">
				<View className="size-[222px] rounded-[12px] border-[8px] border-primary" />
				<Text className="mt-[30px] text-md font-semibold text-content-inverse">
					제휴 QR 코드를 스캔해주세요
				</Text>
			</View>

			<View className="gap-[36px] rounded-t-[20px] bg-content-primary px-screen-m pb-[20px] pt-[15px]">
				<View className="items-center gap-gutter">
					<View className="h-[5px] w-[36px] rounded-[999px] bg-handle-on-dark" />
					<View className="w-full">
						<View className="flex-row items-center gap-gutter py-gutter">
							<Text className="text-[22px] font-semibold text-content-inverse">
								숭실대학교 학생
							</Text>
							<View className="rounded-[999px] border border-sub px-gutter py-[2px]">
								<Text className="text-[11px] font-regular leading-caption tracking-caption text-sub">
									IT대학
								</Text>
							</View>
						</View>
						<View className="flex-row items-center gap-[4px]">
							<Ionicons
								name="information-circle-outline"
								size={10}
								color={colorTokens.contentInverse}
							/>
							<Text className="text-[11px] font-regular leading-caption tracking-caption text-content-inverse">
								제휴 인원조건이 있는 경우 모든 사용자가 인증해야합니다
							</Text>
						</View>
					</View>
				</View>

				<View className="items-center">
					<MediumButton disabled={!scannedValue} onPress={handleConfirm}>
						확인
					</MediumButton>
				</View>
			</View>
		</View>
	);
}
