import getCookies from "@/actions/getCookies";

export async function getUsers() {
    const token = await getCookies("token")
    if (!token) {
        throw new Error("Token not found");
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/all-users`, {
        headers: {
            "Content-Type": "application/json",
            "Accept-Language": "en",
            "Authorization": `Bearer ${token.value}`
        },
        next: {revalidate: 3000}
    });
    const data = await response.json();
    return data;
}