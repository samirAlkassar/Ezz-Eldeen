import { twMerge } from "tailwind-merge";
import { TrendingUp, TrendingDown } from "lucide-react";

type StatsCardProps = {
    title: string;
    value: string | number;
    change?: number;
    icon: React.ReactNode;
    color?: string;
};

function StatsCard({ title, value, change, icon, color = "blue" }: StatsCardProps) {
    const colors = {
        blue: "bg-blue-50 text-blue-600",
        green: "bg-green-50 text-green-600",
        orange: "bg-orange-50 text-orange-600",
        red: "bg-red-50 text-red-600",
    };

    return (
        <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm text-slate-500 font-medium">{title}</p>
                    <p className="text-2xl font-bold text-slate-800 mt-2">{value}</p>
                    {change !== undefined && (
                        <div className="flex items-center gap-1 mt-2">
                            {change >= 0 ? (
                                <TrendingUp size={14} className="text-green-600" />
                            ) : (
                                <TrendingDown size={14} className="text-red-600" />
                            )}
                            <span className={twMerge("text-xs font-medium", change >= 0 ? "text-green-600" : "text-red-600")}>
                                {Math.abs(change)}%
                            </span>
                        </div>
                    )}
                </div>
                <div className={twMerge("p-3 rounded-lg", colors[color as keyof typeof colors])}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default StatsCard;