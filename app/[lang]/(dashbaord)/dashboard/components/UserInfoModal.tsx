"use client";

import React from "react";
import { X, Mail, Shield, Calendar, User as UserIcon } from "lucide-react";
import Image from "next/image";
import { User } from "@/features/admin/types";
import { twMerge } from "tailwind-merge";

interface UserInfoModalProps {
    user: User;
    onClose: () => void;
    onEditRole: (user: User) => void;
    onDelete: (user: User) => void;
}

const UserInfoModal = ({ user, onClose, onEditRole, onDelete }: UserInfoModalProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="relative h-32 bg-primary/10">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full transition-colors cursor-pointer text-slate-700"
                    >
                        <X size={20} />
                    </button>
                    <div className="absolute -bottom-12 left-8">
                        {user.picturePath ? (
                            <Image
                                src={user.picturePath}
                                alt={`${user.firstName} ${user.lastName}`}
                                width={96}
                                height={96}
                                className="w-24 h-24 rounded-2xl border-4 border-white object-cover"
                            />
                        ) : (
                            <div className="w-24 h-24 rounded-2xl border-4 border-white bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold">
                                {user.firstName.charAt(0)}
                            </div>
                        )}
                    </div>
                </div>

                <div className="pt-16 pb-8 px-8">
                    <div className="mb-6">
                        <h2 className="text-xl font-medium text-slate-800">
                            {user.firstName} {user.lastName}
                        </h2>
                        <p className="text-slate-500 flex items-center gap-2">
                            <Mail size={14} />
                            {user.email}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="p-3 bg-slate-50 rounded-xl">
                            <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                                <Shield size={12} /> Role
                            </p>
                            <span className={twMerge(
                                "text-sm font-medium uppercase tracking-wider",
                                user.role === "admin" ? "text-purple-600 bg-purple-100 px-2 py-1 rounded-lg" : "text-slate-700"
                            )}>
                                {user.role}
                            </span>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl">
                            <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                                <Calendar size={12} /> Joined
                            </p>
                            <p className="text-sm font-medium text-slate-700">
                                {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => onEditRole(user)}
                            className="flex-1 px-3 py-2 bg-primary text-white rounded-lg text-base font-medium hover:bg-primary/90 transition-colors cursor-pointer">
                            Edit Role
                        </button>
                        <button
                            onClick={() => onDelete(user)}
                            className="px-3 py-2 border border-red-200 text-red-600 rounded-lg text-base font-medium hover:bg-red-50 transition-colors cursor-pointer">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfoModal;
