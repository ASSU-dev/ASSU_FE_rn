import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Modal, Platform, Pressable, Text, View } from "react-native";
import { colorTokens } from "@/shared/styles/tokens";
import { formatDate } from "@/shared/utils";
import { useDatePicker } from "../model";

interface Props {
	startDate: string | null;
	endDate: string | null;
	onStartDateChange: (date: string) => void;
	onEndDateChange: (date: string) => void;
	isDateOrderInvalid: boolean;
}

const formatDisplay = (d: string | null) => (d ? formatDate(d) : "YYYY.MM.DD");

const getEndDateMinimum = (startDate: string | null): Date | undefined => {
	if (!startDate) return undefined;
	const d = new Date(startDate);
	d.setDate(d.getDate() + 1);
	return d;
};

export function DateRangeField({
	startDate,
	endDate,
	onStartDateChange,
	onEndDateChange,
	isDateOrderInvalid,
}: Props) {
	const { dateField, tempDate, open, onChange, confirm, dismiss } =
		useDatePicker((field, date) => {
			if (field === "startDate") onStartDateChange(date);
			else onEndDateChange(date);
		});

	const endDateMinimum = getEndDateMinimum(startDate);

	return (
		<>
			<View className="flex-row items-center gap-[8px]">
				<Pressable
					className="bg-neutral rounded-lg flex-1 p-[15px] flex-row justify-between items-center"
					onPress={() => open("startDate", startDate)}
				>
					<Text
						className={`text-[14px] ${startDate ? "text-content-primary" : "text-content-secondary"}`}
					>
						{formatDisplay(startDate)}
					</Text>
					<Ionicons
						name="calendar-outline"
						size={20}
						color={colorTokens.contentSecondary}
					/>
				</Pressable>

				<Text className="text-[14px] text-content-secondary">~</Text>

				<Pressable
					className="bg-neutral rounded-lg flex-1 p-[15px] flex-row justify-between items-center"
					onPress={() => open("endDate", endDate)}
				>
					<Text
						className={`text-[14px] ${endDate ? "text-content-primary" : "text-content-secondary"}`}
					>
						{formatDisplay(endDate)}
					</Text>
					<Ionicons
						name="calendar-outline"
						size={20}
						color={colorTokens.contentSecondary}
					/>
				</Pressable>
			</View>

			{isDateOrderInvalid && (
				<Text className="text-[12px] text-red-500">
					종료일은 시작일보다 이후여야 합니다
				</Text>
			)}

			{Platform.OS === "android" && dateField && (
				<DateTimePicker
					value={tempDate}
					mode="date"
					display="calendar"
					onChange={onChange}
					minimumDate={dateField === "endDate" ? endDateMinimum : undefined}
				/>
			)}

			{Platform.OS === "ios" && (
				<Modal transparent animationType="slide" visible={!!dateField}>
					<Pressable className="flex-1 bg-black/40" onPress={dismiss} />
					<View className="bg-white rounded-t-2xl px-4 pb-6 pt-2">
						<View className="flex-row justify-between items-center py-3">
							<Pressable onPress={dismiss}>
								<Text className="text-[16px] text-content-secondary">취소</Text>
							</Pressable>
							<Pressable onPress={confirm}>
								<Text className="text-[16px] text-primary font-semibold">
									확인
								</Text>
							</Pressable>
						</View>
						<DateTimePicker
							value={tempDate}
							mode="date"
							display="spinner"
							onChange={onChange}
							minimumDate={dateField === "endDate" ? endDateMinimum : undefined}
							style={{ height: 200 }}
						/>
					</View>
				</Modal>
			)}
		</>
	);
}
