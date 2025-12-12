"use client";

import { motion } from "framer-motion";
import { UserPlus, Palette, Share2, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
    {
        icon: UserPlus,
        title: "1. Claim your link",
        description: "Sign up and secure your unique linkingo.in/username before someone else does.",
        color: "from-blue-500 to-cyan-500",
    },
    {
        icon: Palette,
        title: "2. Customize your page",
        description: "Add your links, social profiles, and style it to match your vibe in seconds.",
        color: "from-purple-500 to-pink-500",
    },
    {
        icon: Share2,
        title: "3. Share everywhere",
        description: "Add your unique link to your Instagram, Twitter, and TikTok bios to connect your audience.",
        color: "from-amber-500 to-orange-500",
    },
];

export function HowItWorks() {
    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-900/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4"
                    >
                        How it works
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-zinc-400 text-lg max-w-2xl mx-auto"
                    >
                        Create your professional bio link in three simple steps. No coding required.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-orange-500/50 -z-10" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm hover:border-zinc-700 transition-colors">
                                <CardContent className="p-8 flex flex-col items-center text-center">
                                    <div className={`size-16 rounded-2xl bg-gradient-to-br ${step.color} p-0.5 mb-6 shadow-lg`}>
                                        <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center">
                                            <step.icon className="size-8 text-white" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                    <p className="text-zinc-400 leading-relaxed">
                                        {step.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
