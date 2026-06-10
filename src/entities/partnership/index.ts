export {
	useAdminPartnerRecommend,
	useAdminPartnerships,
	usePartnerAdminRecommend,
	usePartnerPartnerships,
	usePartnershipDetail,
} from "./api";
export type {
	AdminAffiliationSummary,
	PartnerAffiliationSummary,
} from "./lib/adapters";
export {
	toAdminAffiliationSummary,
	toPartnerAffiliationSummary,
	toPartnership,
	toPartnershipContract,
} from "./lib/adapters";
export type {
	AdminLiteDTO,
	AdminRecommendResponseDTO,
	BaseResponse,
	PagedResponse,
	PartnerRecommendResponseDTO,
	PartnershipDetailResponseDTO,
	PartnershipOptionDTO,
	WritePartnershipResponseDTO,
} from "./model/api-types";
export { MOCK_ADMIN_AFFILIATION_SUMMARY } from "./model/mockAdminAffiliationSummary";
export { MOCK_PARTNER_AFFILIATION_SUMMARIES } from "./model/mockPartnerAffiliationSummaries";
export { MOCK_PARTNERSHIPS } from "./model/mockPartnerships";
export type {
	BenefitCriteria,
	BenefitItem,
	DiscountBenefitItem,
	EtcBenefitItem,
	Partnership,
	PartnershipContract,
	ServiceBenefitItem,
	ServiceType,
} from "./model/types";
export { SERVICE_TYPES } from "./model/types";
export { AffiliationSummaryCard } from "./ui/AffiliationSummaryCard";
export { PartnershipCard } from "./ui/PartnershipCard";
