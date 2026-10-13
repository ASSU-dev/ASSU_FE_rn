import { Pressable, Text, View } from "react-native";
import type { StoreBenefit } from "@/entities/store";
import { CheckCircleOff, CheckCircleOn } from "@/shared/assets/icons";

interface PartnershipSelectItemProps {
	benefit: StoreBenefit;
	isSelected: boolean;
	onPress: () => void;
}

function formatPartnershipPeriod(period: string): string {
	const formattedPeriod = period
		.trim()
		.replace(/\b(\d{4})-(\d{2})-(\d{2})\b/g, "$1.$2.$3");

	return /^제휴기간(?:\s|$)/.test(formattedPeriod)
		? formattedPeriod
		: `제휴기간 ${formattedPeriod}`;
}

function getPaperContentSegments(paperContent: string, goods: string[]) {
	const goodsMatches = goods
		.map((good) => good.trim())
		.filter(Boolean)
		.flatMap((good) => {
			const matches: { start: number; end: number }[] = [];
			let start = paperContent.indexOf(good);

			while (start !== -1) {
				matches.push({ start, end: start + good.length });
				start = paperContent.indexOf(good, start + good.length);
			}

			return matches;
		})
		.sort((a, b) => a.start - b.start || b.end - a.end);
	const segments: { text: string; isGood: boolean }[] = [];
	let cursor = 0;

	for (const match of goodsMatches) {
		if (match.start < cursor) continue;
		if (match.start > cursor) {
			segments.push({
				text: paperContent.slice(cursor, match.start),
				isGood: false,
			});
		}
		segments.push({
			text: paperContent.slice(match.start, match.end),
			isGood: true,
		});
		cursor = match.end;
	}

	if (cursor < paperContent.length) {
		segments.push({ text: paperContent.slice(cursor), isGood: false });
	}

	return segments;
}

export function PartnershipSelectItem({
	benefit,
	isSelected,
	onPress,
}: PartnershipSelectItemProps) {
	return (
		<Pressable
			onPress={onPress}
			className={`min-h-[75px] flex-row items-center gap-gutter rounded-[8px] border bg-canvas px-3 py-4 ${
				isSelected ? "border-primary" : "border-neutral-variant"
			}`}
		>
			{isSelected ? (
				<CheckCircleOn width={22} height={22} />
			) : (
				<CheckCircleOff width={22} height={22} />
			)}
			<View className="flex-1 gap-1.5">
				<View className="flex-row items-center justify-between">
					<View className="shrink-0 items-center justify-center rounded-full bg-neutral px-2.5 py-0.5">
						<Text className="font-regular text-[11px] leading-[21px] tracking-[-0.32px] text-content-primary">
							{benefit.adminName}
						</Text>
					</View>
					<Text className="max-w-[154px] flex-1 font-semibold text-md text-right tracking-[-0.32px]">
						{getPaperContentSegments(benefit.paperContent, benefit.goods).map(
							(segment, index) => (
								<Text
									key={`${index}-${segment.text}`}
									className={
										segment.isGood ? "text-primary" : "text-content-primary"
									}
								>
									{segment.text}
								</Text>
							),
						)}
					</Text>
				</View>
				{benefit.partnershipPeriod ? (
					<Text className="w-full font-regular text-[11px] leading-normal tracking-[-0.32px] text-content-secondary">
						{formatPartnershipPeriod(benefit.partnershipPeriod)}
					</Text>
				) : null}
			</View>
		</Pressable>
	);
}
