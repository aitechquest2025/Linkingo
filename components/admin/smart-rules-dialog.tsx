"use client";

import { LinkItem } from "@/lib/links";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Check if Label exists, might need to create
import { Globe, Clock, Settings2 } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

interface SmartRulesProps {
    link: LinkItem;
    onUpdate: (id: string, data: Partial<LinkItem>) => void;
}

export function SmartRulesDialog({ link, onUpdate }: SmartRulesProps) {
    const [open, setOpen] = useState(false);

    // Local state for editing rules before saving
    const [geoEnabled, setGeoEnabled] = useState(link.smartRules?.geo?.enabled || false);
    const [countryCodes, setCountryCodes] = useState(link.smartRules?.geo?.countryCodes?.join(", ") || "");

    const handleSave = () => {
        onUpdate(link.id, {
            smartRules: {
                ...link.smartRules,
                geo: {
                    enabled: geoEnabled,
                    countryCodes: countryCodes.split(",").map(c => c.trim().toUpperCase()).filter(c => c.length === 2),
                }
            }
        });
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                    <Settings2 className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Smart Link Rules</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 pt-4">

                    {/* Geo-Fencing Section */}
                    <div className="space-y-4 border p-4 rounded-lg bg-muted/20">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-blue-500" />
                                <span className="font-medium">Geo-Fencing</span>
                            </div>
                            <Switch checked={geoEnabled} onCheckedChange={setGeoEnabled} />
                        </div>

                        {geoEnabled && (
                            <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                                <label className="text-xs text-muted-foreground">
                                    Allowed Country Codes (comma separated, e.g., IN, US)
                                </label>
                                <Input
                                    value={countryCodes}
                                    onChange={(e) => setCountryCodes(e.target.value)}
                                    placeholder="IN, US, UK"
                                />
                                <p className="text-[10px] text-zinc-500">
                                    Visitors from other countries will NOT see this link.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Scheduling Section (Placeholder for now) */}
                    <div className="space-y-4 border p-4 rounded-lg bg-muted/20 opacity-50 cursor-not-allowed">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-orange-500" />
                                <span className="font-medium">Scheduling (Coming Soon)</span>
                            </div>
                            <Switch disabled />
                        </div>
                    </div>

                    <Button onClick={handleSave} className="w-full">Save Rules</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
