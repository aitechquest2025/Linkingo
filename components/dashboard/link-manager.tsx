"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Trash2, ExternalLink, Lock, Crown, GripVertical, Loader2 } from "lucide-react";
import { collection, query, where, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Link {
    id: string;
    title: string;
    url: string;
    active: boolean;
    order: number;
}

export function LinkManager() {
    const { user, userData } = useAuth();
    const [links, setLinks] = useState<Link[]>([]);
    const [newTitle, setNewTitle] = useState("");
    const [newUrl, setNewUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);

    // Check if user has Pro subscription
    const isPremium = userData?.subscription?.status === 'active';
    // Unlimited links for all users now

    useEffect(() => {
        if (user) {
            loadLinks();
        }
    }, [user]);

    const loadLinks = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const q = query(collection(db, "links"), where("userId", "==", user.uid));
            const snapshot = await getDocs(q);
            const userLinks = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() } as Link))
                .sort((a, b) => a.order - b.order);
            setLinks(userLinks);
        } catch (error) {
            console.error("Error loading links:", error);
            alert("Failed to load links");
        } finally {
            setLoading(false);
        }
    };

    // All users can add unlimited links
    const canAddLink = true;

    const handleAddLink = async () => {
        if (!user) return;
        if (!canAddLink) {
            alert("Upgrade to Premium to add more links!");
            return;
        }
        if (!newTitle || !newUrl) {
            alert("Please enter both title and URL");
            return;
        }

        setAdding(true);
        try {
            await addDoc(collection(db, "links"), {
                userId: user.uid,
                title: newTitle,
                url: newUrl,
                active: true,
                order: links.length,
                createdAt: serverTimestamp()
            });
            setNewTitle("");
            setNewUrl("");
            loadLinks(); // Reload links
        } catch (error) {
            console.error("Error adding link:", error);
            alert("Failed to add link. Check console for details.");
        } finally {
            setAdding(false);
        }
    };

    const deleteLink = async (id: string) => {
        if (!confirm("Are you sure you want to delete this link?")) return;
        try {
            await deleteDoc(doc(db, "links", id));
            loadLinks(); // Reload links
        } catch (error) {
            console.error("Error deleting link:", error);
            alert("Failed to delete link");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-gray-200 bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600">Total Links</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-black">{links.length}</div>
                    </CardContent>
                </Card>
                <Card className="border-gray-200 bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600">Links Remaining</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-black">
                            ∞
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-gray-200 bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600">Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-semibold flex items-center gap-2">
                            {isPremium ? (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-bold">
                                    <Crown className="h-4 w-4" />
                                    Pro
                                </span>
                            ) : (
                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-pink-600 text-white text-sm font-bold">
                                    Free
                                </span>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Add New Link */}
            <Card className="border-gray-200 bg-white">
                <CardHeader>
                    <CardTitle className="text-black">Add New Link</CardTitle>
                    <CardDescription>
                        Unlimited links available for all users
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <Input
                                placeholder="Link Title (e.g. My Website)"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                className="bg-white border-zinc-300"
                            />
                            <Input
                                placeholder="URL (https://...)"
                                value={newUrl}
                                onChange={(e) => setNewUrl(e.target.value)}
                                className="bg-white border-zinc-300"
                            />
                        </div>

                        {!canAddLink ? (
                            <div className="space-y-3">
                                <Button disabled className="w-full bg-zinc-200 text-zinc-500 cursor-not-allowed">
                                    <Lock className="mr-2 h-4 w-4" />
                                    Limit Reached
                                </Button>
                                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg text-center">
                                    <Crown className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                                    <p className="text-sm font-medium text-purple-900 mb-1">Upgrade to Pro</p>
                                    <p className="text-xs text-purple-700">Get unlimited links and advanced features</p>
                                </div>
                            </div>
                        ) : (
                            <Button
                                onClick={handleAddLink}
                                disabled={adding}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                            >
                                {adding ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Adding...
                                    </>
                                ) : (
                                    <>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Link
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Links List */}
            <Card className="border-gray-200 bg-white">
                <CardHeader>
                    <CardTitle className="text-black">Your Links</CardTitle>
                    <CardDescription>Manage and organize your links</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {links.length > 0 ? (
                            links.map((link) => (
                                <div key={link.id} className="flex items-center gap-3 p-4 border border-zinc-200 rounded-lg hover:border-purple-300 hover:bg-purple-50/50 transition-all group">
                                    <GripVertical className="h-5 w-5 text-zinc-400 cursor-move" />
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="p-2 bg-purple-100 rounded-lg">
                                            <ExternalLink className="h-5 w-5 text-purple-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-black">{link.title}</h3>
                                            <p className="text-sm text-zinc-500 truncate">{link.url}</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => deleteLink(link.id)}
                                        className="text-zinc-400 hover:text-red-600 hover:bg-red-50"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <ExternalLink className="h-12 w-12 text-zinc-300 mx-auto mb-3" />
                                <p className="text-zinc-500">No links yet. Add your first link above!</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
