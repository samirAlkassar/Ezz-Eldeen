import { registernApi } from "@/features/auth/authAPI";
import RegisterClient from "./components/RegisterClient";
import { RegisterPayload } from "@/features/auth/types";


async function registerAction(payload: RegisterPayload) {
    "use server";
    if (!payload.email || !payload.password) {
        throw new Error("Invalid input");
    }
    return await registernApi(payload);
}

export default function RegisterPage() {
    return (
        <div className="py-12 md:py-0 min-h-screen flex bg-[#FFF4EC]">
            <RegisterClient registerAction={registerAction}/>
        </div>
    );
}