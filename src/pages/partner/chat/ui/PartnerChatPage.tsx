import { FlatList, View } from "react-native";

import { ChatRoomItem, type ChatRoomItemProps } from "@/entities/chat";
import { EmptyState } from "@/shared/ui/empty-state";
import { PageLayout } from "@/shared/ui/layout";
import { PageTitle } from "@/shared/ui/page-title";

import { MOCK_PARTNER_CHAT_ROOMS } from "../model/mockChatRooms"; // 목데이터

// 채팅방 리스트 로컬 컴포넌트
function ChatRoomList({ rooms }: { rooms: ChatRoomItemProps[] }) {
	return (
		<FlatList
			data={rooms}
			keyExtractor={(item) => item.id}
			getItemLayout={(_, index) => ({
				length: 70,
				offset: 70 * index,
				index,
			})}
			renderItem={({ item }) => <ChatRoomItem {...item} />}
			ListEmptyComponent={
				<EmptyState
					title="아직 채팅 내역이 없어요"
					description={"제휴 협력을 원하는 매장에 채팅을\n시도 할 수 있어요!"}
				/>
			}
			contentContainerClassName="pt-2"
		/>
	);
}

// PageLayout에 px-6을 적용하지 않은 이유: 디자인 상 채팅방 아이템이 화면 양 끝까지 닿아야 하기 때문
export function PartnerChatPage() {
	return (
		<PageLayout
			withTopInset={true}
			withBottomInset={false}
			className="flex-1 bg-canvas"
			contentContainerClassName="flex-1 pt-6"
		>
			<View className="px-6">
				<PageTitle title="채팅 내역" />
			</View>
			<ChatRoomList rooms={MOCK_PARTNER_CHAT_ROOMS} />
		</PageLayout>
	);
}
