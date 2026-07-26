import { create } from "zustand";
import type { ReviewableBenefit } from "@/entities/partnership";
import type { ReviewImageFile } from "@/entities/review";

export interface ReviewDraftContext {
	partnershipUsageId: number;
	storeId: number;
	partnerId: number;
	adminName: string;
	storeName: string;
	benefitDescription: string;
	isMock: boolean;
}

interface BeginReviewOptions {
	isMock?: boolean;
}

interface ReviewDraftStore {
	context: ReviewDraftContext | null;
	rating: number;
	content: string;
	images: ReviewImageFile[];
	beginReview: (
		benefit: ReviewableBenefit,
		options?: BeginReviewOptions,
	) => void;
	setRating: (rating: number) => void;
	setContent: (content: string) => void;
	setImages: (images: ReviewImageFile[]) => void;
	reset: () => void;
}

const initialDraft = {
	context: null,
	rating: 0,
	content: "",
	images: [],
} satisfies Pick<ReviewDraftStore, "context" | "rating" | "content" | "images">;

export const useReviewDraftStore = create<ReviewDraftStore>((set) => ({
	...initialDraft,
	beginReview: (benefit, options) => {
		const partnershipUsageId = Number(benefit.id);

		set({
			...initialDraft,
			context: {
				partnershipUsageId: Number.isSafeInteger(partnershipUsageId)
					? partnershipUsageId
					: 0,
				storeId: benefit.storeId,
				partnerId: benefit.partnerId,
				adminName: benefit.adminName,
				storeName: benefit.storeName,
				benefitDescription: benefit.description,
				isMock: options?.isMock === true,
			},
		});
	},
	setRating: (rating) => set({ rating }),
	setContent: (content) => set({ content }),
	setImages: (images) => set({ images }),
	reset: () => set(initialDraft),
}));
