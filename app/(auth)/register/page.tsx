"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Chrome, ArrowRight, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Recaptcha } from "@/components/auth/recaptcha";

export default function RegisterPage() {
    const { signInWithGoogle, registerWithEmail } = useAuth();
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

    const handleGoogleLogin = async () => {
        setIsLoading("google");
        try {
            await signInWithGoogle();
        } finally {
            setIsLoading(null);
        }
    };

    const handleEmailRegister = async () => {
        if (!email || !password) return;
        if (!recaptchaToken) {
            alert("Please complete the captcha");
            return;
        }
        setIsLoading("email");
        try {
            await registerWithEmail(email, password);
        } catch (error: any) {
            const message = error.code === 'auth/email-already-in-use'
                ? "Email is already in use. Please login instead."
                : error.message;
            alert(message);
        } finally {
            setIsLoading(null);
        }
    };

    return (
        <div className="w-full h-screen grid lg:grid-cols-2">
            {/* Left Side - Form */}
            <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 bg-white dark:bg-black">
                <div className="w-full max-w-sm mx-auto space-y-8">
                    <div className="space-y-2 text-center lg:text-left">
                        <Link href="/" className="inline-block mb-8">
                            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-amber-500 bg-clip-text text-transparent">Linkingo</span>
                        </Link>
                        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Create your account</h1>
                        <p className="text-zinc-500 dark:text-zinc-400">Join Linkingo to manage your digital identity.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-12 bg-transparent border-zinc-200 dark:border-zinc-800 text-black dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="h-12 bg-transparent border-zinc-200 dark:border-zinc-800 text-black dark:text-white"
                                />
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <Recaptcha onChange={setRecaptchaToken} />
                        </div>

                        <Button
                            onClick={handleEmailRegister}
                            disabled={!!isLoading || !email || !password || !recaptchaToken}
                            className="w-full h-12 bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
                        >
                            {isLoading === "email" ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Mail className="mr-2 h-4 w-4" />
                            )}
                            Create Account
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white dark:bg-black px-2 text-zinc-500">Or continue with</span>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            onClick={handleGoogleLogin}
                            disabled={!!isLoading}
                            className="w-full h-12 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-black dark:text-white"
                        >
                            {isLoading === "google" ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Chrome className="mr-2 h-4 w-4 text-red-500" />
                            )}
                            Google
                        </Button>

                        <div className="text-center text-sm">
                            Already have an account?{" "}
                            <Link href="/login" className="font-semibold text-pink-600 hover:text-pink-500 underline">
                                Log in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Visual */}
            <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-pink-500 to-amber-500 text-white p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
                <div className="relative z-10 max-w-lg text-center space-y-6">
                    <h2 className="text-4xl font-bold leading-tight">Stand out with a supercharged link in bio.</h2>
                    <p className="text-lg text-pink-50">One link to share everything you create, curate and sell. Join the community of creators on Linkingo.</p>
                </div>
                {/* Decorative Circles */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/20 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/20 rounded-full"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
}
