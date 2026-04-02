// ReviewImage: require() 로컬 이미지(number) | 'skeleton'(회색 placeholder)
export type ReviewImage = number | "skeleton";

export interface Review {
	id: string;
	department: string;
	studentStatus: string;
	rating: number;
	content: string;
	images?: ReviewImage[];
	createdAt: Date;
}
