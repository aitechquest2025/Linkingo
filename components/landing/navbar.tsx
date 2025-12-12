import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="size-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center">
                        <span className="font-bold text-white text-lg">L</span>
                    </div>
                    <span className="font-bold text-xl text-white">Linkingo</span>
                </Link>
                <div className="flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost" className="text-zinc-300 hover:text-white hover:bg-white/10">
                            Login
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button className="bg-white text-black hover:bg-zinc-200">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
