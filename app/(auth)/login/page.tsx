"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Chrome, ArrowRight, Loader2, Phone, Mail, KeyRound } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
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
        } catch (error) {
            alert("Login failed. Please check your credentials.");
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
            // Need a div with ID 'recaptcha-container' for invisible recaptcha if using phone auth specifically, 
            // but we are using v2. For phone auth, let's use the explicit appVerifier with v2 or invisible. 
            // Simplified: Assuming standard v2 for now on the form, but Firebase Phone requires its own verifier usually.
            // For this implementation, let's assume we pass the global recaptcha-container.

            // Note: Firebase Phone Auth typically manages its own ReCAPTCHA unless configured otherwise.
            // We'll create a simplified verifier here attached to the button or hidden div.
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
                'size': 'invisible',
            });

            const appVerifier = window.recaptchaVerifier;
            const result = await loginWithPhone(phoneNumber, appVerifier);
            setConfirmationResult(result);
        } catch (error) {
            console.error(error);
            alert("Failed to send OTP. Ensure phone number includes country code (e.g., +91).");
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
        <Card className="border-none shadow-2xl bg-white/10 backdrop-blur-xl w-full max-w-md mx-auto">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                    Linkingo
                </CardTitle>
                <CardDescription className="text-gray-300">
                    Sign in to manage your digital identity
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex gap-2 justify-center mb-2">
                    <Button
                        variant={authMethod === "email" ? "default" : "secondary"}
                        size="sm"
                        onClick={() => setAuthMethod("email")}
                        className="w-1/2"
                    >
                        <Mail className="w-4 h-4 mr-2" /> Email
                    </Button>
                    <Button
                        variant={authMethod === "phone" ? "default" : "secondary"}
                        size="sm"
                        onClick={() => setAuthMethod("phone")}
                        className="w-1/2"
                    >
                        <Phone className="w-4 h-4 mr-2" /> Phone
                    </Button>
                </div>

                {authMethod === "email" && (
                    <>
                        <div className="grid gap-2">
                            <Input
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-violet-500"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-violet-500"
                            />
                        </div>
                        <div className="flex justify-end">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="link" className="px-0 text-gray-400 hover:text-white text-xs">
                                        Forgot Password?
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] bg-zinc-950 border-zinc-800 text-white">
                                    <DialogHeader>
                                        <DialogTitle>Reset Password</DialogTitle>
                                        <DialogDescription>
                                            Enter your email address and we'll send you a link to reset your password.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <Input
                                            id="reset-email"
                                            placeholder="name@example.com"
                                            value={resetEmail}
                                            onChange={(e) => setResetEmail(e.target.value)}
                                            className="col-span-3 bg-white/5 border-white/10 text-white"
                                        />
                                        {resetSent && <p className="text-green-500 text-sm">Reset link sent!</p>}
                                    </div>
                                    <Button onClick={handleResetPassword} disabled={resetSent}>
                                        Send Reset Link
                                    </Button>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </>
                )}

                {authMethod === "phone" && (
                    <>
                        {!confirmationResult ? (
                            <div className="grid gap-2">
                                <Input
                                    type="tel"
                                    placeholder="+91 98765 43210"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-violet-500"
                                />
                                <p className="text-xs text-gray-400">Include country code (e.g. +91)</p>
                            </div>
                        ) : (
                            <div className="grid gap-2">
                                <Input
                                    type="text"
                                    placeholder="Enter 6-digit OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-violet-500"
                                />
                            </div>
                        )}
                        <div id="sign-in-button"></div>
                    </>
                )}

                <Recaptcha onChange={setRecaptchaToken} />

                {authMethod === "email" ? (
                    <Button
                        onClick={handleEmailLogin}
                        disabled={!!isLoading || !email || !password || !recaptchaToken}
                        className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white"
                    >
                        {isLoading === "email" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <KeyRound className="mr-2 h-4 w-4" />}
                        Sign In
                    </Button>
                ) : (
                    <Button
                        onClick={confirmationResult ? handleVerifyOtp : handleSendOtp}
                        disabled={!!isLoading || !phoneNumber || (confirmationResult && !otp) || (!confirmationResult && !recaptchaToken)}
                        className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white"
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
                        <span className="w-full border-t border-white/20" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-transparent px-2 text-gray-400">
                            Or continue with
                        </span>
                    </div>
                </div>

                <Button
                    variant="glass"
                    onClick={handleGoogleLogin}
                    disabled={!!isLoading}
                    className="w-full hover:scale-105 transition-transform"
                >
                    {isLoading === "google" ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Chrome className="mr-2 h-4 w-4 text-red-500" />
                    )}
                    Google
                </Button>
            </CardContent>
            <CardFooter>
                <div className="text-center text-sm text-gray-400 w-full">
                    Don't have an account?{" "}
                    <Link href="/register" className="underline hover:text-white transition-colors">
                        Sign up
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
declare global {
    interface Window {
        recaptchaVerifier: any;
    }
}
