export interface CountAdminAuthResponseDto {
	studentCount: number;
	adminId: number;
	adminName: string;
}

export interface CountUsagePersonResponseDto {
	usagePersonCount: number;
	adminId: number;
	adminName: string;
}

export interface NewCountAdminResponseDto {
	newStudentCount: number;
	adminId: number;
	adminName: string;
}

export interface CountUsageResponseDto {
	usageCount: number;
	adminId: number;
	adminName: string;
	storeId: number;
	storeName: string;
}

export interface CountUsageListResponseDto {
	items: CountUsageResponseDto[];
}
