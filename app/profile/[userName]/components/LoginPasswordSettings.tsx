import FormField from "@/components/ui/FormFeild";

const LoginPasswordSettings = () => {
    return (
        <form action="" className="space-y-4 mt-4">
            <FormField>Old Password</FormField>
            <FormField>New Password</FormField>
            <FormField>Confirm New Password</FormField>
            <div className="flex gap-6 mt-8">
                <button className="bg-gray-200 w-full text-sm md:text-base md:w-fit rounded-lg md:rounded-xl py-3 px-4 md:py-2 md:px-4 text-gray-800 hover:bg-gray-200 font-medium cursor-pointer active:scale-[97%]">Discard Changes</button>
                <button className="bg-orange-400 w-full text-sm md:text-base md:w-fit rounded-lg md:rounded-xl py-3 px-4 md:py-2 md:px-4 text-gray-800 hover:bg-gray-200 font-medium cursor-pointer active:scale-[97%]">Save Changes</button>
            </div>
        </form>
    )
}

export default LoginPasswordSettings;