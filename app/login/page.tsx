'use client';

import React, { useState } from 'react';
import setCookies from "../../actions/setCoockies";

export default function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");

    try {
        setLoading(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include"
        });

        const data = await res.json();

        if (!res.ok) {
        setError(data.msg || "Invalid credentials");
        return;
        }

        setSuccess("Logged in successfully ✅");
        await setCookies("token", data.token)

        window.location.href = "/"
    } catch (err) {
        console.error(err);
        setError("Something went wrong. Please try again.");
    } finally {
        setLoading(false)
    }
    };

    return (
        <div className="min-h-screen flex flex-row-reverse bg-[#FFF4EC]">
            {/* Left side (orange theme with login card) */}
            <div className="relative flex-1 flex justify-center items-center p-6">
                <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">
                    <h2 className="text-3xl font-extrabold text-center text-[#FF791A] mb-6">
                        Login to Your Account
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF791A]"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                autoComplete="email"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF791A]"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                            />
                        </div>
                        {error && <div className="text-red-500 text-sm">{error}</div>}
                        <button
                            type="submit"
                            className="bg-[#FF791A] w-full text-white px-4 py-2 text-lg rounded-full cursor-pointer shadow-md active:scale-95 transition-transform duration-150"
                        >
                             {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"/>
                                </svg>
                                Login
                            </span>
                            ) : (
                            "Login"
                            )}
                        </button>
                    </form>
                    {success && (
                    <div className="mt-4 p-3 rounded-xl bg-green-50 border border-green-200/60">
                        <p className="text-accent text-sm">{success}</p>
                    </div>
                    )}
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Don’t have an account?{' '}
                        <a href="/register" className="text-[#FF791A] font-semibold hover:underline">
                            Register
                        </a>
                    </p>
                </div>

                {/* Curved divider */}
            </div>

            {/* Right side (image) */}
            <div className="hidden md:flex flex-1 items-center justify-center bg-orange-200 overflow-hidden -ml-26">
                <img
                    src="/images/login-splash.jpg"
                    alt="Kids, school and toys illustration"
                    className="w-full h-full object-cover opacity-85"
                />
            </div>
        </div>
    );
}
