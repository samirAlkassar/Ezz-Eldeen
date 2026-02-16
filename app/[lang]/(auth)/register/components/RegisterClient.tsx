'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useToast } from "@/components/Toast";
import { CheckSquare, TriangleAlert } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { RegisterPayload } from '@/features/auth/types';

const RegisterClient = ({registerAction}:{registerAction: (payload: RegisterPayload) => Promise<void>}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        });
    const params = useParams<{lang: typeLang}>();
    const tRegister = useTranslations("Auth");
    const tCommon = useTranslations("Common");
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null);
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
    }

    const formData = new FormData();
    formData.append("firstName", form.firstName);
    formData.append("lastName", form.lastName);
    formData.append("email", form.email);
    formData.append("password", form.password);

    try {
        setLoading(true);
        await registerAction({
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            password: form.password,
        });
        router.push(`/${params.lang}/login`);
        toast({ title: "New account created", description: `Welcome ${form?.firstName} 👋, your account is created successfully`, variant: "success", position: "bottom-right", icon: <CheckSquare size={20}/> })
        
    } catch (error) {
        setError("Registration failed. Please try again.");
        console.error("Error during registration:", error);
        toast({ title: "Error", description: "Error createing new account",variant: "error", position: "bottom-right", icon: <TriangleAlert size={20}/> })
    } finally {
        setLoading(false)
    }
    };
    return (
        <div className="relative flex-1 flex justify-center items-center p-6">
            <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-extrabold text-center text-[#FF791A] mb-6">
                    {tRegister("registerPage.title")}
                </h2>
                <form className="space-y-3 md:space-y-5" onSubmit={handleSubmit}>
                    <div className='flex gap-4'>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 md:mb-1">
                            {tRegister("registerPage.firstName")}
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-1.5 md:px-4 md:py-2 border border-gray-300 rounded-xl md:rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF791A]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 md:mb-1">
                            {tRegister("registerPage.lastName")}
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-1.5 md:px-4 md:py-2 border border-gray-300 rounded-xl md:rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF791A]"
                            />
                        </div>

                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 md:mb-1">
                           {tRegister("registerPage.email")}
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-1.5 md:px-4 md:py-2 border border-gray-300 rounded-xl md:rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF791A]"
                        />
                    </div>
                    <div>
                        <label className={`block text-sm font-medium text-gray-700 md:mb-1 ${error === "Passwords do not match" ? 'text-red-500' : 'text-gray-700'}`}>
                            {tRegister("registerPage.password")}
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-1.5 md:px-4 md:py-2 border border-gray-300 rounded-xl md:rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF791A]"
                        />
                    </div>
                    <div>
                        <label className={`block text-sm font-medium text-gray-700 md:mb-1 ${error === "Passwords do not match" ? 'text-red-500' : 'text-gray-700'}`}>
                            {tRegister("registerPage.confirmPassword")}
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-1.5 md:px-4 md:py-2 border border-gray-300 rounded-xl md:rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF791A]"
                        />
                    </div>
                    {error && (
                        <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200/60">
                            <div className="flex items-center justify-center gap-2 text-red-500">
                                <TriangleAlert size={18}/>
                                <p className='text-accent text-sm'>{error}</p>
                            </div>
                        </div>
                    )}
                    <button
                            type="submit"
                            className="bg-[#FF791A] mt-4 w-full text-white py-1.5 px-4 md:py-2 text-lg rounded-xl md:rounded-full cursor-pointer shadow-sm md:shadow-md active:scale-95 transition-transform duration-150"
                        >
                        {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"/>
                            </svg>
                            Creating account
                        </span>
                        ) : (
                        `${tRegister("registerPage.registerButton")}`
                        )}
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-4">
                    {tRegister("registerPage.message")}{' '}
                    <Link href={`/${params.lang}/login`} className="text-[#FF791A] font-semibold hover:underline">
                        {tCommon("login")}
                    </Link>
                </p>
            </div>
        </div>
    )
};

export default RegisterClient;