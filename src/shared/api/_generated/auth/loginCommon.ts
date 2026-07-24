import { customInstance } from "../../orvalMutator";
import type { BaseResponseLoginResponseDTO } from "./loginStudent";

export interface CommonLoginRequestDTO {
	email: string;
	password: string;
}

export const getAssuApi = () => {
	const loginCommon = (commonLoginRequestDTO: CommonLoginRequestDTO) => {
		return customInstance<BaseResponseLoginResponseDTO>({
			url: "/auth/commons/login",
			method: "POST",
			headers: { "Content-Type": "application/json" },
			data: commonLoginRequestDTO,
		});
	};

	return { loginCommon };
};
