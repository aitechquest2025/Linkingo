"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link as LinkIcon, Copy, Loader2, Crown, ExternalLink, BarChart3 } from "lucide-react";
import { doc, getDoc, collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

interface ShortLink {
    id: string;
    code: string;
    originalUrl: string;
    clicks: number;
    createdAt: any;
}

export default function ShortenerPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isPremium, setIsPremium] = useState(false);
    const [creating, setCreating] = useState(false);
    const [url, setUrl] = useState("");
    const [shortLinks, setShortLinks] = useState<ShortLink[]>([]);

    useEffect(() => {
        checkPremiumAccess();
    }, [user]);

    const checkPremiumAccess = async () => {
        if (!user) {
            router.push("/login");
            return;
        }

        setLoading(true);
        try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                const premium = userData.subscriptionStatus === "premium";
                setIsPremium(premium);

                if (!premium) {
                    router.push("/dashboard/upgrade");
                } else {
                    loadShortLinks();
                }
            }
        } catch (error) {
            console.error("Error checking premium access:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadShortLinks = async () => {
        if (!user) return;
        try {
            const q = query(collection(db, "shortLinks"), where("userId", "==", user.uid));
            const snapshot = await getDocs(q);
            const links = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as ShortLink[];
            setShortLinks(links.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds));
        } catch (error) {
            console.error("Error loading short links:", error);
        }
    };

    const generateCode = () => {
        return Math.random().toString(36).substring(2, 8);
    };

    const createShortLink = async () => {
        if (!user || !url) return;

        setCreating(true);
        try {
            const code = generateCode();
            await addDoc(collection(db, "shortLinks"), {
                code,
                originalUrl: url,
                userId: user.uid,
                clicks: 0,
                createdAt: serverTimestamp()
            });

            setUrl("");
            loadShortLinks();
            alert("Short link created successfully!");
        } catch (error) {
            console.error("Error creating short link:", error);
            alert("Failed to create short link");
        } finally {
            setCreating(false);
        }
    };

    const copyToClipboard = (code: string) => {
        navigator.clipboard.writeText(`https://linkingo.in/s/${code}`);
        alert("Copied to clipboard!");
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
            </div>
        );
    }

    if (!isPremium) {
        return null;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-black mb-2">Link Shortener</h1>
                <p className="text-zinc-600">Create short, trackable links</p>
            </div>

            {/* Create Short Link */}
            <Card className="border-gray-200 bg-white">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <LinkIcon className="h-5 w-5 text-purple-600" />
                        <CardTitle className="text-black">Create Short Link</CardTitle>
                        <Crown className="h-4 w-4 text-amber-500" />
                    </div>
                    <CardDescription>Shorten any URL and track clicks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <Input
                            placeholder="https://example.com/very-long-url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="bg-white border-zinc-300"
                        />
                        <Button
                            onClick={createShortLink}
                            disabled={creating || !url}
                            className="bg-violet-600 hover:bg-violet-700 text-white"
                        >
                            {creating ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                "Shorten"
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Short Links List */}
            <Card className="border-gray-200 bg-white">
                <CardHeader>
                    <CardTitle className="text-black">Your Short Links</CardTitle>
                    <CardDescription>Manage and track your shortened URLs</CardDescription>
                </CardHeader>
                <CardContent>
                    {shortLinks.length === 0 ? (
                        <p className="text-zinc-500 text-center py-8">No short links yet. Create one above!</p>
                    ) : (
                        <div className="space-y-3">
                            {shortLinks.map((link) => (
                                <div
                                    key={link.id}
                                    className="flex items-center justify-between p-4 bg-zinc-50 rounded-lg border border-zinc-200"
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="font-semibold text-violet-600">
                                                linkingo.in/s/{link.code}
                                            </p>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => copyToClipboard(link.code)}
                                                className="h-6 w-6 p-0"
                                            >
                                                <Copy className="h-3 w-3" />
                                            </Button>
                                        </div>
                                        <p className="text-sm text-zinc-600 truncate">{link.originalUrl}</p>
                                        <div className="flex items-center gap-4 mt-2 text-xs text-zinc-500">
                                            <span className="flex items-center gap-1">
                                                <BarChart3 className="h-3 w-3" />
                                                {link.clicks} clicks
                                            </span>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => window.open(`https://linkingo.in/s/${link.code}`, "_blank")}
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
