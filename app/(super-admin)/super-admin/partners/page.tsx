"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { doc, getDoc, collection, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Plus, Trash2 } from "lucide-react";

interface Partner {
    id: string;
    name: string;
    email: string;
    commission: number;
    totalReferrals: number;
    totalEarnings: number;
}

export default function SuperAdminPartnersPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [partners, setPartners] = useState<Partner[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [newPartner, setNewPartner] = useState({ name: "", email: "", commission: "20" });

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

        loadPartners();
    };

    const loadPartners = async () => {
        setLoading(true);
        try {
            const snapshot = await getDocs(collection(db, "partners"));
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Partner[];
            setPartners(data);
        } catch (error) {
            console.error("Error loading partners:", error);
        } finally {
            setLoading(false);
        }
    };

    const addPartner = async () => {
        try {
            await addDoc(collection(db, "partners"), {
                name: newPartner.name,
                email: newPartner.email,
                commission: parseFloat(newPartner.commission),
                totalReferrals: 0,
                totalEarnings: 0
            });

            setDialogOpen(false);
            setNewPartner({ name: "", email: "", commission: "20" });
            loadPartners();
            alert("Partner added successfully");
        } catch (error) {
            console.error("Error adding partner:", error);
            alert("Failed to add partner");
        }
    };

    const deletePartner = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            await deleteDoc(doc(db, "partners", id));
            loadPartners();
        } catch (error) {
            console.error("Error deleting partner:", error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-black mb-2">Partner Management</h1>
                    <p className="text-zinc-600">Manage partners and track commissions</p>
                </div>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Partner
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Partner</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block">Name</label>
                                <Input
                                    value={newPartner.name}
                                    onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                                    placeholder="Partner name"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Email</label>
                                <Input
                                    type="email"
                                    value={newPartner.email}
                                    onChange={(e) => setNewPartner({ ...newPartner, email: e.target.value })}
                                    placeholder="partner@example.com"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Commission (%)</label>
                                <Input
                                    type="number"
                                    value={newPartner.commission}
                                    onChange={(e) => setNewPartner({ ...newPartner, commission: e.target.value })}
                                />
                            </div>
                        </div>
                        <Button onClick={addPartner} className="w-full">Add Partner</Button>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-zinc-200 bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600">Total Partners</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-black">{partners.length}</div>
                    </CardContent>
                </Card>
                <Card className="border-zinc-200 bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600">Total Referrals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-black">
                            {partners.reduce((sum, p) => sum + p.totalReferrals, 0)}
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-zinc-200 bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600">Total Earnings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-black">
                            ₹{partners.reduce((sum, p) => sum + p.totalEarnings, 0).toFixed(2)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Partners List */}
            <Card className="border-zinc-200 bg-white">
                <CardHeader>
                    <CardTitle className="text-black">All Partners</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {partners.map(partner => (
                                <div key={partner.id} className="flex items-center justify-between p-4 border border-zinc-200 rounded-lg">
                                    <div>
                                        <p className="font-medium text-black">{partner.name}</p>
                                        <p className="text-sm text-zinc-500">{partner.email}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-sm text-zinc-600">{partner.commission}% commission</p>
                                            <p className="text-sm text-zinc-500">{partner.totalReferrals} referrals</p>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => deletePartner(partner.id)}
                                            className="border-red-300 text-red-600"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
