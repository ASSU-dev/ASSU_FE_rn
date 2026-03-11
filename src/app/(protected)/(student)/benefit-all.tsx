// 제휴 내역 전체보기 라우트 — suggestion 탭 전체보기 버튼으로 진입하는 Stack 스크린이다
import { useLocalSearchParams } from "expo-router";
import { useBenefitsStore } from "@/pages/student/suggestion/model/useBenefitsStore";
import { BenefitAllPage } from "@/pages/student/suggestion/ui/BenefitAllPage";

export default function BenefitAllScreen() {
	const { month } = useLocalSearchParams<{ month: string }>();
	const initialMonth = month ? parseInt(month, 10) : new Date().getMonth() + 1;
	const benefits = useBenefitsStore((s) => s.benefits);

	// TODO: API 연동 후 실제 혜택 데이터 전달
	return <BenefitAllPage initialMonth={initialMonth} benefits={benefits} />;
}
