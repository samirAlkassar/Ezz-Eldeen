import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { fetchCurrentUserApi } from "@/features/auth/authAPI";

interface ProtectedRouteProps {
    children: ReactNode;
    lang: typeLang;
}

export default async function ProtectedRoute({ children, lang }: ProtectedRouteProps) {
    const currentUser = await fetchCurrentUserApi();

    if (!currentUser) {
        redirect(`/${lang}/login`);
    } else if (currentUser.user.role !== "admin") {
        redirect(`/${lang}`)
    }

    return <>{children}</>;
}