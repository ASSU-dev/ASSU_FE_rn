import { FlatList } from "react-native";

import { EmptyState } from "@/shared/ui/empty-state";

import type { ChatRoomItemProps } from "../model/types";
import { ChatRoomItem } from "./ChatRoomItem";

interface ChatRoomListProps {
	rooms: ChatRoomItemProps[];
	onPressRoom?: (id: string) => void;
}

export function ChatRoomList({ rooms, onPressRoom }: ChatRoomListProps) {
	return (
		<FlatList
			data={rooms}
			keyExtractor={(item) => item.id}
			getItemLayout={(_, index) => ({
				length: 70,
				offset: 70 * index,
				index,
			})}
			renderItem={({ item }) => (
				<ChatRoomItem {...item} onPress={() => onPressRoom?.(item.id)} />
			)}
			ListEmptyComponent={
				<EmptyState
					title="아직 채팅 내역이 없어요"
					description={"제휴 협력을 원하는 매장에 채팅을\n시도 할 수 있어요!"}
				/>
			}
		/>
	);
}
