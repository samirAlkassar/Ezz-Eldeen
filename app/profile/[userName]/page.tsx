"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { fetchProfile } from "@/features/user/userSlice";
import { useDispatch } from "react-redux";
import ProfileAside from "./components/ProfileAside";
import ProfilePersonalInfo from "./components/ProfilePersonalInfo";

const Portfolio = () => {
    const [currentProfileSection, setCurrentProfileSection] = useState("Personal Information");
    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector((state: RootState) => state.currentUser.user);
    
    useEffect(()=>{
        dispatch(fetchProfile());
    },[dispatch]);

    console.log("current user: ", user)

    const [imageFile, setImageFile] = useState<File | null>(null);
    return (
        <main className="bg-orange-50/50">
            <div className="mx-auto flex flex-col md:flex-row gap-6 p-4 md:p-6 lg:p-8">
                <ProfileAside setImageFile={setImageFile} imageFile={imageFile} currentProfileSection={currentProfileSection} setCurrentProfileSection={setCurrentProfileSection}/>
                <ProfilePersonalInfo imageFile={imageFile} currentProfileSection={currentProfileSection}/>
            </div>
        </main>
    )
};

export default Portfolio;
