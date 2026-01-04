// simple fetch-based API helper — replace URLs with your backend endpoints
export async function loginApi({ email, password }: {email:string, password:string}) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include' // if server sets cookies
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json(); // expect { user: {...}, token?: "..." }
}

export async function fetchCurrentUserApi() {
  const res = await fetch('/api/auth/me', {
    credentials: 'include' // if using cookies
  });
  if (!res.ok) throw new Error('Not authenticated');
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
