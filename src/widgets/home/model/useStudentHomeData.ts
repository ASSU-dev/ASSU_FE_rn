import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

import { useStudentProfileQuery } from "@/entities/user/api/useStudentProfileQuery";
import { useStudentStampQuery } from "@/entities/user/api/useStudentStampQuery";
import { useUserBasicInfo } from "@/entities/user/model/useUserBasicInfo";
import { useGetRecommendCurationQuery } from "@/features/home/api/useGetRecommendCurationQuery";

export function useStudentHomeData() {
	const basicInfo = useUserBasicInfo();
	const { data: studentProfile } = useStudentProfileQuery();
	const { data: stampData, refetch: refetchStamp } = useStudentStampQuery();
	const { data: curationData, isLoading: isCurationLoading } =
		useGetRecommendCurationQuery();

	useFocusEffect(
		useCallback(() => {
			void refetchStamp();
		}, [refetchStamp]),
	);

	const userName = studentProfile?.name ?? basicInfo?.name ?? "사용자";
	const stampCount = stampData?.stamp ?? 0;
	const curationResult = curationData?.result;
	const curationLists = curationResult?.curationLists;

	return {
		userName,
		stampCount,
		curationResult,
		curationLists,
		isCurationLoading,
	};
}
