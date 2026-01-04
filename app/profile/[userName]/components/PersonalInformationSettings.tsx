import { AppDispatch, RootState } from "@/app/store";
import { useToast } from "@/components/Toast";
import FormField from "@/components/ui/FormFeild";
import { addAddress, deleteAddress, updateAddress, updateProfile } from "@/features/user/userSlice";
import { UserIcon, Map, Trash, MapIcon, User} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressItem from "./AddressItem";
import AddressForm from "./AddressForm";
import { AnimatePresence } from "framer-motion"
import { Address } from "@/features/user/types";



const PersonalInformationSettings = ({imageFile}:{imageFile: File | null}) => {
    const user = useSelector((state: RootState) => state.currentUser.user?.user);
    const dispatch = useDispatch<AppDispatch>();
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const { toast } = useToast();
    const [userData, setUserData] = useState({
        picturePath : "",
        firstName : "",
        secondName : "",
        email : "",
        phone: "",
        addresses: [] as Address[],
    });

    useEffect(() => {
        if (user) {
            setUserData({
                picturePath: user.picturePath || "",
                firstName: user.firstName || "",
                secondName: user.lastName || "",
                email: user.email || "",
                phone: user.phone || "",
                addresses: user.addresses || []
            });
        }
    }, [user]);

    const openNewAddressForm = () => {
        setEditingAddress(null);
        setShowAddressForm(true);
    };

    const openEditAddress = (addr: Address) => {
        setEditingAddress(addr);
        setShowAddressForm(true);
    };

    const handleDeleteAddress = (id: string) => {
        dispatch(deleteAddress(id));
        toast({ title: "Deleted", description: "Address is deleted successfully",variant: "info", position: "bottom-right", icon: <Trash size={20}/> })
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();

            await dispatch(updateProfile({
                firstName : userData?.firstName,
                lastName: userData?.secondName,
                email: userData?.email,
                phone: userData?.phone,
                picturePath : imageFile ? undefined : userData.picturePath
            }));
            toast({ title: "User profile updated", description: "Your profile information is updated successfully",variant: "success", position: "bottom-right", icon: <UserIcon size={20}/> })
        } catch (error){
            toast({ title: "Error", description: `${error}`,variant: "error", position: "bottom-right", icon: <Map size={20}/> })
        }


    };

    const handleAddressSubmit = async (data: Address) => {
        if (editingAddress) {
            await dispatch(updateAddress({ addressId: editingAddress._id as string, data }));
            toast({ title: "Address updated", description: "Your address is updated successfully",variant: "success", position: "bottom-right", icon: <Map size={20}/> })
        } else {
            await dispatch(addAddress(data));
            toast({ title: "Address Added", description: "New address is added successfully",variant: "success", position: "bottom-right", icon: <Map size={20}/> })
        }

        setShowAddressForm(false);
    };


    return (
        <form action="" onSubmit={handleSubmit} className="space-y-4 mt-6">
            <h3 className="text-lg md:text-xl font-medium text-gray-800 flex items-center justify-start gap-1"><User size={20}/><p>Personal Information</p></h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <FormField 
                    name="firstName"
                    value={userData?.firstName}
                    onChange={(e)=>setUserData({...userData, firstName: e.target.value})}>
                    First Name
                </FormField>
                <FormField
                    name="secondName"
                    value={userData?.secondName}
                    onChange={(e)=>setUserData({...userData, secondName: e.target.value})}>
                    Last Name
                </FormField>
            </div>
            <FormField
                name="email"
                value={userData?.email}
                onChange={(e)=>setUserData({...userData, email: e.target.value})}>
                Email
            </FormField>

            {/* Addresses Manager */}
            <div className="mt-10 space-y-4">
                <h3 className="text-lg md:text-xl font-medium text-gray-800 flex items-center justify-start gap-1"><MapIcon size={20}/><p>Address</p></h3>

                {userData.addresses.length === 0 && (
                    <p className="text-gray-500">No addresses found.</p>
                )}

                {userData.addresses.map((addr) => (
                    <AddressItem
                        key={addr._id}
                        address={addr}
                        onEdit={() => openEditAddress(addr)}
                        onDelete={() => handleDeleteAddress(addr._id as string)}
                    />
                ))}
                <AnimatePresence mode="popLayout">
                    {showAddressForm && (
                            <AddressForm
                                initial={editingAddress as Address}
                                onCancel={() => setShowAddressForm(false)}
                                onSubmit={handleAddressSubmit}
                            />
                    )}
                </AnimatePresence>
                <button
                    type="button"
                    onClick={openNewAddressForm}
                    className="bg-orange-400 text-white px-4 py-2 rounded-lg cursor-pointer"
                >
                    + Add New Address
                </button>
            </div>

            <div className="flex gap-4 mt-10 flex-row-reverse">
                <button type="button" className="bg-gray-100 w-full md:w-fit rounded-lg md:rounded-xl py-3 px-4 md:py-2 md:px-4 text-gray-800 hover:bg-gray-200 font-medium cursor-pointer active:scale-[97%]">Discard Changes</button>
                <button type="submit" className="bg-green-500 w-full md:w-fit rounded-lg md:rounded-xl py-3 px-4 md:py-2 md:px-4 text-white hover:bg-green-600 font-medium cursor-pointer active:scale-[97%]">Save Changes</button>
            </div>
        </form>
    )
}


export default PersonalInformationSettings;