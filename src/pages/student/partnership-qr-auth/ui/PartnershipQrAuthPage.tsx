import { Ionicons } from "@expo/vector-icons";
import {
	type BarcodeScanningResult,
	CameraView,
	useCameraPermissions,
} from "expo-camera";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
	parseGroupCertificationQr,
	parsePartnershipStoreId,
	usePartnershipAuthStore,
} from "@/features/partnership-auth";
import { colorTokens } from "@/shared/styles/tokens";
import { MediumButton } from "@/shared/ui/buttons/SubmitButton";

export function PartnershipQrAuthPage() {
	const insets = useSafeAreaInsets();
	const [permission, requestPermission] = useCameraPermissions();
	const [scannedValue, setScannedValue] = useState<string | null>(null);
	const setStore = usePartnershipAuthStore((state) => state.setStore);
	const setSelectedBenefit = usePartnershipAuthStore(
		(state) => state.setSelectedBenefit,
	);
	const setGroupSession = usePartnershipAuthStore(
		(state) => state.setGroupSession,
	);
	const isScanLockedRef = useRef(false);
	const cameraAreaRef = useRef<View>(null);
	const scanFrameRef = useRef<View>(null);
	const scanFrameBoundsRef = useRef<{
		x: number;
		y: number;
		width: number;
		height: number;
	} | null>(null);

	const resetScanner = useCallback(() => {
		isScanLockedRef.current = false;
		setScannedValue(null);
	}, []);

	useFocusEffect(
		useCallback(() => {
			resetScanner();
		}, [resetScanner]),
	);

	const measureScanFrame = useCallback(() => {
		cameraAreaRef.current?.measureInWindow((cameraX, cameraY) => {
			scanFrameRef.current?.measureInWindow((x, y, width, height) => {
				scanFrameBoundsRef.current = {
					x: x - cameraX,
					y: y - cameraY,
					width,
					height,
				};
			});
		});
	}, []);

	const handleBarcodeScanned = ({
		data,
		bounds,
		cornerPoints,
	}: BarcodeScanningResult) => {
		if (isScanLockedRef.current) return;

		const scanFrame = scanFrameBoundsRef.current;
		if (!scanFrame) return;

		const barcodeCenter =
			cornerPoints.length > 0
				? cornerPoints.reduce(
						(center, point) => ({
							x: center.x + point.x / cornerPoints.length,
							y: center.y + point.y / cornerPoints.length,
						}),
						{ x: 0, y: 0 },
					)
				: {
						x: bounds.origin.x + bounds.size.width / 2,
						y: bounds.origin.y + bounds.size.height / 2,
					};
		const isInsideScanFrame =
			barcodeCenter.x >= scanFrame.x &&
			barcodeCenter.x <= scanFrame.x + scanFrame.width &&
			barcodeCenter.y >= scanFrame.y &&
			barcodeCenter.y <= scanFrame.y + scanFrame.height;

		if (!isInsideScanFrame) return;

		isScanLockedRef.current = true;
		if (__DEV__) {
			console.log("[QR SCANNED]", { data });
		}
		setScannedValue(data);
	};

	const handleConfirm = () => {
		if (!scannedValue) return;
		if (__DEV__) {
			console.log("[QR CONFIRM]", { scannedValue });
		}
		const groupCertification = parseGroupCertificationQr(scannedValue);
		if (groupCertification) {
			const benefit = {
				id: groupCertification.contentId,
				adminId: groupCertification.adminId,
				manager: groupCertification.adminName,
				contents: groupCertification.partnershipContent,
				goods: groupCertification.goods,
				people: groupCertification.requiredPeople,
				cost: null,
				type: "GROUP",
			} as const;
			setStore({
				storeId: groupCertification.storeId,
				storeName: groupCertification.storeName,
				benefits: [benefit],
			});
			setSelectedBenefit(benefit);
			setGroupSession({
				sessionId: groupCertification.sessionId,
				requiredPeople: groupCertification.requiredPeople,
				count: 0,
				status: "WAITING",
				userIds: [],
				role: "PARTICIPANT",
			});
			router.replace("/(protected)/student/partnership-group-participant");
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
		<View ref={cameraAreaRef} className="flex-1 bg-content-primary">
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
				<View
					ref={scanFrameRef}
					onLayout={measureScanFrame}
					className="size-[222px] rounded-[12px] border-[8px] border-primary"
				/>
				{permission?.granted ? (
					<>
						<Text className="mt-[30px] text-md font-semibold text-content-inverse">
							{scannedValue
								? "QR 코드를 확인했습니다"
								: "제휴 QR 코드를 스캔해주세요"}
						</Text>
						{scannedValue ? (
							<Pressable
								onPress={resetScanner}
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
