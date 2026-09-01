export interface PaperContentResponseDto {
	adminId?: number | null;
	adminName?: string | null;
	paperContent?: string | null;
	contentId?: number | null;
	goods?: string[] | null;
	people?: number | null;
	cost?: number | null;
}

export interface StorePapersResponseDto {
	storeId?: number | null;
	storeName?: string | null;
	partnershipContents?: PaperContentResponseDto[] | null;
}

export interface StoreBenefit {
	id: string;
	adminId: number;
	adminName: string;
	content: string;
	goods: string[];
	people?: number;
	cost?: number;
	type: "INDIVIDUAL" | "GROUP";
}

export interface StorePapers {
	storeId: number;
	storeName: string;
	partnershipContents: StoreBenefit[];
}
