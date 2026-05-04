import { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppTopBar } from "@/shared/ui/app-top-bar";
import { FAQ_DATA } from "../model/mockFaqs";
import { FaqItem } from "./FaqItem";

export function FaqPage() {
	const [expandedId, setExpandedId] = useState<string | null>(null);

	const handleToggle = (id: string) => {
		setExpandedId((prev) => (prev === id ? null : id));
	};

	return (
		<SafeAreaView edges={["top"]} className="flex-1 bg-canvas">
			<AppTopBar title="자주 묻는 질문" />
			<ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
				{FAQ_DATA.map((faq) => (
					<FaqItem
						key={faq.id}
						question={faq.question}
						answer={faq.answer}
						isExpanded={expandedId === faq.id}
						onToggle={() => handleToggle(faq.id)}
					/>
				))}
			</ScrollView>
		</SafeAreaView>
	);
}
