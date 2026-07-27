// 혜택 목록 영역 — BenefitCard 목록을 렌더링
import { View } from "react-native";
import type { ReviewBenefitItem } from "../model/types";
import { BenefitCard } from "./BenefitCard";

interface BenefitListProps {
	benefits: ReviewBenefitItem[];
	onReviewPress: (benefit: ReviewBenefitItem) => void;
}

export function BenefitList({ benefits, onReviewPress }: BenefitListProps) {
	return (
		<View>
			{benefits.map((item, index) => (
				<BenefitCard
					key={item.id}
					{...item}
					onReviewPress={() => onReviewPress(item)}
					isFirst={index === 0}
					isLast={index === benefits.length - 1}
				/>
			))}
		</View>
	);
}
