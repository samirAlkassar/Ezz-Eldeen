"use client";

import React, { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Edit, Trash, User as UserIcon } from "lucide-react";
import { User } from "@/features/admin/types";

interface UserActionsMenuProps {
    user: User;
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
    onView: (user: User) => void;
}

const UserActionsMenu = ({ user, onEdit, onDelete, onView }: UserActionsMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer">
                <MoreHorizontal size={20} className="text-slate-500" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 z-50 py-1">
                    <button
                        onClick={() => {
                            onView(user);
                            setIsOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                        <UserIcon size={16} />
                        View Info
                    </button>
                    <button
                        onClick={() => {
                            onEdit(user);
                            setIsOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                        <Edit size={16} />
                        Edit Role
                    </button>
                    <div className="border-t border-slate-100 my-1"></div>
                    <button
                        onClick={() => {
                            onDelete(user);
                            setIsOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                        <Trash size={16} />
                        Delete User
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserActionsMenu;
