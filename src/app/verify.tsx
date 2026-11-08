import { Redirect, useLocalSearchParams } from "expo-router";
import { getHomeRouteByRole } from "@/shared/api/auth";
import { useAuthStore } from "@/shared/lib/auth/authStore";

export default function VerifyScreen() {
	const { storeId, sessionId, adminId } = useLocalSearchParams<{
		storeId?: string | string[];
		sessionId?: string | string[];
		adminId?: string | string[];
	}>();
	const accessToken = useAuthStore((state) => state.accessToken);
	const role = useAuthStore((state) => state.role);

	const storeIdValue = Array.isArray(storeId) ? storeId[0] : storeId;
	const sessionIdValue = Array.isArray(sessionId) ? sessionId[0] : sessionId;
	const adminIdValue = Array.isArray(adminId) ? adminId[0] : adminId;
	const storeIdNum = Number(storeIdValue);
	const sessionIdNum = Number(sessionIdValue);
	const adminIdNum = Number(adminIdValue);
	const validStoreId = Number.isSafeInteger(storeIdNum) && storeIdNum > 0;
	const validGroupSession =
		Number.isSafeInteger(sessionIdNum) &&
		sessionIdNum > 0 &&
		Number.isSafeInteger(adminIdNum) &&
		adminIdNum > 0;
	const isLoggedIn = accessToken !== null;

	if (validStoreId) {
		if (!isLoggedIn) {
			return (
				<Redirect
					href={{
						pathname: "/(auth)/register",
						params: { returnTo: `/verify?storeId=${storeIdNum}` },
					}}
				/>
			);
		}
		if (role !== "STUDENT") {
			return <Redirect href={getHomeRouteByRole(role) as never} />;
		}
		return (
			<Redirect
				href={{
					pathname: "/(protected)/student/store/[storeId]/detail" as never,
					params: { storeId: storeIdNum, fromDeepLink: "true" },
				}}
			/>
		);
	}

	if (validGroupSession) {
		if (!isLoggedIn) {
			return (
				<Redirect
					href={{
						pathname: "/(auth)/register",
						params: {
							returnTo: `/verify?sessionId=${sessionIdNum}&adminId=${adminIdNum}`,
						},
					}}
				/>
			);
		}
		if (role !== "STUDENT") {
			return <Redirect href={getHomeRouteByRole(role) as never} />;
		}

		return (
			<Redirect
				href={{
					pathname:
						"/(protected)/student/partnership-group-participant" as never,
					params: {
						sessionId: sessionIdNum,
						adminId: adminIdNum,
					},
				}}
			/>
		);
	}

	return (
		<Redirect
			href={isLoggedIn ? (getHomeRouteByRole(role) as never) : "/(auth)/register"}
		/>
	);
}
