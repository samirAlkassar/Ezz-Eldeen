"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchCurrentUser, selectUser } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";

interface ProtectedRouteProps {
    children: ReactNode;
    role?: "admin" | "customer";
}

export default function ProtectedRoute({ children, role }: ProtectedRouteProps) {
    const router = useRouter();
    const {currentUser, loading, error} = useSelector((state: RootState)=> state.user);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [dispatch]);

    useEffect(() => {
        if (!loading) {
            if (!currentUser) {
                router.replace("/login");
                return;
            }

            if (role && currentUser.role !== role) {
                router.replace("/");
                return;
            }
        }

    }, [currentUser, role, router]);

    if (!currentUser?.role || (role && currentUser?.role !== role)) return null;

    return <>{children}</>;
}
