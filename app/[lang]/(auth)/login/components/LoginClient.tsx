'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { TriangleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';


const LoginClient = ({loginAction}:{loginAction: (value: {email: string, password: string})=>void}) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const params = useParams<{ lang: typeLang }>();
    const tLogin = useTranslations("Auth");
    const tCommon = useTranslations("Common");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            setLoading(true)
            await loginAction({email, password});
            setSuccess("Logged in successfully ✅");
            router.push(`/${params.lang}/`);
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false)
        }
    };


    return (
        <div className="relative flex-1 flex justify-center items-center p-6">
            <div className="bg-white shadow-md md:shadow-2xl rounded-xl md:rounded-3xl p-6 md:p-8 w-full max-w-md">
                <h2 className="text-3xl font-extrabold text-center text-[#FF791A] mb-6">
                    {tLogin("loginPage.title")}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 md:mb-1">
                            {tLogin("loginPage.email")}
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full px-3 py-1.5 md:px-4 md:py-2 border border-gray-300 rounded-xl md:rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF791A]"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            autoComplete="email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 md:mb-1">
                            {tLogin("loginPage.password")}
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="w-full px-3 py-1.5 md:px-4 md:py-2 border border-gray-300 rounded-xl md:rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF791A]"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-[#FF791A] w-full mt-4 text-white py-1.5 px-4 md:py-2 text-lg rounded-xl md:rounded-full cursor-pointer shadow-sm md:shadow-md active:scale-95 transition-transform duration-150">
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Login
                            </span>
                        ) : (
                            `${tCommon("login")}`
                        )}
                    </button>
                </form>
                {success && (
                    <div className="mt-4 p-3 rounded-xl bg-green-50 border border-green-200/60">
                        <p className="text-accent text-sm">{success}</p>
                    </div>
                )}
                {error && (
                    <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200/60">
                        <div className="flex items-center justify-center gap-2 text-red-500">
                            <TriangleAlert size={18}/>
                            <p className='text-accent text-sm'>Credentials are wrong, please try again.</p>
                        </div>
                    </div>
                )}
                <p className="mt-4 text-center text-sm text-gray-600">
                    {tLogin("loginPage.message")}{' '}
                    <Link href={`/${params.lang}/register`} className="text-[#FF791A] font-semibold hover:underline">
                        {tCommon("register")}
                    </Link>
                </p>
            </div>
        </div>
    )
};

export default LoginClient;