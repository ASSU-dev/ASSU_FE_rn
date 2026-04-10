import { Modal } from "react-native";
import type { PartnershipContract } from "@/entities/partnership";
import { PartnershipContractContent } from "./PartnershipContractContent";

interface Props {
	visible: boolean;
	data: PartnershipContract | null;
	onClose: () => void;
}

export function PartnershipContractModal({ visible, data, onClose }: Props) {
	if (!data) return null;

	return (
		<Modal
			visible={visible}
			animationType="slide"
			presentationStyle="fullScreen"
			statusBarTranslucent
			onRequestClose={onClose}
		>
			<PartnershipContractContent data={data} onClose={onClose} />
		</Modal>
	);
}
