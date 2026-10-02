import { Redirect, useLocalSearchParams } from "expo-router";
import { useAuthStore } from "@/shared/lib/auth/authStore";

export default function VerifyScreen() {
	const { storeId } = useLocalSearchParams<{ storeId?: string }>();
	const accessToken = useAuthStore((state) => state.accessToken);
	const role = useAuthStore((state) => state.role);

	const storeIdNum = Number(storeId);
	const validStoreId = Number.isSafeInteger(storeIdNum) && storeIdNum > 0;
	const isLoggedIn = accessToken !== null;
	const isStudentAccess = role !== "ADMIN" && role !== "PARTNER";

	if (isLoggedIn && isStudentAccess && validStoreId) {
		return (
			<Redirect
				href={{
					pathname: "/(protected)/student/store/[storeId]/detail" as never,
					params: { storeId: storeIdNum },
				}}
			/>
		);
	}

	if (role === "ADMIN") {
		return <Redirect href="/(protected)/admin/(tabs)/home" />;
	}
	if (role === "PARTNER") {
		return <Redirect href="/(protected)/partner/(tabs)/home" />;
	}
	return <Redirect href="/(auth)/register" />;
}
