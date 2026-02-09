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
				sans: [
					"Pretendard-Regular",
					"Pretendard-Medium",
					"Pretendard-SemiBold",
					"Pretendard-Bold",
				],
			},
		},
	},
	corePlugins: {
		opacity: true,
	},
};
