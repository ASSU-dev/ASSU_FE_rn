export type PrivacyPolicyListItem =
	| string
	| { text: string; children: string[] };

export type PrivacyPolicyBlock =
	| { type: "paragraph"; text: string }
	| { type: "subheading"; text: string }
	| { type: "list"; items: PrivacyPolicyListItem[] };

export interface PrivacyPolicySection {
	id: string;
	title: string;
	blocks: PrivacyPolicyBlock[];
}

export interface PrivacyPolicyDocument {
	title: string;
	intro: string;
	sections: PrivacyPolicySection[];
}
