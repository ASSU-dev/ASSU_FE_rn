import { Redirect } from "expo-router";
import { getHomeRouteByRole } from "@/shared/api/auth";
import { useAuthStore } from "@/shared/lib/auth/authStore";

export default function ProtectedIndex() {
	const role = useAuthStore((state) => state.role);
	return <Redirect href={getHomeRouteByRole(role) as never} />;
}
