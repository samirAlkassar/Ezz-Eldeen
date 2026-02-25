"use client";

import React, { useState } from "react";
import { AlertTriangle, Loader2, X } from "lucide-react";
import { User } from "@/features/admin/types";
import { adminUsersAPI } from "@/features/admin/usersAPI";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";

interface UserDeleteConfirmProps {
    user: User;
    onClose: () => void;
    onSuccess: () => void;
}

const UserDeleteConfirm = ({ user, onClose, onSuccess }: UserDeleteConfirmProps) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const handleDelete = async () => {
        setLoading(true);
        try {
            await adminUsersAPI.deleteUser(user._id);
            toast({ title: "Deleted", description: "User deleted successfully", variant: "default" });
            onSuccess();
            router.refresh();
            onClose();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Failed to delete user",
                variant: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6 text-center">
                    <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Delete User?</h3>
                    <p className="text-slate-500 mb-6">
                        Are you sure you want to delete <span className="font-semibold text-slate-700">{user.firstName} {user.lastName}</span>? This action cannot be undone.
                    </p>

                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading && <Loader2 size={18} className="animate-spin" />}
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDeleteConfirm;
