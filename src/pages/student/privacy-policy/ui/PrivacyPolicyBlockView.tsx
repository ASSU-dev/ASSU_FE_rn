import { Text, View } from "react-native";
import type { PrivacyPolicyBlock, PrivacyPolicyListItem } from "../model/types";

const BODY_TEXT_CLASS =
	"text-sm font-regular leading-body tracking-caption text-content-secondary";

function BulletRow({ text, marker }: { text: string; marker: string }) {
	return (
		<View className="flex-row">
			<Text className={`w-[14px] ${BODY_TEXT_CLASS}`}>{marker}</Text>
			<Text className={`flex-1 ${BODY_TEXT_CLASS}`}>{text}</Text>
		</View>
	);
}

function ListItemView({ item }: { item: PrivacyPolicyListItem }) {
	if (typeof item === "string") {
		return <BulletRow text={item} marker="•" />;
	}

	return (
		<View className="gap-[4px]">
			<BulletRow text={item.text} marker="•" />
			<View className="gap-[4px] pl-[14px]">
				{item.children.map((child) => (
					<BulletRow key={child} text={child} marker="◦" />
				))}
			</View>
		</View>
	);
}

interface PrivacyPolicyBlockViewProps {
	block: PrivacyPolicyBlock;
}

export function PrivacyPolicyBlockView({ block }: PrivacyPolicyBlockViewProps) {
	if (block.type === "paragraph") {
		return <Text className={BODY_TEXT_CLASS}>{block.text}</Text>;
	}

	if (block.type === "subheading") {
		return (
			<Text className="mt-[4px] text-sm font-semibold leading-body tracking-caption text-content-primary">
				{block.text}
			</Text>
		);
	}

	return (
		<View className="gap-[4px]">
			{block.items.map((item) => (
				<ListItemView
					key={typeof item === "string" ? item : item.text}
					item={item}
				/>
			))}
		</View>
	);
}
