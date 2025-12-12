export function Footer() {
    return (
        <footer className="py-8 bg-black border-t border-zinc-900">
            <div className="container mx-auto px-4 text-center">
                <p className="text-zinc-500 text-sm">
                    &copy; {new Date().getFullYear()} Linkingo. Built for India 🇮🇳 with ❤️
                </p>
            </div>
        </footer>
    );
}
