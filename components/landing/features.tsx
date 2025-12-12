"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Link2, IndianRupee, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        title: "One Link for Everything",
        description: "Combine all your social profiles, content, videos and links into a single, beautiful landing page.",
        icon: Link2,
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        title: "Monetize with Subscriptions",
        description: "Easily launch premium content subscriptions. Users pay via UPI to unlock your exclusive world.",
        icon: IndianRupee,
        gradient: "from-violet-500 to-fuchsia-500",
    },
    {
        title: "Deep Analytics",
        description: "Track your clicks, views, and revenue sources with privacy-friendly analytics to grow faster.",
        icon: BarChart3,
        gradient: "from-amber-500 to-orange-500",
    },
];

export function Features() {
    return (
        <section className="py-24 bg-zinc-950">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4"
                    >
                        Everything you need to grow
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-zinc-400 max-w-2xl mx-auto"
                    >
                        Powerful tools designed for Indian creators, built to help you scale your audience and income.
                    </motion.p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.2 }}
                        >
                            <Card className="bg-zinc-900 border-zinc-800 border overflow-hidden group hover:border-violet-500/50 transition-colors h-full">
                                <CardContent className="p-8">
                                    <div className={`size-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                                        <feature.icon className="text-white size-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                    <p className="text-zinc-400 leading-relaxed">
                                        {feature.description}
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
