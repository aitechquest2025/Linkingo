import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center px-4 py-1.5 mb-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                        <span className="text-sm font-medium text-blue-400">New: UPI Payments Support 🇮🇳</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8">
                        Your Digital Identity, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            Unified in One Link.
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Linkingo helps creators, influencers, and businesses share everything they create, curate, and sell in one simple link.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/register">
                            <Button size="lg" className="h-12 px-8 text-base bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                                Claim your link
                                <ArrowRight className="ml-2 size-4" />
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button size="lg" variant="outline" className="h-12 px-8 text-base border-white/20 text-white hover:bg-white/10 rounded-full bg-transparent">
                                View Demo
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="absolute top-0 right-0 w-1/2 h-[600px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />
        </section>
    );
}
