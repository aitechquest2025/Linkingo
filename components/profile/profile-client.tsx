"use client";

import { LinkItem } from "@/lib/links";
import { UserProfile } from "@/lib/server/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

// In the future, this will handle themes dynamically
export default function ProfileClient({
    profile,
    links,
}: {
    profile: UserProfile;
    links: LinkItem[];
}) {
    return (
        <div className="min-h-screen w-full bg-mesh p-4 flex flex-col items-center">
            <div className="w-full max-w-md space-y-8 pt-12 animate-in fade-in zoom-in duration-500">

                {/* Header Section */}
                <div className="text-center space-y-4">
                    <Avatar className="h-24 w-24 mx-auto border-4 border-white/20 shadow-xl">
                        <AvatarImage src={profile.photoURL} alt={profile.username} />
                        <AvatarFallback className="text-2xl font-bold bg-white/10 text-white backdrop-blur-md">
                            {profile.displayName?.[0] || profile.username[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-white drop-shadow-md">
                            {profile.displayName || `@${profile.username}`}
                        </h1>
                        {profile.bio && (
                            <p className="text-white/80 text-sm max-w-[280px] mx-auto">
                                {profile.bio}
                            </p>
                        )}
                    </div>
                </div>

                {/* Links Section */}
                <div className="space-y-4">
                    {links.map((link) => {
                        const isLocked = link.commerce?.isLocked;

                        // Mock Unlock Logic (In real app, this would be a payment gateway callback)
                        const handleUnlock = (e: React.MouseEvent) => {
                            if (isLocked) {
                                e.preventDefault();
                                if (confirm(`Pay ₹${link.commerce?.price} to unlock?`)) {
                                    alert("Payment Successful! (Mock)\nDownloading file...");
                                    if (link.commerce?.fileUrl) window.open(link.commerce!.fileUrl, "_blank");
                                }
                            }
                        };

                        return (
                            <a
                                key={link.id}
                                href={isLocked ? "#" : link.url}
                                onClick={handleUnlock}
                                target={isLocked ? "_self" : "_blank"}
                                rel="noopener noreferrer"
                                className="block group"
                            >
                                <Card className={cn(
                                    "p-4 flex items-center justify-between transition-all duration-300",
                                    isLocked ? "bg-green-500/10 border-green-500/30" : "bg-white/10 backdrop-blur-md border-white/20",
                                    "text-white",
                                    "hover:scale-[1.02] hover:bg-white/20 hover:shadow-lg hover:shadow-white/5",
                                    "active:scale-95"
                                )}>
                                    <span className="font-medium text-center w-full relative flex items-center justify-center gap-2">
                                        {isLocked && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>} {/* Simplified lock icon since we don't import generic icon */}
                                        {isLocked ? (link.commerce?.buttonText || "Buy Now") : link.title}
                                        {isLocked ? null : <ExternalLink className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 opacity-0 group-hover:opacity-50 transition-opacity" />}
                                    </span>
                                </Card>
                            </a>
                        )
                    })}
                    {links.length === 0 && (
                        <div className="text-center text-white/50 py-8">
                            <p>No links yet.</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <footer className="text-center pt-8">
                    <a href="/" className="text-xs font-semibold text-white/40 hover:text-white/80 transition-colors uppercase tracking-widest">
                        Linkingo
                    </a>
                </footer>
            </div>
        </div>
    );
}
