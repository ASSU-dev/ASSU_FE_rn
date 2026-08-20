// 제휴 건의 폼 페이지 — 건의 대상, 희망 가게, 희망 혜택을 입력하고 제출하는 화면이다
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { AppTopBar } from "@/shared/ui";
import { PageLayout } from "@/shared/ui/layout/PageLayout";
import { SuggestionForm } from "./SuggestionForm";

export function StudentSuggestionFormPage() {
	return (
		<PageLayout withBottomInset contentContainerClassName="flex-1">
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<View className="flex-1">
					{/* 헤더 */}
					<AppTopBar title="제휴 건의함" titleAlign="left" />

					{/* 폼 */}
					<SuggestionForm />
				</View>
			</TouchableWithoutFeedback>
		</PageLayout>
	);
}
