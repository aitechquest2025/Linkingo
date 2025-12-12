"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { doc, getDoc, collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, Copy } from "lucide-react";

export default function SuperAdminMarketingPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [promoCodes, setPromoCodes] = useState<any[]>([]);
    const [newCode, setNewCode] = useState({ code: "", discount: "20", maxUses: "100" });

    useEffect(() => {
        checkSuperAdmin();
    }, [user]);

    const checkSuperAdmin = async () => {
        if (!user) {
            router.push("/login");
            return;
        }

        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (!userDoc.exists() || userDoc.data().role !== "superadmin") {
            router.push("/dashboard");
            return;
        }

        loadPromoCodes();
    };

    const loadPromoCodes = async () => {
        setLoading(true);
        try {
            const snapshot = await getDocs(collection(db, "promoCodes"));
            setPromoCodes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
            console.error("Error loading promo codes:", error);
        } finally {
            setLoading(false);
        }
    };

    const generateCode = async () => {
        try {
            await addDoc(collection(db, "promoCodes"), {
                code: newCode.code.toUpperCase(),
                discount: parseFloat(newCode.discount),
                maxUses: parseInt(newCode.maxUses),
                uses: 0,
                active: true
            });

            setNewCode({ code: "", discount: "20", maxUses: "100" });
            loadPromoCodes();
            alert("Promo code created!");
        } catch (error) {
            console.error("Error creating promo code:", error);
            alert("Failed to create promo code");
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-black mb-2">Marketing Tools</h1>
                <p className="text-zinc-600">Manage promo codes and campaigns</p>
            </div>

            {/* Create Promo Code */}
            <Card className="border-zinc-200 bg-white">
                <CardHeader>
                    <CardTitle className="text-black">Generate Promo Code</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-4">
                        <Input
                            value={newCode.code}
                            onChange={(e) => setNewCode({ ...newCode, code: e.target.value })}
                            placeholder="CODE"
                            className="uppercase"
                        />
                        <Input
                            type="number"
                            value={newCode.discount}
                            onChange={(e) => setNewCode({ ...newCode, discount: e.target.value })}
                            placeholder="Discount %"
                        />
                        <Input
                            type="number"
                            value={newCode.maxUses}
                            onChange={(e) => setNewCode({ ...newCode, maxUses: e.target.value })}
                            placeholder="Max Uses"
                        />
                        <Button onClick={generateCode} className="bg-violet-600 hover:bg-violet-700 text-white">
                            <Plus className="mr-2 h-4 w-4" />
                            Create
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Promo Codes List */}
            <Card className="border-zinc-200 bg-white">
                <CardHeader>
                    <CardTitle className="text-black">Active Promo Codes</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {promoCodes.map(code => (
                                <div key={code.id} className="flex items-center justify-between p-4 border border-zinc-200 rounded-lg">
                                    <div>
                                        <p className="font-bold text-black text-lg">{code.code}</p>
                                        <p className="text-sm text-zinc-500">{code.discount}% off - {code.uses}/{code.maxUses} uses</p>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                            navigator.clipboard.writeText(code.code);
                                            alert("Copied!");
                                        }}
                                    >
                                        <Copy className="h-4 w-4" />
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
