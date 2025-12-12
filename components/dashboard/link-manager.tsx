"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Trash2, ExternalLink, Lock } from "lucide-react";

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
        <div className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800 text-white">
                <CardHeader>
                    <CardTitle>Add New Link</CardTitle>
                    <CardDescription className="text-zinc-400">
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
                                className="bg-black/50 border-zinc-800 text-white"
                            />
                            <Input
                                placeholder="URL (https://...)"
                                value={newUrl}
                                onChange={(e) => setNewUrl(e.target.value)}
                                className="bg-black/50 border-zinc-800 text-white"
                            />
                        </div>

                        {!canAddLink ? (
                            <Button disabled className="w-full bg-zinc-800 text-zinc-400 cursor-not-allowed">
                                <Lock className="mr-2 h-4 w-4" />
                                Limit Reached (Upgrade to Add More)
                            </Button>
                        ) : (
                            <Button onClick={handleAddLink} className="w-full bg-white text-black hover:bg-zinc-200">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Link
                            </Button>
                        )}

                        {!isPremium && links.length >= LINK_LIMIT && (
                            <div className="p-3 bg-violet-500/10 border border-violet-500/20 rounded-md text-sm text-violet-300 text-center">
                                🚀 Unlock unlimited links with <strong>Linkingo Pro</strong>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-4">
                {links.map((link) => (
                    <Card key={link.id} className="bg-zinc-900/50 border-zinc-800 text-white group hover:border-zinc-700 transition-colors">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-zinc-800 rounded-lg">
                                    <ExternalLink className="h-5 w-5 text-zinc-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">{link.title}</h3>
                                    <p className="text-sm text-zinc-500">{link.url}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => deleteLink(link.id)} className="text-zinc-500 hover:text-red-400 hover:bg-red-400/10">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
