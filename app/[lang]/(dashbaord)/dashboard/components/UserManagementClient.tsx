"use client";

import React, { useState } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { User } from "@/features/admin/types";
import UserActionsMenu from "./UserActionsMenu";
import UserInfoModal from "./UserInfoModal";
import UserFormModal from "./UserFormModal";
import UserDeleteConfirm from "./UserDeleteConfirm";
import { Plus, Search, Filter } from "lucide-react";

interface UserManagementClientProps {
    initialData: any;
    lang: string;
}

export default function UserManagementClient({ initialData, lang }: UserManagementClientProps) {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [formUser, setFormUser] = useState<User | null>(null);

    const users = initialData?.users || [];

    const handleView = (user: User) => {
        setSelectedUser(user);
        setIsInfoOpen(true);
    };

    const handleEdit = (user: User) => {
        setFormUser(user);
        setIsFormOpen(true);
    };

    const handleDelete = (user: User) => {
        setSelectedUser(user);
        setIsDeleteOpen(true);
    };

    const handleAdd = () => {
        setFormUser(null);
        setIsFormOpen(true);
    };

    return (
        <div className="space-y-4 md:space-y-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <h2 className="text-xl md:text-3xl font-medium text-text">User Management</h2>
                    <p className="text-sm md:text-base text-slate-500 md:mt-1">Manage your team members and customer base</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex-1 md:flex-none px-4 py-2 text-sm md:text-lg text-text rounded-xl transition-colors duration-150 cursor-pointer border border-slate-200 bg-white hover:bg-slate-50">
                        Export CSV
                    </button>
                    <button
                        onClick={handleAdd}
                        className="flex-1 md:flex-none px-4 py-2 text-sm md:text-lg text-white bg-primary rounded-xl hover:bg-primary/90 transition-colors duration-150 cursor-pointer flex items-center justify-center gap-2"
                    >
                        <Plus size={20} />
                        <span>Add New User</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-xs">
                    <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Total Users</h3>
                    <p className="text-3xl font-bold text-slate-900">{initialData?.numberOfUsers}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-xs">
                    <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Active Users</h3>
                    <p className="text-3xl font-bold text-green-600">{initialData?.numberOfUsers}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-xs">
                    <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">New This Month</h3>
                    <p className="text-3xl font-bold text-primary">{initialData?.numberOfnewUsersLastMonth}</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs">
                <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 w-full md:w-1/2 bg-slate-50 border border-slate-200 p-1.5 rounded-xl focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                        <Search size={18} className="text-slate-400 ml-2" />
                        <input
                            type="text"
                            placeholder="Search users by name or email..."
                            className="w-full bg-transparent px-2 py-1 text-sm md:text-base text-text focus:outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <div className="relative flex-1 md:flex-none">
                            <select className="w-full appearance-none px-4 py-2 pr-10 text-sm text-slate-600 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20">
                                <option value="">All Roles</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                            <Filter size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                        <div className="relative flex-1 md:flex-none">
                            <select className="w-full appearance-none px-4 py-2 pr-10 text-sm text-slate-600 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20">
                                <option value="">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-green-500 pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-200">
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Email</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Joined</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users.map((user: User) => (
                                <tr
                                    key={user._id}
                                    className="group hover:bg-slate-50/80 transition-all duration-150 cursor-pointer"
                                    onClick={() => handleView(user)}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                {user.picturePath ? (
                                                    <Image
                                                        src={user.picturePath}
                                                        alt={`${user.firstName} ${user.lastName}`}
                                                        className="w-10 h-10 rounded-xl object-cover"
                                                        width={40}
                                                        height={40}
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                        {user.firstName.charAt(0)}
                                                    </div>
                                                )}
                                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-800 group-hover:text-primary transition-colors">
                                                    {user.firstName} {user.lastName}
                                                </p>
                                                <p className="text-xs text-slate-500 md:hidden">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 hidden md:table-cell">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={twMerge(
                                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider",
                                            user.role === "admin"
                                                ? "bg-purple-100 text-purple-700"
                                                : "bg-slate-100 text-slate-600"
                                        )}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                                        <span className="text-xs font-medium text-green-600 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-50">
                                            <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" />
                                            Active
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 hidden lg:table-cell">
                                        {new Date(user.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right" onClick={(e) => e.stopPropagation()}>
                                        <UserActionsMenu
                                            user={user}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                            onView={handleView}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {users.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-slate-500">No users found.</p>
                    </div>
                )}
            </div>

            {/* Modals */}
            {isInfoOpen && selectedUser && (
                <UserInfoModal
                    user={selectedUser}
                    onClose={() => setIsInfoOpen(false)}
                    onEditRole={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            {isFormOpen && (
                <UserFormModal
                    user={formUser}
                    onClose={() => setIsFormOpen(false)}
                    onSuccess={() => { }}
                />
            )}

            {isDeleteOpen && selectedUser && (
                <UserDeleteConfirm
                    user={selectedUser}
                    onClose={() => setIsDeleteOpen(false)}
                    onSuccess={() => { }}
                />
            )}
        </div>
    );
}
