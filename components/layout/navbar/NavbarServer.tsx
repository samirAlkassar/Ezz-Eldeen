import { fetchCurrentUserApi } from "@/features/auth/authAPI";
import Navbar from "./Navbar";

export default async function NavbarServer() {
    const currentUser = await fetchCurrentUserApi();
    return (
        <>
            <Navbar user={currentUser?.user}/>
        </>
    )
}