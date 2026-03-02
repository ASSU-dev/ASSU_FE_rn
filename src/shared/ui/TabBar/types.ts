export type TabBarTab = {
	id: string;
	label: string;
};

export type TabBarProps = {
	tabs: TabBarTab[];
	activeTab: string;
	onTabChange: (id: string) => void;
	testID?: string;
};
