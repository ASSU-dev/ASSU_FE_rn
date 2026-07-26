import type { ImageSourcePropType } from "react-native";

// ReviewImage: require() ë¡œì»¬ ì´ë¯¸ì§€, ì›ê²© ì´ë¯¸ì§€, 'skeleton'(íšŒìƒ‰ placeholder)
export type ReviewImage = ImageSourcePropType | "skeleton";

export interface Review {
	id: string;
	storeName?: string;
	department: string;
	studentStatus: string;
	rating: number;
	content: string;
	images?: ReviewImage[];
	createdAt: Date;
}
