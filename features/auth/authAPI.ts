import getCookies from "@/actions/getCookies";

// simple fetch-based API helper — replace URLs with your backend endpoints
export async function loginApi({ email, password }: {email:string, password:string}) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json(); 
}

export async function fetchCurrentUserApi() {
  const token = await getCookies("token");
  if (!token) {
      console.log("token not found");
      return
  };
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.value}`,
    },
    cache: "no-store",
  });

    if (res.status === 401) {
      return null;
    }

    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }
  return res.json();
}

export async function logoutApi() {
  const res = await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Logout failed');
  return res.json();
}
