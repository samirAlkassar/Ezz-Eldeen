import { Package, Users, Activity, Settings } from "lucide-react";
import { twMerge } from "tailwind-merge";

type SidebarProps = {
    activeTab: string;
    onTabChange: (tab: string) => void;
};

function Sidebar({ activeTab, onTabChange }: SidebarProps) {
    const tabs = [
        { id: "products", label: "Products", icon: Package },
        { id: "users", label: "Users", icon: Users },
        { id: "status", label: "Status", icon: Activity },
        { id: "settings", label: "Settings", icon: Settings },
    ];
    
    return (
        <div className="w-fit xl:w-64 bg-white border-r border-slate-200 h-[calc(100vh-76px)] left-0 top-0 flex flex-col">
            <div className="p-6 border-b border-slate-200 hidden xl:block">
                <h2 className="text-base md:text-xl font-bold text-slate-800">Admin Panel</h2>
                <p className="text-xs text-slate-500 mt-1">Dashboard v1.0</p>
            </div>

            <nav className="flex-1 md:p-4 space-y-1">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={twMerge(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer",
                                isActive 
                                    ? "bg-blue-50 text-blue-600 font-medium" 
                                    : "text-slate-600 hover:bg-slate-50"
                            )}
                        >
                            <Icon size={20} />
                            <span className="hidden xl:inline">{tab.label}</span>
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-200 hidden xl:block">
                <div className="px-4 py-3 bg-slate-50 rounded-lg">
                    <p className="text-xs font-medium text-slate-600">Logged in as</p>
                    <p className="text-sm font-semibold text-slate-800 mt-1">Admin User</p>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;