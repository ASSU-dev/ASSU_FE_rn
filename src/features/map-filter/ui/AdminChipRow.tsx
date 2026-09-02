import { Pressable, ScrollView, Text } from "react-native";

/** 학생회 필터 항목 — 데이터 소스 API 확정 전까지 호출부에서 주입 */
export interface AdminFilterItem {
	id: string;
	name: string;
}

interface AdminChipProps {
	name: string;
	selected: boolean;
	onPress: () => void;
}

function AdminChip({ name, selected, onPress }: AdminChipProps) {
	return (
		<Pressable
			className={`items-center justify-center rounded-[999px] px-[12px] py-1.5 ${
				selected
					? "bg-primary border border-primary"
					: "border border-neutral-variant"
			}`}
			onPress={onPress}
		>
			<Text
				className={`text-[14px] font-semibold ${
					selected ? "text-content-inverse" : "text-content-secondary"
				}`}
			>
				{name}
			</Text>
		</Pressable>
	);
}

interface AdminChipRowProps {
	admins: AdminFilterItem[];
	selectedAdminId: string | null;
	onToggleAdmin: (adminId: string) => void;
}

/** 학생회 필터 칩 행 — 바텀시트/전체 리스트 화면 공용 */
export function AdminChipRow({
	admins,
	selectedAdminId,
	onToggleAdmin,
}: AdminChipRowProps) {
	if (admins.length === 0) return null;

	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			// 세로 flex 컨테이너(바텀시트) 안에서 남는 높이를 차지하지 않도록 고정
			style={{ flexGrow: 0 }}
			contentContainerClassName="flex-row gap-[9px] px-card-p"
		>
			{admins.map((admin) => (
				<AdminChip
					key={admin.id}
					name={admin.name}
					selected={selectedAdminId === admin.id}
					onPress={() => onToggleAdmin(admin.id)}
				/>
			))}
		</ScrollView>
	);
}
