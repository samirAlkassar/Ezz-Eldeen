import { Address } from "@/features/user/types";

const AddressItem = ({ address, onEdit, onDelete }: {address : Address, onEdit : ()=> void, onDelete: ()=> void}) => (
    <div className="border border-gray-200 p-4 rounded-xl flex justify-between items-start">
        <div className="space-y-2 grid grid-cols-2 gap-y-1 gap-x-6 w-full">
            <div className="flex items-center gap-2">
                <h5 className="font-medium text-gray-800">Full Address:</h5>
                <p className="text-gray-700">{address?.fullName}</p>
            </div>
            <span></span>
            <div className="flex items-center gap-2">
                <h5 className="font-medium text-gray-800">Street:</h5>
                <p className="text-gray-700">{address?.street}</p>
            </div>
            <div className="flex items-center gap-2">
                <h5 className="font-medium text-gray-800">City:</h5>
                <p className="text-gray-700">{address?.city}</p>
            </div>
            <div className="flex items-center gap-2">
                <h5 className="font-medium text-gray-800">State:</h5>
                <p className="text-gray-700">{address?.state}</p>
            </div>
            <div className="flex items-center gap-2">
                <h5 className="font-medium text-gray-800">Country:</h5>
                <p className="text-gray-700">{address?.country}</p>
            </div>
            <div className="flex items-center gap-2">
                <h5 className="font-medium text-gray-800">Postal Code:</h5>
                <p className="text-gray-700">{address?.postalCode}</p>
            </div>
            <div className="flex items-center gap-2">
                <h5 className="font-medium text-gray-800">Phone Number:</h5>
                <p className="text-gray-700">{address?.phone}</p>
            </div>
        </div>

        <div className="flex gap-2">
            <button 
                onClick={onEdit} 
                className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-200 transition text-sm font-medium cursor-pointer">
                Edit
            </button>
            <button 
                onClick={onDelete} 
                className="bg-red-100 text-red-600 px-3 py-1 rounded-lg hover:bg-red-200 transition text-sm font-medium cursor-pointer">
                Delete
            </button>
        </div>
    </div>
)

export default  AddressItem;