/** @type {import('@svgr/core').Config} */
module.exports = {
	svgoConfig: {
		plugins: [
			{
				name: "preset-default",
				params: {
					overrides: {
						// 기본 transformer 설정 유지
						inlineStyles: { onlyMatchedOnce: false },
						removeViewBox: false,
						removeUnknownsAndDefaults: false,
						convertColors: false,
					},
				},
			},
			// cleanupIds: ID 제거 비활성화 (별도 플러그인)
			{
				name: "cleanupIds",
				params: { remove: false, minify: false },
			},
			// prefixIds: ID 앞에 파일명 접두사 추가 (충돌 방지)
			"prefixIds",
		],
	},
};
