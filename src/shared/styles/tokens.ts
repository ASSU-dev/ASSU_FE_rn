/**
 * RN style 객체에서 사용하기 위한 토큰 상수.
 *
 * NOTE:
 * - React Native style은 `var(--token)`을 직접 해석하지 못하므로,
 *   `global.styles.css`의 토큰 값을 여기에도 "동일한 값"으로 유지합니다.
 * - 값 변경 시 `global.styles.css`와 함께 수정하세요.
 */

export const colorTokens = {
	/** global.styles.css: --color-primary (blue-500) */
	primary: "#0068FE",
	/** global.styles.css: --color-primary-tint (blue-100) */
	primaryTint: "#E5F6FE",

	/** global.styles.css: --color-neutral (gray-100) */
	neutral: "#F4F4F5",
	/** global.styles.css: --color-neutral-variant (gray-300) */
	neutralVariant: "#DBDDE1",

	/** global.styles.css: --color-canvas (white) */
	canvas: "#FEFFFE",

	/** global.styles.css: --color-danger (red-500) */
	danger: "#FF6562",

	/** global.styles.css: --color-content-primary (black) */
	contentPrimary: "#040404",
	/** global.styles.css: --color-content-secondary (gray-500) */
	contentSecondary: "#8E9398",
	/** global.styles.css: --color-content-tertiary (gray-400) */
	contentTertiary: "#B4B4B4",
	/** global.styles.css: --color-content-inverse (blue-50) */
	contentInverse: "#F4F6FE",
} as const;
