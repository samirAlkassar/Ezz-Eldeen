import FormField from "@/components/ui/FormFeild";
import { Address } from "@/features/user/types";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useState } from "react";

const AddressForm = ({ initial, onSubmit, onCancel } : {initial: Address, onSubmit: (updated: Address) => void, onCancel: ()=>void}) => {
    const t = useTranslations("profile");
    const [form, setForm] = useState(initial || {
        fullName: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    };

    return (
        <motion.div 
            initial={{opacity: 0, y: 0, height: 0}}
            animate={{opacity: 1, y: 0, height: 'auto'}}
            exit={{opacity:0, y:6}}
            transition={{duration: 0.25}}
            className="p-4 border border-gray-200 rounded-lg space-y-4 grid grid-cols-1 md:grid-cols-2 gap-x-2 md:gap-x-4">
            <FormField name="fullName" value={form.fullName} onChange={handleChange}>{t("fields.fullName")}</FormField>
            <FormField name="phone" value={form.phone} onChange={handleChange}>{t("fields.phone")}</FormField>
            <FormField name="street" value={form.street} onChange={handleChange}>{t("fields.street")}</FormField>
            <FormField name="city" value={form.city} onChange={handleChange}>{t("fields.city")}</FormField>
            <FormField name="state" value={form.state} onChange={handleChange}>{t("fields.state")}</FormField>
            <FormField name="country" value={form.country} onChange={handleChange}>{t("fields.country")}</FormField>
            <FormField name="postalCode" value={form.postalCode} onChange={handleChange}>{t("fields.postalCode")}</FormField>
            <span></span>

            <div className="flex gap-4 mt-4">
                <button type="button" onClick={onCancel} className="bg-gray-200 px-4 py-2 rounded-lg cursor-pointer">{t("buttons.cancel")}</button>
                <button type="button" onClick={() => onSubmit(form)} className="bg-orange-500 px-4 py-2 text-white rounded-lg cursor-pointer">{t("buttons.save")}</button>
            </div>
        </motion.div>
    );
};


export default AddressForm;