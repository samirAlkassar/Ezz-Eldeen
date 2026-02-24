import { twMerge } from "tailwind-merge";
import { User } from "@/features/admin/types";
import { getUsers } from "@/features/user/server/getUsers";
import Image from "next/image";

async function UsersTab() {
    const users = await getUsers();
    return (
        <div className="space-y-4 md:space-y-6">
            <div className="flex items-start justify-between">
            <div>
                <h2 className="text-xl md:text-3xl font-medium text-text">User Management</h2>
                <p className="text-sm md:text-base text-slate-500 md:mt-1">Manage your team members and customer base</p>
            </div>
            <div className="flex items-center gap-2">
                <button className="px-4 py-2 text-sm md:text-lg text-text rounded-lg transition-colors duration-150 cursor-pointer border border-text-muted/20">Export CSV</button>
                <button className="px-4 py-2 text-sm md:text-lg text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors duration-150 cursor-pointer">Add New User</button>
            </div>
            </div>  


            {/*three quick status boxs*/}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl border border-slate-200 p-4">
                    <h3 className="text-lg font-medium text-text">Total Users</h3>
                    <p className="text-2xl font-semibold text-primary">{users?.numberOfUsers}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-4">
                    <h3 className="text-lg font-medium text-text">Active Users</h3>
                    <p className="text-2xl font-semibold text-primary">{users?.numberOfUsers}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-4">
                    <h3 className="text-lg font-medium text-text">New This Month</h3>
                    <p className="text-2xl font-semibold text-primary">{users?.numberOfnewUsersLastMonth}</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="p-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 w-3/4  border border-text-muted/20 p-1.5 rounded-full focus-within:border-text">
                        <input 
                            type="text" 
                            placeholder="Search" 
                            className="w-full px-4 py-1 text-sm md:text-base text-text rounded-full transition-colors duration-150 cursor-pointer focus:outline-none"/>
                        <button className="px-4 py-1 text-sm md:text-lg text-white bg-primary rounded-full hover:bg-primary/90 transition-colors duration-150 cursor-pointer">Search</button>
                    </div>
                    <div className="flex items-center gap-2">
                        <select name="role" id="role" className="w-full px-4 py-2 text-sm md:text-base text-text rounded-lg transition-colors duration-150 cursor-pointer border border-text-muted/20">
                            <option value="">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                        <select name="status" id="status" className="w-full px-4 py-2 text-sm md:text-base text-text rounded-lg transition-colors duration-150 cursor-pointer border border-text-muted/20">
                            <option value="">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
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
                        {users?.users?.map((user: User) => (
                            <tr key={user._id} className="hover:bg-slate-50 transition-colors duration-150">
                                <td className="px-3 py-1 md:px-6 md:py-4">
                                    <div className="flex items-center gap-2 md:gap-3">
                                        {
                                            user.picturePath ? 
                                            <Image src={user.picturePath} alt={user.firstName + " " + user.lastName} className="min-w-6 md:min-w-10 min-h-6 md:min-h-10 rounded-full" width={40} height={40} />
                                            :
                                            <div className="min-w-6 md:min-w-10 min-h-6 md:min-h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                                                {user.firstName.charAt(0)}
                                            </div>
                                        }
                                        <p className="text-xs md:text-sm font-medium text-slate-800">{user.firstName + " " + user.lastName}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span className={twMerge(
                                        "inline-flex items-center px-2.5 py-0.5 rounded-md text-xs bg-gray-50",
                                        user.role === "admin" ? "text-purple-700" : "text-text"
                                    )}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-xs font-medium text-green-500 inline-flex items-center justify-center gap-1.5">
                                        <span className="h-1.5 w-1.5 bg-green-500 rounded-full"/>
                                        <span>Active</span>
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