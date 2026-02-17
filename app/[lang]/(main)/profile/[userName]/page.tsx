"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { fetchProfile } from "@/features/user/userSlice";
import { useDispatch } from "react-redux";
import ProfileAside from "./components/ProfileAside";
import ProfilePersonalInfo from "./components/ProfilePersonalInfo";
import { useTranslations } from "next-intl";
import Breadcrumbs from "@/components/Breadcrumbs";

const Portfolio = () => {
    const  t = useTranslations("profile");
    const [currentProfileSection, setCurrentProfileSection] = useState("pr-401");
    const [currentTitle, setCurrentTitle] = useState<string>(t("sidebar.profileDetails"))
    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector((state: RootState) => state.currentUser.user);
    
    useEffect(()=>{
        dispatch(fetchProfile());
    },[dispatch]);

    console.log("current user: ", user)

    const [imageFile, setImageFile] = useState<File | null>(null);
    return (
        <main className="bg-background">
            <Breadcrumbs  currentPage="profile"/>
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 p-2 md:p-6 lg:p-8">
                <ProfileAside setCurrentTitle={setCurrentTitle} setImageFile={setImageFile} imageFile={imageFile} currentProfileSection={currentProfileSection} setCurrentProfileSection={setCurrentProfileSection}/>
                <ProfilePersonalInfo currentTitle={currentTitle} imageFile={imageFile} currentProfileSection={currentProfileSection}/>
            </div>
        </main>
    )
};

export default Portfolio;
