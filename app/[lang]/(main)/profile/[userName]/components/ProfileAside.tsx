import getCookies from "@/actions/getCookies";
import { AppDispatch, RootState } from "@/app/store";
import { useToast } from "@/components/Toast";
import { fetchProfile } from "@/features/user/userSlice";
import { LogOut, Pencil, TriangleAlert, UserIcon, X, User, Lock, ShoppingBag, BadgeQuestionMark, Shield } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileAsideTab from "./ProfileAsideTab";
import RoleBadge from "./RoleBadge";
import { useTranslations } from "next-intl";

type ProfileAsideProps = {
    setCurrentProfileSection: (value: string) => void;
    setImageFile: (file: File) => void;
    currentProfileSection: string;
    imageFile: File | null;
    setCurrentTitle: (title: string) => void;
};

const ProfileAside = ({setCurrentTitle, setCurrentProfileSection, imageFile, setImageFile, currentProfileSection }: ProfileAsideProps) => {
    const t = useTranslations("profile")
    const [showPictureEditMenu, setShowPictureEditMenu] = useState<boolean>(false);
    const user = useSelector((state: RootState) => state.currentUser.user);
    const [preview, setPreview] = useState<string | null>("");
    const [uploadingNewImage, setUploadingNewImage] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const ProfileSection = [
        { id: "pr-401", title: t("sidebar.profileDetails"), icon: <User size={18} /> },
        { id: "pr-404", title: t("sidebar.orderHistory"), icon: <ShoppingBag size={18} /> },
        { id: "pr-402", title: t("sidebar.security"), icon: <Lock size={18} /> },
        { id: "pr-405", title: t("sidebar.helpCenter"), icon: <BadgeQuestionMark size={18} /> },
        { id: "pr-403", title: t("sidebar.logout"), icon: <LogOut size={18} /> },
    ];
    const { toast } = useToast();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmitPicture = async () => {
        try {
            setUploadingNewImage(true);
            if (!imageFile) return;

            const token = await getCookies("token");
            const formData = new FormData();
            formData.append("image", imageFile);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/user/profile-picture`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token?.value}`,
                    },
                    body: formData,
                }
            );

            const data = await res.json();

            if (!res.ok) {
                console.log(data);
                return;
            }

            dispatch(fetchProfile());
            setShowPictureEditMenu(false);
            toast({ title: "Profile Picture updated", description: "You profile picture is updated successfully", variant: "success", position: "bottom-right", icon: <UserIcon size={20} /> })
        } catch (error) {
            console.log(error);
            toast({ title: "Error", description: "Failed to update your profile picture", variant: "error", position: "bottom-right", icon: <TriangleAlert size={20} /> })
        }
        finally {
            setUploadingNewImage(false);
        }
    };




    return (
        <aside className="bg-[#F7F5F8] p-2 rounded-2xl w-full sm:w-[18rem] lg:w-xs md:min-h-[calc(100vh-380px)] shadow-xs border border-gray-100">
            <div className="flex flex-col items-center justify-center bg-white p-4 rounded-xl">
                <div className="relative h-28 w-28 border-6 border-primary/20 rounded-full">
                    <Image
                        src={user?.user?.picturePath || "/images/placeholder.jpg"}
                        alt={`${2}`}
                        fill
                        className="absolute object-cover rounded-full scale-95 border-2 border-primary/20"/>
                    <span
                        onClick={() => setShowPictureEditMenu(true)}
                        className="absolute bg-orange-400 text-white border-2 border-white rounded-full z-10 p-2 bottom-0 right-0 cursor-pointer">
                        <Pencil size={14}/>
                    </span>
                </div>
                <h1 className="text-xl mt-2">{user?.user?.firstName} {user?.user?.lastName}</h1>
                <RoleBadge role={user?.user?.role} />
                <h3 className="text-xl font-medium mt-2 text-gray-800"></h3>
                <p className="text-base text-gray-600"></p>
            </div>

            <div className="mt-4 space-y-1 flex flex-col bg-white p-4 rounded-xl">
                {ProfileSection.map((section) => (
                    <ProfileAsideTab
                        key={section.id}
                        id={section.id}
                        title={section.title}
                        setCurrentTitle={setCurrentTitle}
                        setCurrentProfileSection={setCurrentProfileSection}
                        currentProfileSection={currentProfileSection}
                        icon={section.icon} />
                ))}
                <div className="bg-primary/10 p-3 rounded-xl relative overflow-hidden">
                    <Shield size={100} className="text-primary absolute opacity-20 -right-8"/>
                    <span className="text-primary text-sm">{t("privacyCard.padge")}</span>
                    <h6 className="text-sm">{t("privacyCard.title")}</h6>
                    <p className="text-sm text-text-muted">{t("privacyCard.description")}</p>
                </div>
            </div>

            {showPictureEditMenu && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="fixed inset-0 z-50 flex items-center justify-center px-4
                        bg-black/30 backdrop-blur-xs">

                    <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        className="relative w-sm md:w-md rounded-2xl bg-white p-6 shadow-xl">

                        <button
                            onClick={() => setShowPictureEditMenu(false)}
                            className="absolute right-4 top-4 rounded-lg cursor-pointer p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition">
                            <X size={20} />
                        </button>
                        <h3 className="text-lg font-semibold text-gray-900">Update profile picture</h3>
                        <p className="mt-0.5 text-sm text-gray-500">Choose a new photo to represent you</p>

                        <div className="mt-6 flex justify-center">
                            <div className="relative h-42 w-42 rounded-full shadow-sm">
                                <Image
                                    src={preview || "/images/placeholder.jpg"}
                                    alt="Profile picture preview"
                                    fill
                                    className="rounded-full object-cover"
                                />
                            </div>
                        </div>

                        <label className="mt-6 block cursor-pointer">
                            <span className="block w-full rounded-lg bg-orange-500 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-orange-600 transition">
                                Choose image
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>

                        <div className="mt-4 flex gap-2">
                            <button
                                onClick={() => setShowPictureEditMenu(false)}
                                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 cursor-pointer text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                                Cancel
                            </button>

                            <button
                                onClick={handleSubmitPicture}
                                disabled={uploadingNewImage}
                                className="flex-1 rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer">
                                {uploadingNewImage ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}

        </aside>
    )
};


export default ProfileAside;