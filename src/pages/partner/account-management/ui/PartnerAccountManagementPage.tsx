import { useRouter } from "expo-router";

import { AccountManagementContent } from "@/widgets/account-management";

export function PartnerAccountManagementPage() {
	const router = useRouter();

	return (
		<AccountManagementContent
			onBlockedPartnersPress={() =>
				router.push("/(protected)/partner/blocked-partners")
			}
		/>
	);
}
