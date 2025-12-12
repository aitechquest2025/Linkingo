"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserProfile {
    username: string;
    displayName: string;
    bio: string;
    photoURL: string;
    coverURL: string;
    socialLinks: {
        twitter?: string;
        instagram?: string;
        youtube?: string;
        tiktok?: string;
        linkedin?: string;
        telegram?: string;
        facebook?: string;
        github?: string;
    };
    theme: {
        colorTheme: string;
        buttonStyle: string;
        fontFamily: string;
        backgroundType?: string;
        customColor?: string;
        gradientStart?: string;
        gradientEnd?: string;
        backgroundImage?: string;
    };
}

interface Link {
    id: string;
    title: string;
    url: string;
    order: number;
    active: boolean;
}

export default function PublicProfilePage() {
    const params = useParams();
    const username = params.username as string;

    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [links, setLinks] = useState<Link[]>([]);
    const [userId, setUserId] = useState<string>("");

    useEffect(() => {
        loadProfile();
    }, [username]);

    const loadProfile = async () => {
        try {
            // Find user by username
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("username", "==", username));
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                setProfile(null);
                setLoading(false);
                return;
            }

            const userData = snapshot.docs[0].data() as UserProfile;
            const userDocId = snapshot.docs[0].id;
            setProfile(userData);
            setUserId(userDocId);

            // Track page view
            trackPageView(userDocId);

            // Load user's links
            const linksRef = collection(db, "links");
            const linksQuery = query(linksRef, where("userId", "==", userDocId), where("active", "==", true));
            const linksSnapshot = await getDocs(linksQuery);

            const userLinks = linksSnapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() } as Link))
                .sort((a, b) => a.order - b.order);

            setLinks(userLinks);
        } catch (error) {
            console.error("Error loading profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const trackPageView = async (userId: string) => {
        try {
            await fetch("/api/track", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId,
                    type: "view",
                    metadata: {
                        referrer: document.referrer,
                        userAgent: navigator.userAgent
                    }
                })
            });
        } catch (error) {
            console.error("Error tracking page view:", error);
        }
    };

    const trackLinkClick = async (userId: string, linkId: string) => {
        try {
            await fetch("/api/track", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId,
                    linkId,
                    type: "click"
                })
            });
        } catch (error) {
            console.error("Error tracking click:", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50">
                <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-black mb-2">404</h1>
                    <p className="text-zinc-600">User not found</p>
                </div>
            </div>
        );
    }

    // Theme configuration
    const getBackgroundStyle = () => {
        const { theme } = profile;
        if (theme.backgroundType === "gradient") {
            return {
                background: `linear-gradient(135deg, ${theme.gradientStart || '#8b5cf6'}, ${theme.gradientEnd || '#ec4899'})`
            };
        }
        if (theme.backgroundType === "image" && theme.backgroundImage) {
            return {
                backgroundImage: `url(${theme.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            };
        }
        return {
            backgroundColor: theme.customColor || '#ffffff'
        };
    };

    const getButtonStyle = () => {
        switch (profile.theme.buttonStyle) {
            case "rounded": return "rounded-full";
            case "square": return "rounded-md";
            case "pill": return "rounded-3xl";
            default: return "rounded-full";
        }
    };

    return (
        <div
            className="min-h-screen py-12 px-4"
            style={getBackgroundStyle()}
        >
            <div className="max-w-2xl mx-auto">
                {/* Profile Section */}
                <div className="text-center mb-8">
                    {/* Profile Image */}
                    {profile.photoURL ? (
                        <img
                            src={profile.photoURL}
                            alt={profile.displayName}
                            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-lg object-cover"
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                            {profile.displayName?.charAt(0) || profile.username?.charAt(0) || "?"}
                        </div>
                    )}

                    {/* Name & Bio */}
                    <h1 className="text-3xl font-bold text-black mb-2">
                        {profile.displayName || `@${profile.username}`}
                    </h1>
                    {profile.bio && (
                        <p className="text-zinc-700 mb-4 max-w-md mx-auto">
                            {profile.bio}
                        </p>
                    )}
                </div>

                {/* Links */}
                <div className="space-y-4 mb-8">
                    {links.length > 0 ? (
                        links.map((link) => (
                            <a
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackLinkClick(userId, link.id)}
                                className={`block w-full bg-white hover:bg-zinc-50 border-2 border-zinc-200 hover:border-violet-500 transition-all ${getButtonStyle()} p-4 text-center font-medium text-black shadow-sm hover:shadow-md group`}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <span>{link.title}</span>
                                    <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </a>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-zinc-500">No links yet</p>
                        </div>
                    )}
                </div>

                {/* Social Links */}
                {profile.socialLinks && Object.values(profile.socialLinks).some(link => link) && (
                    <div className="flex justify-center gap-4 flex-wrap">
                        {profile.socialLinks.twitter && (
                            <a href={`https://twitter.com/${profile.socialLinks.twitter}`} target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-black">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path></svg>
                            </a>
                        )}
                        {profile.socialLinks.instagram && (
                            <a href={`https://instagram.com/${profile.socialLinks.instagram}`} target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-black">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            </a>
                        )}
                        {profile.socialLinks.youtube && (
                            <a href={`https://youtube.com/@${profile.socialLinks.youtube}`} target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-black">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                            </a>
                        )}
                        {profile.socialLinks.github && (
                            <a href={`https://github.com/${profile.socialLinks.github}`} target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-black">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            </a>
                        )}
                    </div>
                )}

                {/* Powered by Linkingo */}
                <div className="text-center mt-12">
                    <a href="/" className="text-sm text-zinc-500 hover:text-zinc-700 flex items-center justify-center gap-1">
                        Powered by <span className="font-semibold">Linkingo</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
