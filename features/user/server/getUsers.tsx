import getCookies from "@/actions/getCookies";

export async function getUsers(search?: string, role?: string) {
    const token = await getCookies("token")
    if (!token) {
        throw new Error("Token not found");
    }

    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/user/all-users`);
    if (search) url.searchParams.append("search", search);
    if (role) url.searchParams.append("role", role);

    const response = await fetch(url.toString(), {
        headers: {
            "Content-Type": "application/json",
            "Accept-Language": "en",
            "Authorization": `Bearer ${token.value}`
        },
        next: { revalidate: 1000 }
    });
    const data = await response.json();
    return data;
}