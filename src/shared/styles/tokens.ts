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
	/** global.styles.css: --color-sub (blue-400) — dark 배경 위 선택 강조색 */
	primaryOnDark: "#66A4FE",
	/** primaryOnDark at opacity 0.1 */
	primaryOnDarkAlpha10: "rgba(102, 164, 254, 0.1)",
	/** primary at opacity 0.1 */
	primaryAlpha10: "rgba(0, 104, 254, 0.1)",

	/** global.styles.css: --color-neutral (gray-100) */
	neutral: "#F4F4F5",
	/** neutral at opacity 0.5 */
	neutralAlpha50: "rgba(244, 244, 245, 0.5)",
	/** global.styles.css: --color-neutral-variant (gray-300) */
	neutralVariant: "#DBDDE1",

	/** Modal and bottom-sheet scrim overlay */
	overlay: "rgba(0, 0, 0, 0.3)",
	/** Stronger scrim overlay for native picker modals */
	overlayStrong: "rgba(0, 0, 0, 0.4)",
	/** Drag handle color on dark sheets */
	handleOnDark: "rgba(235, 235, 245, 0.3)",

	/** global.styles.css: --color-canvas (white) */
	canvas: "#FEFFFE",

	/** global.styles.css: --color-danger (red-500) */
	danger: "#FF6562",

	/** global.styles.css: --color-content-primary (black) */
	contentPrimary: "#040404",
	/** global.styles.css: --color-content-secondary (gray-500) */
	contentSecondary: "#8E9398",
	/** contentSecondary at opacity 0.3 — RN은 hex + opacity 조합 불가하므로 별도 정의 */
	contentSecondaryAlpha30: "rgba(142, 147, 152, 0.3)",
	/** contentPrimary at opacity 0.45 for placeholders */
	contentPrimaryAlpha45: "rgba(4, 4, 4, 0.45)",
	/** contentSecondary at opacity 0.2 */
	contentSecondaryAlpha20: "rgba(142, 147, 152, 0.2)",
	/** contentSecondary at opacity 0.5 */
	contentSecondaryAlpha50: "rgba(142, 147, 152, 0.5)",
	/** global.styles.css: --color-content-tertiary (gray-400) */
	contentTertiary: "#B4B4B4",
	/** global.styles.css: --color-content-inverse (blue-50) */
	contentInverse: "#F4F6FE",
} as const;
