module.exports = {
	plugins: [
		{
			name: "preset-default",
			params: {
				overrides: {
					// 1. ID 압축 기능을 아예 끄거나
					cleanupIDs: false,
					// 2. 또는 ID 앞에 파일명을 붙여서 유니크하게 만듭니다 (더 안전)
					prefixIds: true,
				},
			},
		},
	],
};
