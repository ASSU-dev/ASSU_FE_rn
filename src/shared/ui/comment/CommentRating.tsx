import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { colorTokens } from "@/shared/styles/tokens";

interface CommentRatingProps {
	value: number; // 0-5
}

const StarIcon = ({ filled }: { filled: boolean }) => (
	<Svg width={14.734} height={14} viewBox="0 0 17 16" fill="none">
		<Path
			d="M5.6016 4.97649L7.51592 1.12133C7.57165 1.00976 7.65735 0.915917 7.76342 0.850329C7.86949 0.784742 7.99174 0.75 8.11645 0.75C8.24116 0.75 8.36341 0.784742 8.46948 0.850329C8.57555 0.915917 8.66125 1.00976 8.71698 1.12133L10.6313 4.97649L14.9109 5.59839C15.0343 5.6155 15.1505 5.66698 15.246 5.74694C15.3416 5.8269 15.4128 5.93213 15.4515 6.0506C15.4901 6.16908 15.4947 6.29604 15.4646 6.41698C15.4346 6.53793 15.3711 6.64799 15.2815 6.7346L12.1853 9.73355L12.9162 13.9704C13.0098 14.5142 12.4351 14.9283 11.9436 14.6719L8.11645 12.6706L4.28855 14.6719C3.79781 14.929 3.22307 14.5142 3.31665 13.9697L4.0476 9.73281L0.951385 6.73386C0.862217 6.64719 0.799152 6.53724 0.769359 6.41651C0.739565 6.29578 0.744238 6.16912 0.782847 6.05091C0.821455 5.93271 0.89245 5.82771 0.987762 5.74784C1.08307 5.66798 1.19888 5.61645 1.32202 5.59912L5.6016 4.97649Z"
			fill={filled ? colorTokens.primary : colorTokens.neutralVariant}
			stroke={filled ? colorTokens.primary : colorTokens.neutralVariant}
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</Svg>
);

export function CommentRating({ value }: CommentRatingProps) {
	return (
		<View style={{ flexDirection: "row", gap: 5.27 }}>
			{[1, 2, 3, 4, 5].map((star) => (
				<StarIcon key={star} filled={star <= value} />
			))}
		</View>
	);
}
