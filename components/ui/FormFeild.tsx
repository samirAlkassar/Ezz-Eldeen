import { twMerge } from "tailwind-merge";

type FormFieldType = {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    className?: string;
    required?: boolean;
    children?: React.ReactNode;
    inputType?: "input" | "textarea";
    rows?: number;
    type?: "text" | "number" | "file" | "email" | "password" | "tel";
    accept?: string;
    alert?:boolean;
    placeholder?:string,
    name?:string
}

const FormField = ({
    value, 
    onChange, 
    className, 
    required=false, 
    children, 
    inputType="input", 
    rows=3, 
    type="text", 
    accept, 
    alert=false,
    placeholder,
    name}:FormFieldType) => {
    return (
        <div>
            <label htmlFor={name} className={twMerge("text-sm md:text-base font-medium", alert ? "text-red-400" : "text-gray-700")}>{children}{required && <span className="text-red-400 border-red-300 px-1">*</span> }</label>
            {inputType === "input" ? 
            <input
                value={value}
                name={name}
                id={name}
                type={type}
                accept={accept}
                placeholder={placeholder}
                onChange={onChange}
                className={twMerge("w-full px-5 py-2.5 border text-gray-700 border-gray-300 rounded-lg md:rounded-full mt-0.5 outline-none focus:ring-1 ring-gray-400", className)}
                required={required}
            /> :
            <textarea
                value={value}
                rows={rows}
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={onChange}
                className={twMerge("w-full px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg mt-0.5 outline-none focus:ring-1 ring-gray-400", className)}
                required={required}
            />
            }

        </div>
    )
}

export default FormField;