import { loginApi } from "@/features/auth/authAPI";
import LoginClient from "./components/LoginClient";
import setCookies from "@/actions/setCoockies";

async function loginAction({ email, password }: {email:string, password:string}) {
    "use server";
    const data = await loginApi({email, password});
    if (!data?.token) {
        throw new Error("Login failed");
    };
    await setCookies("token", data?.token);
    return { user: data.user };
}

export default function LoginPage() {
    return (
        <div className="py-12 md:py-0 min-h-screen flex flex-row-reverse bg-[#FFF4EC]">
            <LoginClient loginAction={loginAction}/>
        </div>
    );
}
