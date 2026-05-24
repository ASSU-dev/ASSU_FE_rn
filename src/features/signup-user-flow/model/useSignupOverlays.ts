import { useState } from "react";
import type { AddressSearchItem } from "@/shared/ui/address-search/types";
import { PARTNER_ADDRESS_OPTIONS } from "./data/partnerAddressOptions";

type AddressSearchTarget = "partner" | "admin" | null;

type UseSignupOverlaysParams = {
	adminOfficeAddressId: string | null;
	partnerOfficeAddressId: string | null;
	onSendVerificationCode: () => void;
	onSelectAdminOfficeAddress: (item: AddressSearchItem) => void;
	onSelectPartnerOfficeAddress: (item: AddressSearchItem) => void;
};

export function useSignupOverlays({
	adminOfficeAddressId,
	partnerOfficeAddressId,
	onSendVerificationCode,
	onSelectAdminOfficeAddress,
	onSelectPartnerOfficeAddress,
}: UseSignupOverlaysParams) {
	const [isResendSheetVisible, setResendSheetVisible] = useState(false);
	const [isAddressSearchVisible, setAddressSearchVisible] = useState(false);
	const [addressSearchTarget, setAddressSearchTarget] =
		useState<AddressSearchTarget>(null);

	return {
		resendSheet: {
			visible: isResendSheetVisible,
			open: () => setResendSheetVisible(true),
			close: () => setResendSheetVisible(false),
			action: () => {
				onSendVerificationCode();
				setResendSheetVisible(false);
			},
		},
		addressSearch: {
			visible: isAddressSearchVisible,
			items: PARTNER_ADDRESS_OPTIONS,
			selectedItemId:
				addressSearchTarget === "admin"
					? adminOfficeAddressId
					: partnerOfficeAddressId,
			openForPartner: () => {
				setAddressSearchTarget("partner");
				setAddressSearchVisible(true);
			},
			openForAdmin: () => {
				setAddressSearchTarget("admin");
				setAddressSearchVisible(true);
			},
			close: () => {
				setAddressSearchVisible(false);
				setAddressSearchTarget(null);
			},
			selectItem: (item: AddressSearchItem) => {
				if (addressSearchTarget === "admin") {
					onSelectAdminOfficeAddress(item);
				} else {
					onSelectPartnerOfficeAddress(item);
				}
				setAddressSearchVisible(false);
				setAddressSearchTarget(null);
			},
		},
	};
}
