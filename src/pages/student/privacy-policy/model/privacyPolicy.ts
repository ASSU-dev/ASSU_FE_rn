import type { PrivacyPolicyDocument } from "./types";

/**
 * 개인정보 처리방침 본문.
 * 원문: Notion "A:SSU 개인정보 처리방침" 페이지 — 내용 변경 시 이 파일만 수정한다.
 */
export const PRIVACY_POLICY: PrivacyPolicyDocument = {
	title: "개인정보 처리방침",
	intro:
		"Assu는 「개인정보 보호법」 등 관련 법령을 준수하며, 이용자의 개인정보를 안전하게 보호하기 위해 다음과 같이 개인정보 처리방침을 수립·공개합니다.",
	sections: [
		{
			id: "purpose",
			title: "1. 개인정보 수집 및 이용 목적",
			blocks: [
				{
					type: "paragraph",
					text: "A:SSU는 다음의 목적을 위하여 개인정보를 처리합니다.",
				},
				{
					type: "list",
					items: [
						"회원 식별 및 서비스 제공",
						"서비스 이용 내역 확인 및 맞춤형 콘텐츠 제공",
						"고객 문의 및 불만 처리",
						"불법 이용 방지, 부정 사용 방지 및 보안 강화",
					],
				},
			],
		},
		{
			id: "items",
			title: "2. 수집하는 개인정보 항목",
			blocks: [
				{
					type: "paragraph",
					text: "A:SSU는 회원 유형 및 서비스 이용 과정에서 필요한 개인정보를 수집합니다.",
				},
				{ type: "subheading", text: "필수 항목" },
				{
					type: "list",
					items: [
						"학생: 이름, 학교/학과, 학번, 휴대전화 번호, 이메일, 비밀번호, 닉네임",
						"학생회: 단체 정보(단위, 단과대), 사무실 주소, 인감, 아이디, 비밀번호",
						"사업자: 아이디, 비밀번호, 업체명, 업체 주소, 사업자 등록증",
					],
				},
				{ type: "subheading", text: "자동 수집 항목" },
				{
					type: "list",
					items: ["기기 정보(디바이스 토큰), 접속 기록"],
				},
			],
		},
		{
			id: "retention",
			title: "3. 개인정보 보유 및 이용 기간",
			blocks: [
				{
					type: "paragraph",
					text: "A:SSU는 원칙적으로 개인정보 수집 및 이용 목적 달성 시 지체 없이 파기합니다.",
				},
				{
					type: "paragraph",
					text: "단, 관계 법령에 따라 일정 기간 보관이 필요한 경우 해당 법령에서 정한 기간 동안 보관합니다.",
				},
				{
					type: "list",
					items: [
						"계약 또는 청약철회 기록: 5년",
						"대금 결제 및 재화 공급 기록: 5년",
						"소비자 불만 및 분쟁 처리 기록: 3년",
						"로그인 기록: 3개월",
					],
				},
			],
		},
		{
			id: "third-party",
			title: "4. 개인정보 제3자 제공",
			blocks: [
				{
					type: "paragraph",
					text: "A:SSU는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다.",
				},
				{
					type: "paragraph",
					text: "다만, 제휴 혜택 제공을 위해 학교 또는 제휴 기관에 최소한의 정보(소속, 학번 등)가 필요한 경우, 이용자의 동의를 받아 제공할 수 있습니다. 또한 법령에 따른 수사기관 요청, 이용자가 사전에 동의한 경우에 한해 제공할 수 있습니다.",
				},
			],
		},
		{
			id: "outsourcing",
			title: "5. 개인정보 처리 위탁",
			blocks: [
				{
					type: "paragraph",
					text: "A:SSU는 서비스 운영을 위해 다음과 같이 개인정보 처리를 위탁하고 있습니다.",
				},
				{
					type: "list",
					items: [
						{
							text: "위탁받는 자: Google LLC (Firebase Cloud Messaging)",
							children: [
								"위탁 업무 내용: 푸시 알림 발송을 위한 디바이스 토큰 처리 및 메시지 전송",
								"보유 및 이용 기간: 서비스 제공 목적 달성 시 또는 위탁 계약 종료 시까지",
							],
						},
						{
							text: "위탁받는 자: 카카오 (카카오모빌리티 및 카카오)",
							children: [
								"위탁 업무 내용: 카카오맵 API를 활용한 위치 기반 서비스 제공",
								"보유 및 이용 기간: 서비스 제공 목적 달성 시 또는 위탁 계약 종료 시까지",
							],
						},
					],
				},
			],
		},
		{
			id: "destruction",
			title: "6. 개인정보 파기 절차 및 방법",
			blocks: [
				{
					type: "paragraph",
					text: "A:SSU는 보유 기간이 경과하거나 처리 목적이 달성되면 즉시 안전하게 파기합니다.",
				},
				{
					type: "list",
					items: [
						"전자적 파일 형태: 복구 불가능한 방법으로 삭제",
						"종이 문서: 분쇄 또는 소각",
					],
				},
			],
		},
		{
			id: "rights",
			title: "7. 이용자 권리와 행사 방법",
			blocks: [
				{
					type: "paragraph",
					text: "A:SSU의 이용자는 언제든지 본인의 개인정보 열람, 정정, 삭제, 처리 정지 요구를 할 수 있습니다.",
				},
				{
					type: "paragraph",
					text: "[계정관리 > 고객센터] 메뉴 또는 고객센터 이메일을 통해 요청할 수 있으며, Assu는 지체 없이 조치합니다.",
				},
			],
		},
		{
			id: "officer",
			title: "8. 개인정보 보호 책임자",
			blocks: [
				{
					type: "paragraph",
					text: "A:SSU의 개인정보 관련 문의에 신속하고 성실히 답변할 책임자를 지정합니다.",
				},
				{
					type: "list",
					items: ["이름: 한태영", "이메일: assu.soongsil.cse@gmail.com"],
				},
			],
		},
		{
			id: "remedy",
			title: "9. 권익침해 구제 방법",
			blocks: [
				{
					type: "paragraph",
					text: "A:SSU의 이용자는 아래 기관에 개인정보 침해에 대한 상담이나 피해 구제를 신청할 수 있습니다.",
				},
				{
					type: "list",
					items: [
						"개인정보침해 신고센터 (국번없이 118, privacy.kisa.or.kr)",
						"개인정보 분쟁조정위원회 (www.kopico.go.kr)",
					],
				},
			],
		},
		{
			id: "changes",
			title: "10. 개인정보 처리방침 변경",
			blocks: [
				{
					type: "paragraph",
					text: "변경 시 공지사항 또는 앱 내 알림을 통해 안내드립니다.",
				},
				{
					type: "paragraph",
					text: "본 개인정보 처리방침은 2026년 8월 20일부터 적용됩니다.",
				},
			],
		},
	],
};
