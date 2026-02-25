import getCookies from "@/actions/getCookies";

const API_BASE = process.env.NEXT_PUBLIC_API_URL + "/user";

async function authFetch(url: string, options: RequestInit = {}) {
    const token = await getCookies("token");

    const headers: HeadersInit = {
        ...options.headers,
        Authorization: `Bearer ${token?.value}`,
        "Content-Type": "application/json",
    };

    const res = await fetch(url, {
        ...options,
        headers,
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Request failed: ${res.status}`);
    }

    return res.json();
}

export const adminUsersAPI = {
    addUser: async (userData: any) => {
        return authFetch(`${API_BASE}/add`, {
            method: "POST",
            body: JSON.stringify(userData),
        });
    },

    editRole: async (userId: string, role: string) => {
        return authFetch(`${API_BASE}/edit-role`, {
            method: "PUT",
            body: JSON.stringify({ userId, role }),
        });
    },

    deleteUser: async (userId: string) => {
        return authFetch(`${API_BASE}/delete`, {
            method: "DELETE",
            body: JSON.stringify({ userId }),
        });
    },
};
