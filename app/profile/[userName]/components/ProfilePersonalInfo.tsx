import PersonalInformationSettings from "./PersonalInformationSettings";
import LoginPasswordSettings from "./LoginPasswordSettings";
import LogoutSettings from "./LogoutSettings";

const ProfilePersonalInfo = ({
    currentProfileSection,
    imageFile
    }:{currentProfileSection: string, imageFile: File | null
    }) => {
    return (
        <section className="flex-4 p-4 md:p-6 lg:p-8 bg-white rounded-lg shadow-sm border border-gray-100 h-fit">
            <h3 className="text-xl md:text-3xl text-orange-400 font-semibold border-b border-gray-200 pb-4">{currentProfileSection}{" Settings"}</h3>
            {
                currentProfileSection === "Personal Information" ? 
                <PersonalInformationSettings imageFile={imageFile}/>:
                currentProfileSection === "Login & Password" ?
                <LoginPasswordSettings /> : <LogoutSettings />
            }

        </section>
    )
}

export default ProfilePersonalInfo;
