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
				sub: "var(--color-sub)",

				// 회색 계열 색상
				neutral: "var(--color-neutral)",
				"neutral-variant": "var(--color-neutral-variant)",
				"gray-400": "var(--gray-400)",
				"gray-500": "var(--gray-500)",

				// 배경 색상
				canvas: "var(--color-canvas)",
				overlay: "var(--color-overlay)",
				"overlay-strong": "var(--color-overlay-strong)",
				"handle-on-dark": "var(--color-handle-on-dark)",

				// 상태별 색상
				danger: "var(--color-danger)",

				// 글자 색상
				"content-primary": "var(--color-content-primary)",
				"content-secondary": "var(--color-content-secondary)",
				"content-tertiary": "var(--color-content-tertiary)",
				"content-inverse": "var(--color-content-inverse)",
				"content-primary-alpha-45": "var(--color-content-primary-alpha-45)",
			},
			// 폰트 크기
			fontSize: {
				sm: "var(--font-size-sm)",
				md: "var(--font-size-md)",
				lg: "var(--font-size-lg)",
				xl: "var(--font-size-xl)",
			},
			// 라인 높이
			lineHeight: {
				body: "var(--typography-body-line-height)",
				caption: "var(--typography-caption-line-height)",
				heading: "var(--typography-heading-line-height)",
			},
			// 글자 간격
			letterSpacing: {
				body: "var(--typography-body-letter-spacing)",
				caption: "var(--typography-caption-letter-spacing)",
			},
			opacity: {
				disabled: "0.3",
			},
			spacing: {
				"screen-m": "var(--layout-margin)",
				gutter: "var(--layout-gutter)",
				"card-p": "var(--spacing-card-padding)",
				"card-gap": "var(--spacing-card-gap)",
			},
			borderRadius: {
				sm: "var(--radius-sm)",
				md: "var(--radius-md)",
				card: "var(--radius-card)",
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
