import { twMerge } from "tailwind-merge";
import StatsCard from "./StatsCard";
import { AlertCircle, CheckCircle2, Clock, Package } from "lucide-react";
import { Order } from "../page";

const MOCK_ORDERS: Order[] = [
    { _id: "1", orderNumber: "#ORD-001", customer: "Ahmed Hassan", total: 450, status: "completed", date: "2024-12-10" },
    { _id: "2", orderNumber: "#ORD-002", customer: "Sara Mohamed", total: 320, status: "processing", date: "2024-12-12" },
    { _id: "3", orderNumber: "#ORD-003", customer: "Omar Ali", total: 180, status: "pending", date: "2024-12-15" },
    { _id: "4", orderNumber: "#ORD-004", customer: "Fatma Ahmed", total: 520, status: "completed", date: "2024-12-14" },
];


function StatusTab() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">System Status</h2>
                <p className="text-sm text-slate-500 md:mt-1">Monitor orders and system health</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                <StatsCard
                    title="Total Orders"
                    value={MOCK_ORDERS.length}
                    change={12}
                    icon={<Package size={24} />}
                    color="blue"
                />
                <StatsCard
                    title="Pending"
                    value={MOCK_ORDERS.filter(o => o.status === "pending").length}
                    icon={<Clock size={24} />}
                    color="orange"
                />
                <StatsCard
                    title="Processing"
                    value={MOCK_ORDERS.filter(o => o.status === "processing").length}
                    icon={<AlertCircle size={24} />}
                    color="blue"
                />
                <StatsCard
                    title="Completed"
                    value={MOCK_ORDERS.filter(o => o.status === "completed").length}
                    change={8}
                    icon={<CheckCircle2 size={24} />}
                    color="green"
                />
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800">Recent Orders</h3>
                </div>
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Order</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {MOCK_ORDERS.map((order) => (
                            <tr key={order._id} className="hover:bg-slate-50 transition-colors duration-150">
                                <td className="px-6 py-4 text-sm font-medium text-slate-800">{order.orderNumber}</td>
                                <td className="px-6 py-4 text-sm text-slate-600">{order.customer}</td>
                                <td className="px-6 py-4 text-sm font-medium text-slate-800">{order.total} EGP</td>
                                <td className="px-6 py-4">
                                    <span className={twMerge(
                                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                        order.status === "completed" ? "bg-green-50 text-green-700" :
                                        order.status === "processing" ? "bg-blue-50 text-blue-700" :
                                        order.status === "pending" ? "bg-orange-50 text-orange-700" :
                                        "bg-red-50 text-red-700"
                                    )}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500">
                                    {new Date(order.date).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StatusTab;