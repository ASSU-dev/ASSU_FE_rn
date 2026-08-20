export {
	SUSPENDED_PAPERS_QUERY_KEY,
	useAdminPartnerRecommend,
	useAdminPartnerships,
	usePartnerAdminRecommend,
	usePartnerPartnerships,
	usePartnershipDetail,
	useSuspendedPapers,
} from "./api";
export { useMyPartnerships } from "./api/getMyPartnerships";
export type {
	AdminAffiliationSummary,
	PartnerAffiliationSummary,
} from "./lib/adapters";
export {
	toAdminAffiliationSummary,
	toAdminPartnership,
	toPartnerAffiliationSummary,
	toPartnerPartnership,
	toPartnershipContract,
	toPendingContract,
} from "./lib/adapters";
export type {
	AdminLiteDTO,
	AdminRecommendResponseDTO,
	BaseResponse,
	PagedResponse,
	PartnerRecommendResponseDTO,
	PartnershipDetailResponseDTO,
	PartnershipOptionDTO,
	SuspendedPaperResponseDTO,
	WritePartnershipResponseDTO,
} from "./model/api-types";
export type {
	Benefit,
	BenefitCriteria,
	BenefitItem,
	DiscountBenefitItem,
	EtcBenefitItem,
	Partnership,
	PartnershipContract,
	PendingContract,
	ReviewableBenefit,
	ServiceBenefitItem,
	ServiceType,
} from "./model/types";
export { SERVICE_TYPES } from "./model/types";
export { AffiliationSummaryCard } from "./ui/AffiliationSummaryCard";
export { PartnershipCard } from "./ui/PartnershipCard";
