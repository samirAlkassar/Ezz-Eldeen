import { twMerge } from "tailwind-merge";

const ProfileAsideTab = ({title, id, currentProfileSection, setCurrentProfileSection, icon,  setCurrentTitle}:
    {title: string, id: string, setCurrentTitle: (title: string)=> void , setCurrentProfileSection:(value: string)=>void, icon: React.ReactNode, currentProfileSection:string}) => {
        return (
        <div
            onClick={()=>{setCurrentProfileSection(id); setCurrentTitle(title)}} 
            className={twMerge("flex items-center justify-start gap-2 px-4 py-3 rounded-lg cursor-pointer text-text",
                currentProfileSection === id ? "bg-gray-300/55 hover:opacity-90" : "bg-transparent hover:bg-gray-100/80"
            )}>
            <div className="bg-primary/20 p-2 rounded-xl">{icon}</div>
            <p className="text-base">{title}</p>
        </div>
    )
}

export default ProfileAsideTab;