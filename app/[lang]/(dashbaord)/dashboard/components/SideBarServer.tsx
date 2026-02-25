import { userAPI } from "@/features/user/userAPI";
import Sidebar from "./Sidebar";


const SideBarServer = async () => {
    const currentUser = await userAPI.getProfile();
    console.log(currentUser);
    return (
        <div>
            <Sidebar currentUser={currentUser.user} />
        </div>
    );
};

export default SideBarServer;
