// 혜택 목록 영역 — BenefitCard 목록을 렌더링한다
import { View } from "react-native";
import type { Benefit } from "../model/types";
import { BenefitCard } from "./BenefitCard";

interface BenefitListProps {
	benefits: Benefit[];
}

export function BenefitList({ benefits }: BenefitListProps) {
	return (
		<View>
			{benefits.map((item, index) => (
				<BenefitCard
					key={item.id}
					{...item}
					isFirst={index === 0}
					isLast={index === benefits.length - 1}
				/>
			))}
		</View>
	);
}
