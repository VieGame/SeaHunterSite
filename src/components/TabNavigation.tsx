export interface TabNavigationItem {
    label: string;
    value: string;
}

export interface TabNavigationProps {
    items: TabNavigationItem[]; // List of tab items to display
    activeTab: string; // The currently active tab value
    onTabChange: (tab: TabNavigationItem) => void;
}

export default function TabNavigation({ items, activeTab, onTabChange }: TabNavigationProps) {
    return (
        <div className="flex justify-center">
            <div className="rounded-[60px] p-[9px] border border-[#484f58]">
                <div className="flex flex-row gap-4 lg:gap-[30px] items-center">
                    {items.map((item) => (
                        <button
                            key={item.value}
                            onClick={() => onTabChange(item)}
                            className={`px-4 py-2 rounded-[60px] font-svn-gilroy font-bold text-title transition-all duration-300 ${activeTab === item.value
                                ? 'bg-gradient-to-b from-[#ffffff1f] to-[#9999991f] text-white'
                                : 'text-white hover:bg-white/10'
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}