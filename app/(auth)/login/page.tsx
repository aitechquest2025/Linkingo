"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Chrome, Loader2, Phone, Mail, KeyRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Recaptcha } from "@/components/auth/recaptcha";
import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
    const { signInWithGoogle, loginWithEmail, loginWithPhone, verifyPhoneOtp, resetPassword } = useAuth();
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const [authMethod, setAuthMethod] = useState<"email" | "phone">("email");
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

    // Email State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Phone State
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [confirmationResult, setConfirmationResult] = useState<any>(null);

    // Reset Password State
    const [resetEmail, setResetEmail] = useState("");
    const [resetSent, setResetSent] = useState(false);

    const handleGoogleLogin = async () => {
        setIsLoading("google");
        try {
            await signInWithGoogle();
        } finally {
            setIsLoading(null);
        }
    };

    const handleEmailLogin = async () => {
        if (!email || !password) return;
        if (!recaptchaToken) {
            alert("Please complete the captcha");
            return;
        }
        setIsLoading("email");
        try {
            await loginWithEmail(email, password);
        } catch (error: any) {
            const message = error.code === 'auth/invalid-credential'
                ? "Invalid email or password."
                : error.message;
            alert(message);
        } finally {
            setIsLoading(null);
        }
    };

    const handleSendOtp = async () => {
        if (!phoneNumber) return;
        if (!recaptchaToken) {
            alert("Please complete the captcha");
            return;
        }
        setIsLoading("phone_send");
        try {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
                'size': 'invisible',
            });

            const appVerifier = window.recaptchaVerifier;
            const result = await loginWithPhone(phoneNumber, appVerifier);
            setConfirmationResult(result);
        } catch (error: any) {
            console.error(error);
            alert(`Failed to send OTP: ${error.message}`);
        } finally {
            setIsLoading(null);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp || !confirmationResult) return;
        setIsLoading("phone_verify");
        try {
            await verifyPhoneOtp(confirmationResult, otp);
        } catch (error) {
            alert("Invalid OTP");
        } finally {
            setIsLoading(null);
        }
    };

    const handleResetPassword = async () => {
        if (!resetEmail) return;
        try {
            await resetPassword(resetEmail);
            setResetSent(true);
        } catch (error) {
            alert("Failed to send reset email.");
        }
    };

    return (
        <div className="w-full h-screen grid lg:grid-cols-2">
            {/* Left Side - Form */}
            <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 bg-white dark:bg-black">
                <div className="w-full max-w-sm mx-auto space-y-8">
                    <div className="space-y-2 text-center lg:text-left">
                        <Link href="/" className="inline-block mb-8">
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Linkingo</span>
                        </Link>
                        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Welcome back</h1>
                        <p className="text-zinc-500 dark:text-zinc-400">Enter your details to access your account.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-2 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg">
                            <Button
                                variant={authMethod === "email" ? "default" : "ghost"}
                                onClick={() => setAuthMethod("email")}
                                className={`w-full ${authMethod === 'email' ? 'shadow-sm' : ''}`}
                            >
                                <Mail className="w-4 h-4 mr-2" /> Email
                            </Button>
                            <Button
                                variant={authMethod === "phone" ? "default" : "ghost"}
                                onClick={() => setAuthMethod("phone")}
                                className={`w-full ${authMethod === 'phone' ? 'shadow-sm' : ''}`}
                            >
                                <Phone className="w-4 h-4 mr-2" /> Phone
                            </Button>
                        </div>

                        {authMethod === "email" && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Input
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="h-12 bg-transparent border-zinc-200 dark:border-zinc-800 text-black dark:text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="h-12 bg-transparent border-zinc-200 dark:border-zinc-800 text-black dark:text-white"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="link" className="px-0 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 text-sm">
                                                Forgot password?
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Reset Password</DialogTitle>
                                                <DialogDescription>
                                                    Enter your email address to receive a reset link.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <Input
                                                    id="reset-email"
                                                    placeholder="name@example.com"
                                                    value={resetEmail}
                                                    onChange={(e) => setResetEmail(e.target.value)}
                                                />
                                                {resetSent && <p className="text-green-600 text-sm">Reset link sent!</p>}
                                            </div>
                                            <Button onClick={handleResetPassword} disabled={resetSent}>
                                                Send Reset Link
                                            </Button>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        )}

                        {authMethod === "phone" && (
                            <div className="space-y-4">
                                {!confirmationResult ? (
                                    <div className="space-y-2">
                                        <Input
                                            type="tel"
                                            placeholder="+91 98765 43210"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            className="h-12 bg-transparent border-zinc-200 dark:border-zinc-800 text-black dark:text-white"
                                        />
                                        <p className="text-xs text-zinc-500">Include country code (e.g. +91)</p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <Input
                                            type="text"
                                            placeholder="Enter 6-digit OTP"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            className="h-12 bg-transparent border-zinc-200 dark:border-zinc-800 text-black dark:text-white"
                                        />
                                    </div>
                                )}
                                <div id="sign-in-button"></div>
                            </div>
                        )}

                        <div className="flex justify-center">
                            <Recaptcha onChange={setRecaptchaToken} />
                        </div>

                        {authMethod === "email" ? (
                            <Button
                                onClick={handleEmailLogin}
                                disabled={!!isLoading || !email || !password || !recaptchaToken}
                                className="w-full h-12 bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
                            >
                                {isLoading === "email" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <KeyRound className="mr-2 h-4 w-4" />}
                                Sign In
                            </Button>
                        ) : (
                            <Button
                                onClick={confirmationResult ? handleVerifyOtp : handleSendOtp}
                                disabled={!!isLoading || !phoneNumber || (confirmationResult && !otp) || (!confirmationResult && !recaptchaToken)}
                                className="w-full h-12 bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
                            >
                                {isLoading === "phone_send" || isLoading === "phone_verify" ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Phone className="mr-2 h-4 w-4" />
                                )}
                                {confirmationResult ? "Verify OTP" : "Send OTP"}
                            </Button>
                        )}

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
                            Don't have an account?{" "}
                            <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-500 underline">
                                Sign up for free
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Visual */}
            <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-violet-600 to-indigo-700 text-white p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
                <div className="relative z-10 max-w-lg text-center space-y-6">
                    <h2 className="text-4xl font-bold leading-tight">Your entire digital world, in one link.</h2>
                    <p className="text-lg text-indigo-100">Join thousands of creators using Linkingo to share everything they create, curate and sell.</p>
                </div>
                {/* Decorative Circles */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
}

declare global {
    interface Window {
        recaptchaVerifier: any;
    }
}
