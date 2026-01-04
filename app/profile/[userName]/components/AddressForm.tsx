import FormField from "@/components/ui/FormFeild";
import { motion } from "motion/react";
import { useState } from "react";

const AddressForm = ({ initial, onSubmit, onCancel } : any) => {
    const [form, setForm] = useState(initial || {
        fullName: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
    });

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <motion.div 
            initial={{opacity: 0, y: 0, height: 0}}
            animate={{opacity: 1, y: 0, height: 'auto'}}
            exit={{opacity:0, y:6}}
            transition={{duration: 0.25}}
            className="p-4 border border-gray-200 rounded-lg space-y-4 grid grid-cols-1 md:grid-cols-2 gap-x-2 md:gap-x-4">
            <FormField name="fullName" value={form.fullName} onChange={handleChange}>Full Name</FormField>
            <FormField name="phone" value={form.phone} onChange={handleChange}>Phone</FormField>
            <FormField name="street" value={form.street} onChange={handleChange}>Street</FormField>
            <FormField name="city" value={form.city} onChange={handleChange}>City</FormField>
            <FormField name="state" value={form.state} onChange={handleChange}>State</FormField>
            <FormField name="country" value={form.country} onChange={handleChange}>Country</FormField>
            <FormField name="postalCode" value={form.postalCode} onChange={handleChange}>Postal Code</FormField>
            <span></span>

            <div className="flex gap-4 mt-4">
                <button type="button" onClick={onCancel} className="bg-gray-200 px-4 py-2 rounded-lg cursor-pointer">Cancel</button>
                <button type="button" onClick={() => onSubmit(form)} className="bg-orange-500 px-4 py-2 text-white rounded-lg cursor-pointer">Save</button>
            </div>
        </motion.div>
    );
};


export default AddressForm;