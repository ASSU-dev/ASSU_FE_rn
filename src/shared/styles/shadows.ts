/**
 * Shadow 스타일 객체
 * global.css의 --blue-shadow-rgb, --gray-shadow-rgb와 연결됨
 */

// --blue-shadow-rgb: 102 164 254
// --shadow-primary: 0px 0px 6px 0px rgba(102, 164, 254, 0.4)
export const shadowPrimary = {
	shadowColor: "rgba(102, 164, 254, 1)",
	shadowOffset: { width: 0, height: 0 },
	shadowOpacity: 0.4,
	shadowRadius: 6,
	elevation: 6, // Android
} as const;

// --gray-shadow-rgb: 142 147 152
// --shadow-neutral: 0px 5px 10px 0px rgba(142, 147, 152, 0.15)
export const shadowNeutral = {
	shadowColor: "rgba(142, 147, 152, 1)",
	shadowOffset: { width: 0, height: 5 },
	shadowOpacity: 0.15,
	shadowRadius: 10,
	elevation: 5, // Android
} as const;

// 편의를 위한 객체
export const shadows = {
	primary: shadowPrimary,
	neutral: shadowNeutral,
} as const;
