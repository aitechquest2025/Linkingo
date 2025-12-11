"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Chrome, ArrowRight, Loader2, Github } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
    const { signInWithGoogle, signInWithGithub } = useAuth();
    const [isLoading, setIsLoading] = useState<string | null>(null);

    const handleGoogleLogin = async () => {
        setIsLoading("google");
        await signInWithGoogle();
        setIsLoading(null);
    };

    const handleGithubLogin = async () => {
        setIsLoading("github");
        await signInWithGithub();
        setIsLoading(null);
    };

    return (
        <Card className="border-none shadow-2xl bg-white/10 backdrop-blur-xl">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                    Create an account
                </CardTitle>
                <CardDescription className="text-gray-300">
                    Start your journey with Linkingo
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
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
                    <Button
                        variant="glass"
                        onClick={handleGithubLogin}
                        disabled={!!isLoading}
                        className="w-full hover:scale-105 transition-transform"
                    >
                        {isLoading === "github" ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Github className="mr-2 h-4 w-4" />
                        )}
                        Github
                    </Button>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/20" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-transparent px-2 text-gray-400">
                            Or continue with email
                        </span>
                    </div>
                </div>
                <div className="grid gap-2">
                    <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-pink-500"
                    />
                </div>
                <div className="grid gap-2">
                    <Input
                        id="password"
                        type="password"
                        placeholder="Create a password"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-pink-500"
                    />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Button className="w-full bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-700 hover:to-violet-700 text-white shadow-lg shadow-pink-500/25">
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <div className="text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link href="/login" className="underline hover:text-white transition-colors">
                        Login
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
