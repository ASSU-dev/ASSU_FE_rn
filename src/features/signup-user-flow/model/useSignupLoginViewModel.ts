type UseSignupLoginViewModelParams = {
	email: string;
	password: string;
	onChangeEmail: (value: string) => void;
	onChangePassword: (value: string) => void;
	onPressSignup: () => void;
};

export function useSignupLoginViewModel({
	email,
	password,
	onChangeEmail,
	onChangePassword,
	onPressSignup,
}: UseSignupLoginViewModelParams) {
	return {
		email,
		password,
		onChangeEmail,
		onChangePassword,
		onPressLogin: () => {
			console.log("로그인 성공");
		},
		onPressSignup,
	};
}
