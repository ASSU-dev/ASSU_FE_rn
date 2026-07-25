import { Ionicons } from "@expo/vector-icons";
import {
	type BarcodeScanningResult,
	CameraView,
	useCameraPermissions,
} from "expo-camera";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
	certifyGroupParticipant,
	parseGroupCertificationQr,
	parsePartnershipStoreId,
} from "@/features/partnership-auth";
import { colorTokens } from "@/shared/styles/tokens";
import { MediumButton } from "@/shared/ui/buttons/SubmitButton";

export function PartnershipQrAuthPage() {
	const insets = useSafeAreaInsets();
	const [permission, requestPermission] = useCameraPermissions();
	const [scannedValue, setScannedValue] = useState<string | null>(null);

	const handleBarcodeScanned = ({ data }: BarcodeScanningResult) => {
		setScannedValue((currentValue) => currentValue ?? data);
	};

	const handleConfirm = () => {
		if (!scannedValue) return;
		const groupCertification = parseGroupCertificationQr(scannedValue);
		if (groupCertification) {
			const published = certifyGroupParticipant(groupCertification);
			if (!published) {
				Alert.alert(
					"연결 확인",
					"인증 서버에 연결되지 않았습니다. 잠시 후 다시 시도해주세요.",
				);
				return;
			}

			router.replace({
				pathname: "/(protected)/student/partnership-complete",
				params: { benefit: "그룹 제휴" },
			});
			return;
		}

		const storeId = parsePartnershipStoreId(scannedValue);
		if (!storeId) {
			Alert.alert("QR 확인 실패", "올바른 제휴 QR 코드가 아닙니다.");
			setScannedValue(null);
			return;
		}

		router.push({
			pathname: "/(protected)/student/partnership-benefit-select",
			params: { storeId },
		});
	};

	return (
		<View className="flex-1 bg-content-primary">
			{permission?.granted ? (
				<CameraView
					style={StyleSheet.absoluteFillObject}
					facing="back"
					barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
					onBarcodeScanned={scannedValue ? undefined : handleBarcodeScanned}
				/>
			) : null}

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
				{permission?.granted ? (
					<>
						<Text className="mt-[30px] text-md font-semibold text-content-inverse">
							{scannedValue
								? "QR 코드를 확인했습니다"
								: "제휴 QR 코드를 스캔해주세요"}
						</Text>
						{scannedValue ? (
							<Pressable
								onPress={() => setScannedValue(null)}
								className="mt-[12px] rounded-[8px] bg-neutral px-[20px] py-gutter"
							>
								<Text className="text-sm font-semibold text-content-secondary">
									다시 스캔
								</Text>
							</Pressable>
						) : null}
					</>
				) : permission ? (
					<View className="mt-[30px] items-center gap-gutter px-screen-m">
						<Text className="text-center text-md font-semibold text-content-inverse">
							QR 인증을 위해 카메라 권한이 필요합니다
						</Text>
						<Pressable
							onPress={() => requestPermission()}
							className="rounded-[8px] bg-neutral px-[20px] py-gutter"
						>
							<Text className="text-sm font-semibold text-content-secondary">
								카메라 권한 허용
							</Text>
						</Pressable>
					</View>
				) : (
					<Text className="mt-[30px] text-md font-semibold text-content-inverse">
						카메라를 준비하고 있습니다
					</Text>
				)}
			</View>

			<View
				className="gap-[36px] rounded-t-[20px] bg-content-primary px-screen-m pt-[15px]"
				style={{ paddingBottom: insets.bottom + 20 }}
			>
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
