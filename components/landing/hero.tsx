"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-black">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center justify-center px-4 py-1.5 mb-8 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-sm"
                    >
                        <Sparkles className="w-4 h-4 text-violet-400 mr-2" />
                        <span className="text-sm font-medium text-violet-300">🎉 Save 40% on Yearly Plans - Limited Time!</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 leading-tight"
                    >
                        Your Digital Identity, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-400 animate-gradient-x">
                            Supercharged.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed"
                    >
                        Linkingo helps creators and influencers share everything they create, and launch subscriptions for their exclusive content with zero friction.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link href="/register">
                            <Button size="lg" className="h-14 px-8 text-base bg-white text-black hover:bg-zinc-200 rounded-full font-semibold transition-all hover:scale-105">
                                Claim your link
                                <ArrowRight className="ml-2 size-4" />
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button size="lg" variant="outline" className="h-14 px-8 text-base border-zinc-800 text-zinc-300 hover:bg-white/5 hover:text-white rounded-full bg-transparent transition-all hover:border-zinc-700">
                                View Demo
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Background Gradients */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-violet-600/20 blur-[120px] rounded-full pointer-events-none -z-10"
            />
            <div className="absolute top-0 right-0 w-1/2 h-[600px] bg-fuchsia-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />
        </section>
    );
}

