import { getUsers } from "@/features/user/server/getUsers";
import UserManagementClient from "./UserManagementClient";

async function UsersTab({
    searchParams,
    lang = "en"
}: {
    searchParams?: { search?: string, role?: string },
    lang?: string
}) {
    // Fetch users on the server
    const data = await getUsers(searchParams?.search, searchParams?.role);

    // We pass any necessary props to the client component
    // lang is not directly available here, but we can pass it if we add it as a prop to UsersTab

    return (
        <UserManagementClient initialData={data} lang={lang} />
    );
}

export default UsersTab;
