import { Pressable, Text, View } from "react-native";
import { BENEFIT_TEXT_MAX_LENGTH } from "../model";
import { BenefitInput } from "./BenefitInput";

interface Props {
	index: number;
	onRemove: () => void;
}

export function BenefitCard({ index, onRemove }: Props) {
	return (
		<View className="bg-neutral rounded-lg px-[20px]">
			{/* 헤더: 혜택 번호 + 삭제 */}
			<View className="py-[15px] flex-row items-center justify-between">
				<Text className="text-primary text-[13px] font-medium">
					혜택 {index + 1}
				</Text>
				<Pressable onPress={onRemove}>
					<Text className="text-content-secondary text-[13px]">삭제하기</Text>
				</Pressable>
			</View>

			<View className="pb-[20px] gap-[10px] px-[10px]">
				<BenefitInput
					index={index}
					name="benefitCondition"
					label="혜택 조건 (선택)"
					placeholder="예) 30,000원 이상 주문 시"
					maxLength={BENEFIT_TEXT_MAX_LENGTH}
				/>
				<BenefitInput
					index={index}
					name="benefit"
					label="혜택 내용"
					placeholder="예) 음료 1캔 제공"
					multiline
				/>
				<BenefitInput
					index={index}
					name="caution"
					label="유의사항 (선택)"
					placeholder="예) 학생증 지참"
					maxLength={BENEFIT_TEXT_MAX_LENGTH}
				/>
				<BenefitInput
					index={index}
					name="minPeople"
					label="최소 인원 (선택)"
					placeholder="단체 인증 혜택일 때만 입력 (예: 4)"
					numeric
				/>
			</View>
		</View>
	);
}
