import type { ImageSourcePropType } from "react-native";

// ReviewImage: require() 로컬 이미지, 원격 이미지, 'skeleton'(회색 placeholder)
export type ReviewImage = ImageSourcePropType | "skeleton";

export interface Review {
	id: string;
	department: string;
	studentStatus: string;
	rating: number;
	content: string;
	images?: ReviewImage[];
	createdAt: Date;
}
