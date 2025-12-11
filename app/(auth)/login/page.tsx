"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Github, Chrome, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
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
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                    Welcome back
                </CardTitle>
                <CardDescription className="text-gray-300">
                    Enter your email to sign in to your account
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-6">
                    <Button
                        variant="glass"
                        onClick={handleGoogleLogin}
                        disabled={!!isLoading}
                        className="hover:scale-105 transition-transform"
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
                        className="hover:scale-105 transition-transform"
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
                            Or continue with
                        </span>
                    </div>
                </div>
                <div className="grid gap-2">
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-violet-500"
                    />
                </div>
                <div className="grid gap-2">
                    <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-violet-500"
                    />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-lg shadow-blue-500/25">
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <div className="text-center text-sm text-gray-400">
                    Don't have an account?{" "}
                    <Link href="/register" className="underline hover:text-white transition-colors">
                        Sign up
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
