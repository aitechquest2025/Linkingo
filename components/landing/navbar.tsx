import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl supports-[backdrop-filter]:bg-black/20">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 group">
                    <div className="size-9 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-shadow">
                        <span className="font-bold text-white text-xl">L</span>
                    </div>
                    <span className="font-bold text-xl text-white tracking-tight">Linkingo</span>
                </Link>
                <div className="flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-white/5 font-medium">
                            Login
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button className="bg-white text-black hover:bg-zinc-200 font-semibold rounded-full px-6">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
