"use client";

import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { User } from "@/features/admin/types";
import { adminUsersAPI } from "@/features/admin/usersAPI";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";

interface UserFormModalProps {
    user?: User | null; // If provided, we are editing (specifically role)
    onClose: () => void;
    onSuccess: () => void;
}

const UserFormModal = ({ user, onClose, onSuccess }: UserFormModalProps) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();
    const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        password: "",
        role: user?.role || "user",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (user) {
                // Edit role only
                await adminUsersAPI.editRole(user._id, formData.role);
                toast({ title: "Success", description: "User role updated successfully", variant: "default" });
            } else {
                // Add new user
                await adminUsersAPI.addUser(formData);
                toast({ title: "Success", description: "User added successfully", variant: "default" });
            }
            onSuccess();
            router.refresh();
            onClose();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Something went wrong",
                variant: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-slate-800">
                        {user ? "Edit User Role" : "Add New User"}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                        <X size={20} className="text-slate-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {!user && (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-700">First Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-700">Last Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700">Password</label>
                                <input
                                    required
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                            </div>
                        </>
                    )}

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700">Role</label>
                        {/* Custom Select*/}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white">
                                {formData.role}
                            </button>
                            {isRoleDropdownOpen && (
                                <div className="absolute w-full mt-2 py-2 bg-white border border-slate-200 rounded-lg shadow-lg">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFormData({ ...formData, role: "user" });
                                            setIsRoleDropdownOpen(false);
                                        }}
                                        className="w-full px-4 py-2 text-left hover:bg-slate-50">
                                        User
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFormData({ ...formData, role: "admin" });
                                            setIsRoleDropdownOpen(false);
                                        }}
                                        className="w-full px-4 py-2 text-left hover:bg-slate-50">
                                        Admin
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="pt-20 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-3 py-2 border border-slate-200 text-slate-600 cursor-pointer text-base rounded-xl font-medium hover:bg-slate-50 transition-colors">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-3 py-2 bg-primary text-white rounded-xl cursor-pointer text-base font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            {loading && <Loader2 size={18} className="animate-spin" />}
                            {user ? "Update Role" : "Add User"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserFormModal;
