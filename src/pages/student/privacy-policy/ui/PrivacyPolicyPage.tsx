import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppTopBar } from "@/shared/ui/app-top-bar";
import { PRIVACY_POLICY } from "../model/privacyPolicy";
import { PrivacyPolicyBlockView } from "./PrivacyPolicyBlockView";

export function PrivacyPolicyPage() {
	const { title, intro, sections } = PRIVACY_POLICY;

	return (
		<SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-canvas">
			<AppTopBar title={title} />
			<ScrollView
				contentContainerClassName="gap-[28px] px-screen-m pt-[20px] pb-[40px]"
				showsVerticalScrollIndicator={false}
			>
				<Text className="text-sm font-regular leading-body tracking-caption text-content-secondary">
					{intro}
				</Text>

				{sections.map((section) => (
					<View key={section.id} className="gap-[10px]">
						<Text className="text-md font-semibold leading-caption tracking-caption text-content-primary">
							{section.title}
						</Text>
						{section.blocks.map((block, index) => (
							<PrivacyPolicyBlockView
								key={`${section.id}-${index}`}
								block={block}
							/>
						))}
					</View>
				))}
			</ScrollView>
		</SafeAreaView>
	);
}
