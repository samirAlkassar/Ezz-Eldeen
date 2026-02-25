"use client"

import { Package, Users, Activity, Settings } from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname, useParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface SidebarUser {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    picturePath?: string;
}

function Sidebar({ currentUser }: { currentUser: SidebarUser }) {
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const lang = params?.lang as string || "en";

    const tabs = [
        { id: "products", label: "Products", icon: Package, path: `/${lang}/dashboard` },
        { id: "users", label: "Users", icon: Users, path: `/${lang}/dashboard/users` },
        { id: "status", label: "Status", icon: Activity, path: `/${lang}/dashboard/status` },
        { id: "settings", label: "Settings", icon: Settings, path: `/${lang}/dashboard/settings` },
    ];

    return (
        <div className="w-fit xl:w-72 bg-white border-r border-slate-200 h-[calc(100vh-80px)] left-0 top-0 flex flex-col">
            <div className="p-6 border-b border-slate-200 hidden xl:block">
                <h2 className="text-base md:text-xl font-bold text-slate-800">Admin Panel</h2>
                <p className="text-xs text-slate-500 mt-1">Dashboard v1.0</p>
            </div>

            <nav className="flex-1 md:p-4 space-y-1">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = pathname === tab.path || (tab.id === "products" && pathname === `/${lang}/dashboard`);

                    return (
                        <button
                            key={tab.id}
                            onClick={() => router.push(tab.path)}
                            className={twMerge(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer group",
                                isActive
                                    ? "bg-primary/10 text-primary font-medium"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                            )}
                        >
                            <Icon size={20} className={twMerge("transition-colors", isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600")} />
                            <span className="hidden xl:inline">{tab.label}</span>
                        </button>
                    );
                })}
            </nav>


            <div className="p-4 border-t border-slate-200 mt-auto">
                <div
                    onClick={() => router.push(`/profile/${currentUser.firstName} ${currentUser.lastName}`)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-all duration-200 cursor-pointer group"
                >
                    <Image
                        src={currentUser.picturePath || "/images/placeholder.jpg"}
                        alt={`${currentUser.firstName} ${currentUser.lastName}`}
                        width={40}
                        height={40}
                        className="rounded-full h-10 w-10 object-cover ring-2 ring-slate-100 group-hover:ring-primary/20"
                    />
                    <div className="hidden xl:block flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate">{currentUser.firstName} {currentUser.lastName}</p>
                        <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                        <p className="text-xs text-slate-500 capitalize">{currentUser.role}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
