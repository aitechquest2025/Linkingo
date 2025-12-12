"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Trash2, ExternalLink, Lock, Crown, GripVertical } from "lucide-react";

interface Link {
    id: string;
    title: string;
    url: string;
    active: boolean;
}

export function LinkManager() {
    const [links, setLinks] = useState<Link[]>([
        { id: "1", title: "My Portfolio", url: "https://portfolio.com", active: true },
        { id: "2", title: "Instagram", url: "https://instagram.com/user", active: true },
    ]);
    const [newTitle, setNewTitle] = useState("");
    const [newUrl, setNewUrl] = useState("");

    // TODO: Fetch this from actual subscription hook
    const isPremium = false;
    const LINK_LIMIT = 5;

    const canAddLink = isPremium || links.length < LINK_LIMIT;

    const handleAddLink = () => {
        if (!canAddLink) {
            alert("Upgrade to Premium to add more links!");
            return;
        }
        if (newTitle && newUrl) {
            setLinks([...links, { id: Date.now().toString(), title: newTitle, url: newUrl, active: true }]);
            setNewTitle("");
            setNewUrl("");
        }
    };

    const deleteLink = (id: string) => {
        setLinks(links.filter(l => l.id !== id));
    };

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
                            {isPremium ? "∞" : LINK_LIMIT - links.length}
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-gray-200 bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600">Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-semibold text-black flex items-center gap-2">
                            {isPremium ? (
                                <>
                                    <Crown className="h-5 w-5 text-amber-500" />
                                    Premium
                                </>
                            ) : (
                                "Free"
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
                        {isPremium ? "Unlimited links available" : `${links.length} / ${LINK_LIMIT} links used`}
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
                            <Button onClick={handleAddLink} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Link
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
