import { twMerge } from "tailwind-merge";

const ProfileAsideTab = ({title, currentProfileSection, setCurrentProfileSection, icon}:
    {title: string, setCurrentProfileSection:(value: string)=>void, icon: React.ReactNode, currentProfileSection:string}) => {
    return (
        <div
            onClick={()=>setCurrentProfileSection(title)} 
            className={twMerge("flex items-center justify-start gap-2 px-4 py-3 rounded-lg cursor-pointer font-medium",
                currentProfileSection === title ? "bg-orange-400 hover:opacity-90 text-white" : "bg-transparent hover:bg-gray-100"
            )}>
            {icon}
            <p className="text-base">{title}</p>
        </div>
    )
}

export default ProfileAsideTab;