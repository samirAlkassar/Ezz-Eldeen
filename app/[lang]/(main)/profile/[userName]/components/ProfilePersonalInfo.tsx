import PersonalInformationSettings from "./PersonalInformationSettings";
import LoginPasswordSettings from "./LoginPasswordSettings";
import LogoutSettings from "./LogoutSettings";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

const ProfilePersonalInfo = ({
    currentProfileSection,
    imageFile,
    currentTitle
    }:{
    currentProfileSection: string,
    imageFile: File | null,
    currentTitle: string
    }) => {
    const t = useTranslations("profile");
    const lang = useLocale();
    return (
        <section className="flex-4 p-2 bg-[#F7F5F8] rounded-xl shadow-xs border border-gray-100 h-fit">
            <h3 className="p-4 text-lg md:text-2xl text-primary font-medium border-b border-gray-200 pb-4">
                {
                    lang === "ar"  ? `${t("settings")} ${currentTitle}` : `${currentTitle} ${t("settings")}`
                }
            </h3>
            {
                currentProfileSection === "pr-401" ? 
                <PersonalInformationSettings imageFile={imageFile}/>:
                currentProfileSection === "pr-402" ?
                <LoginPasswordSettings /> : <LogoutSettings />
            }

        </section>
    )
}

export default ProfilePersonalInfo;