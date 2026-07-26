import { Stack } from "expo-router";
import { useStudentProfileQuery } from "@/entities/user/api/useStudentProfileQuery";

export default function StudentLayout() {
	useStudentProfileQuery();

	return <Stack screenOptions={{ headerShown: false }} />;
}
