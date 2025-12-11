"use client";

import { LinkItem } from "@/lib/links";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingBag, Upload, Lock } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

interface CommerceDialogProps {
    link: LinkItem;
    onUpdate: (id: string, data: Partial<LinkItem>) => void;
}

export function CommerceDialog({ link, onUpdate }: CommerceDialogProps) {
    const [open, setOpen] = useState(false);

    const [isLocked, setIsLocked] = useState(link.commerce?.isLocked || false);
    const [price, setPrice] = useState(link.commerce?.price?.toString() || "");
    const [fileUrl, setFileUrl] = useState(link.commerce?.fileUrl || "");

    const handleSave = () => {
        onUpdate(link.id, {
            commerce: {
                isLocked,
                price: parseFloat(price) || 0,
                currency: "INR",
                fileUrl,
                buttonText: `Buy for ₹${price}`
            }
        });
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-green-500">
                    <ShoppingBag className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Digital Product Vault</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 pt-4">

                    <div className="space-y-4 border p-4 rounded-lg bg-green-500/10 border-green-500/20">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Lock className="h-4 w-4 text-green-600" />
                                <span className="font-medium text-green-800">Lock Link & Moneterize</span>
                            </div>
                            <Switch checked={isLocked} onCheckedChange={setIsLocked} />
                        </div>

                        {isLocked && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                                <div className="space-y-2">
                                    <Label>Price (INR)</Label>
                                    <Input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="99"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Digital File URL</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            value={fileUrl}
                                            onChange={(e) => setFileUrl(e.target.value)}
                                            placeholder="https://..."
                                        />
                                        <Button variant="outline" size="icon">
                                            <Upload className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <p className="text-[10px] text-zinc-500">
                                        Enter the direct download link. This will be hidden until payment is successful.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <Button onClick={handleSave} className="w-full bg-green-600 hover:bg-green-700 text-white">
                        Save Product
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
