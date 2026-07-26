import { Client, type IMessage, type StompSubscription } from "@stomp/stompjs";

import { ENV } from "@/shared/config/env";
import { useAuthStore } from "@/shared/lib/auth/authStore";

export class StompManager {
	private client: Client;
	private readonly brokerUrl = ENV.STOMP_BROKER_URL.trim();
	private readonly isBrokerUrlValid = /^wss?:\/\/\S+$/i.test(this.brokerUrl);
	private receiptSequence = 0;
	private subRegistry = new Map<
		symbol,
		{ topic: string; callback: (msg: IMessage) => void }
	>();
	private stompSubs = new Map<symbol, StompSubscription>();

	constructor() {
		this.client = new Client({
			webSocketFactory: () => new WebSocket(this.brokerUrl),
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
				this.subscribe(key, topic, callback, "resubscribed");
			}
		};

		this.client.onDisconnect = () => {
			console.log("[STOMP] disconnected");
			// stompSubs 무효화 — onConnect 시 subRegistry 기준으로 재구독
			this.stompSubs.clear();
		};

		this.client.onStompError = (frame) => {
			console.log("[STOMP ERR]", frame.headers.message, frame.body);
		};

		this.client.onWebSocketError = (evt) => {
			console.log("[STOMP WS ERR]", evt);
		};

		this.client.onWebSocketClose = (evt) => {
			if (__DEV__) {
				console.log("[STOMP WS CLOSE]", {
					code: evt.code,
					reason: evt.reason,
					wasClean: evt.wasClean,
				});
			}
		};

		this.client.onUnhandledFrame = (frame) => {
			if (__DEV__) {
				console.log("[STOMP UNHANDLED FRAME]", {
					command: frame.command,
					headers: frame.headers,
					body: frame.body,
				});
			}
		};

		this.client.onUnhandledMessage = (message) => {
			if (__DEV__) {
				console.log("[STOMP UNHANDLED MESSAGE]", {
					headers: message.headers,
					body: message.body,
				});
			}
		};

		this.client.onUnhandledReceipt = (frame) => {
			if (__DEV__) {
				console.log("[STOMP UNHANDLED RECEIPT]", frame.headers);
			}
		};
	}

	get isActive(): boolean {
		return this.client.active;
	}

	activate(): void {
		if (!this.isBrokerUrlValid) {
			console.warn(
				"[STOMP] connection skipped: EXPO_PUBLIC_STOMP_BROKER_URL must use ws:// or wss://",
			);
			return;
		}

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
		if (__DEV__ && !this.client.connected) {
			console.log("[STOMP SUBSCRIBE]", {
				topic,
				state: "queued",
			});
		}

		if (this.client.connected) {
			this.subscribe(key, topic, callback, "subscribed");
		}
		// 미연결 상태면 onConnect에서 subRegistry 기준으로 일괄 구독

		return () => {
			this.subRegistry.delete(key);
			this.stompSubs.get(key)?.unsubscribe();
			this.stompSubs.delete(key);
		};
	}

	// 메시지 발행
	publish(destination: string, body: string): boolean {
		if (!this.client.connected) return false;

		const token = useAuthStore.getState().accessToken;
		const receipt = this.createReceiptId("publish");
		this.client.watchForReceipt(receipt, () => {
			if (__DEV__) {
				console.log("[STOMP PUBLISH RECEIPT]", { destination, receipt });
			}
		});
		this.client.publish({
			destination,
			body,
			headers: {
				...(token ? { Authorization: `Bearer ${token}` } : {}),
				"content-type": "application/json",
				receipt,
			},
		});
		return true;
	}

	private subscribe(
		key: symbol,
		topic: string,
		callback: (msg: IMessage) => void,
		state: "subscribed" | "resubscribed",
	): void {
		const token = useAuthStore.getState().accessToken;
		const receipt = this.createReceiptId("subscribe");
		this.client.watchForReceipt(receipt, () => {
			if (__DEV__) {
				console.log("[STOMP SUBSCRIBE RECEIPT]", { topic, receipt });
			}
		});
		this.stompSubs.set(
			key,
			this.client.subscribe(topic, callback, {
				...(token ? { Authorization: `Bearer ${token}` } : {}),
				receipt,
			}),
		);
		if (__DEV__) {
			console.log("[STOMP SUBSCRIBE]", { topic, state, receipt });
		}
	}

	private createReceiptId(operation: "publish" | "subscribe"): string {
		this.receiptSequence += 1;
		return `${operation}-${Date.now()}-${this.receiptSequence}`;
	}
}

// 앱 전체에서 단 하나의 STOMP 연결을 사용.
// 이 파일 외에서 new StompManager() 금지.
export const stompManager = new StompManager();
