import Link from "next/link";

export function Footer() {
    return (
        <footer className="py-8 bg-black border-t border-zinc-900">
            <div className="container mx-auto px-4 text-center grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <p className="text-zinc-500 text-sm">
                        &copy; {new Date().getFullYear()} Linkingo. Built for India 🇮🇳 with ❤️
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold text-white mb-4">Legal</h4>
                    <ul className="space-y-2">
                        <li><Link href="/privacy" className="text-zinc-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="text-zinc-400 hover:text-white transition-colors">Terms of Service</Link></li>
                        <li><Link href="/contact" className="text-zinc-400 hover:text-white transition-colors">Contact Us</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
