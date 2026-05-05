import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppTopBar } from "@/shared/ui/app-top-bar";
import { FAQ_DATA } from "../model/mockFaqs";
import { FaqItem } from "./FaqItem";

export function FaqPage() {
	const [expandedId, setExpandedId] = useState<string | null>(null);

	const handleToggle = useCallback((id: string) => {
		setExpandedId((prev) => (prev === id ? null : id));
	}, []);

	return (
		<SafeAreaView edges={["top"]} className="flex-1 bg-canvas">
			<AppTopBar title="자주 묻는 질문" />
			<FlatList
				data={FAQ_DATA}
				keyExtractor={(item) => item.id}
				contentContainerStyle={{ paddingBottom: 32 }}
				renderItem={({ item }) => (
					<FaqItem
						id={item.id}
						question={item.question}
						answer={item.answer}
						isExpanded={expandedId === item.id}
						onToggle={handleToggle}
					/>
				)}
			/>
		</SafeAreaView>
	);
}
