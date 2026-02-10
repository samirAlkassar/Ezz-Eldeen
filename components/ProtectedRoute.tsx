"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchCurrentUser } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import i18n from "@/i18n/i18n";

interface ProtectedRouteProps {
    children: ReactNode;
    role?: "admin" | "customer";
}

export default function ProtectedRoute({ children, role }: ProtectedRouteProps) {
    const router = useRouter();
    const {currentUser, loading} = useSelector((state: RootState)=> state.user);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [dispatch]);

    useEffect(() => {
        if (!loading) {
            if (!currentUser) {
                router.replace(`/${i18n.language}/login`);
                return;
            }

            if (role && currentUser.role !== role) {
                router.replace(`/${i18n.language}/`);
                return;
            }
        }

    }, [currentUser, role, router, loading]);

    if (!currentUser?.role || (role && currentUser?.role !== role)) return null;

    return <>{children}</>;
}
