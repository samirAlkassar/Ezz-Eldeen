import FormField from "@/components/ui/FormFeild";

const LoginPasswordSettings = () => {
    return (
        <form action="" className="space-y-4 mt-4">
            <FormField>Old Password</FormField>
            <FormField>New Password</FormField>
            <FormField>Confirm New Password</FormField>
            <div className="flex gap-6 mt-8">
                <button className="bg-gray-200 rounded-xl py-3 w-full text-gray-800 font-medium cursor-pointer">Discard Changes</button>
                <button className="bg-orange-400 rounded-xl py-3 w-full text-white font-medium cursor-pointer">Save Changes</button>
            </div>
        </form>
    )
}

export default LoginPasswordSettings;