import { Pressable, View } from "react-native";

type SignupProgressBarProps = {
	progress: number;
	segmentCount: number;
	currentSegment: number;
	onSegmentPress: (segmentIndex: number) => void;
};

export function SignupProgressBar({
	progress,
	segmentCount,
	currentSegment,
	onSegmentPress,
}: SignupProgressBarProps) {
	const segmentIds = Array.from(
		{ length: segmentCount },
		(_, segmentIndex) => `progress-segment-${segmentIndex + 1}`,
	);

	return (
		<View className="relative h-[5px] w-full rounded-full bg-neutral-variant">
			<View
				className="h-[5px] rounded-full bg-primary"
				style={{ width: `${progress}%` }}
			/>
			<View className="absolute inset-0 flex-row">
				{segmentIds.map((segmentId, index) => (
					<Pressable
						key={segmentId}
						className="flex-1"
						onPress={() => onSegmentPress(index)}
						disabled={index >= currentSegment}
					/>
				))}
			</View>
		</View>
	);
}
