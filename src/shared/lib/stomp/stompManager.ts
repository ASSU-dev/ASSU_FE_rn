import { Client, type IMessage, type StompSubscription } from "@stomp/stompjs";

import { ENV } from "@/shared/config/env";
import { useAuthStore } from "@/shared/lib/auth/authStore";

export class StompManager {
	private client: Client;
	private subRegistry = new Map<
		symbol,
		{ topic: string; callback: (msg: IMessage) => void }
	>();
	private stompSubs = new Map<symbol, StompSubscription>();

	constructor() {
		this.client = new Client({
			webSocketFactory: () => new WebSocket(ENV.STOMP_BROKER_URL),
			reconnectDelay: 5000,
			heartbeatIncoming: 10000,
			heartbeatOutgoing: 10000,
			forceBinaryWSFrames: true,
			appendMissingNULLonIncoming: true,
		});

		this.client.beforeConnect = () => {
			const token = useAuthStore.getState().accessToken;
			this.client.connectHeaders = token
				? { Authorization: `Bearer ${token}` }
				: {};
		};

		this.client.onConnect = () => {
			console.log("[STOMP] connected");
			for (const [key, { topic, callback }] of this.subRegistry.entries()) {
				this.stompSubs.set(key, this.client.subscribe(topic, callback));
			}
		};

		this.client.onDisconnect = () => {
			console.log("[STOMP] disconnected");
			// stompSubs 무효화 — onConnect 시 subRegistry 기준으로 재구독
			this.stompSubs.clear();
		};

		this.client.onStompError = (frame) => {
			console.log("[STOMP ERR]", frame.headers["message"], frame.body);
		};

		this.client.onWebSocketError = (evt) => {
			console.log("[STOMP WS ERR]", evt);
		};
	}

	get isActive(): boolean {
		return this.client.active;
	}

	activate(): void {
		if (!this.client.active) {
			this.client.activate();
		}
	}

	deactivate(): void {
		if (this.client.active) {
			this.client.deactivate();
		}
	}

	// topic 구독: 반환된 함수 호출 시 구독 해제
	subscribeToTopic(
		topic: string,
		callback: (msg: IMessage) => void,
	): () => void {
		const key = Symbol();
		this.subRegistry.set(key, { topic, callback });

		if (this.client.connected) {
			this.stompSubs.set(key, this.client.subscribe(topic, callback));
		}
		// 미연결 상태면 onConnect에서 subRegistry 기준으로 일괄 구독

		return () => {
			this.subRegistry.delete(key);
			this.stompSubs.get(key)?.unsubscribe();
			this.stompSubs.delete(key);
		};
	}

	// 메시지 발행
	publish(destination: string, body: string): void {
		if (this.client.connected) {
			this.client.publish({ destination, body });
		}
	}
}

// 앱 전체에서 단 하나의 STOMP 연결을 사용.
// 이 파일 외에서 new StompManager() 금지.
export const stompManager = new StompManager();
