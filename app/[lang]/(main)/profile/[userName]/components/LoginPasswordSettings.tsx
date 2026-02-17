import FormField from "@/components/ui/FormFeild";
import { useTranslations } from "next-intl";

const LoginPasswordSettings = () => {
    const t = useTranslations("profile");
    return (
        <form action="" className="space-y-4 mt-4 bg-white rounded-xl p-6">
            <FormField>{t("fields.oldPassword")}</FormField>
            <FormField>{t("fields.newPassword")}</FormField>
            <FormField>{t("fields.confirmNewPassword")}</FormField>
            <div className="flex gap-6 mt-8">
                <button className="bg-gray-200 w-full text-sm md:text-base md:w-fit rounded-lg md:rounded-xl py-3 px-4 md:py-2 md:px-4 text-gray-800 hover:bg-gray-200 font-medium cursor-pointer active:scale-[97%]">Discard Changes</button>
                <button className="bg-orange-400 w-full text-sm md:text-base md:w-fit rounded-lg md:rounded-xl py-3 px-4 md:py-2 md:px-4 text-gray-800 hover:bg-gray-200 font-medium cursor-pointer active:scale-[97%]">Save Changes</button>
            </div>
        </form>
    )
}

export default LoginPasswordSettings;