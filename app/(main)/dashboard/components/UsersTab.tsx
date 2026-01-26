import { twMerge } from "tailwind-merge";
import { User } from "../page";

const MOCK_USERS: User[] = [
    { _id: "1", name: "Ahmed Hassan", email: "ahmed@example.com", role: "customer", status: "active", createdAt: "2024-01-15" },
    { _id: "2", name: "Sara Mohamed", email: "sara@example.com", role: "customer", status: "active", createdAt: "2024-02-20" },
    { _id: "3", name: "Omar Ali", email: "omar@example.com", role: "admin", status: "active", createdAt: "2024-03-10" },
];

function UsersTab() {
    return (
        <div className="space-y-4 md:space-y-6">
            <div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">Users</h2>
                <p className="text-sm text-slate-500 md:mt-1">Manage user accounts</p>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Joined</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {MOCK_USERS.map((user) => (
                            <tr key={user._id} className="hover:bg-slate-50 transition-colors duration-150">
                                <td className="px-3 py-1 md:px-6 md:py-4">
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <div className="min-w-6 md:min-w-10 min-h-6 md:min-h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                                            {user.name.charAt(0)}
                                        </div>
                                        <p className="text-xs md:text-sm font-medium text-slate-800">{user.name}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span className={twMerge(
                                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                        user.role === "admin" ? "bg-purple-50 text-purple-700" : "bg-blue-50 text-blue-700"
                                    )}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UsersTab;