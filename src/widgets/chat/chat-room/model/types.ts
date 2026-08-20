export interface ChatHeaderActionsProps {
	partnerName: string;
	onBlock: () => Promise<void>;
	onLeave: () => void;
}
