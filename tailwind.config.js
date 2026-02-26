/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				// 브랜드 컬러
				primary: "var(--color-primary)",
				"primary-tint": "var(--color-primary-tint)",

				// 회색 계열 색상
				neutral: "var(--color-neutral)",
				"neutral-variant": "var(--color-neutral-variant)",

				// 배경 색상
				canvas: "var(--color-canvas)",

				// 상태별 색상
				danger: "var(--color-danger)",

				// 글자 색상
				"content-primary": "var(--color-content-primary)",
				"content-secondary": "var(--color-content-secondary)",
				"content-inverse": "var(--color-content-inverse)",
			},
			opacity: {
				disabled: "0.3",
			},
			spacing: {
				"screen-m": "var(--layout-margin)",
				gutter: "var(--layout-gutter)",
			},
			fontFamily: {
				sans: ["Pretendard-Regular"],
			},
		},
	},
	corePlugins: {
		opacity: true,
		// Tailwind 기본 fontWeight 유틸(font-bold 등)과 충돌 방지
		fontWeight: false,
	},
	plugins: [
		({ addUtilities }) => {
			addUtilities({
				".font-extralight": { fontFamily: "Pretendard-ExtraLight" },
				".font-light": { fontFamily: "Pretendard-Light" },
				".font-regular": { fontFamily: "Pretendard-Regular" },
				".font-medium": { fontFamily: "Pretendard-Medium" },
				".font-semibold": { fontFamily: "Pretendard-SemiBold" },
				".font-bold": { fontFamily: "Pretendard-Bold" },
			});
		},
	],
};
