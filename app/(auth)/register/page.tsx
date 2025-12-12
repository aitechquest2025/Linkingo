"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
        } catch (error) {
            alert("Registration failed. Email might be in use.");
        } finally {
            setIsLoading(null);
        }
    };

    return (
        <Card className="border-none shadow-2xl bg-white/10 backdrop-blur-xl w-full max-w-md mx-auto">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                    Create an account
                </CardTitle>
                <CardDescription className="text-gray-300">
                    Start your journey with Linkingo
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-pink-500"
                    />
                </div>
                <div className="grid gap-2">
                    <Input
                        id="password"
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-pink-500"
                    />
                </div>

                <Recaptcha onChange={setRecaptchaToken} />

                <Button
                    onClick={handleEmailRegister}
                    disabled={!!isLoading || !email || !password || !recaptchaToken}
                    className="w-full bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-700 hover:to-violet-700 text-white shadow-lg shadow-pink-500/25"
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
                    Already have an account?{" "}
                    <Link href="/login" className="underline hover:text-white transition-colors">
                        Login
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
