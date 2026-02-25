import { Suspense } from "react";
import UsersTab from "../components/UsersTab";
import UsersSkeleton from "../components/UsersSkeleton";

const UsersPage = async ({
    params,
    searchParams
}: {
    params: Promise<{ lang: string }>;
    searchParams: Promise<{ search?: string, role?: string }>
}) => {
    const { lang } = await params;
    const sp = await searchParams;
    return (
        <Suspense fallback={<UsersSkeleton />}>
            <UsersTab searchParams={sp} lang={lang} />
        </Suspense>
    );
};

export default UsersPage;