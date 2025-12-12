"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { doc, getDoc, collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Plus, DollarSign } from "lucide-react";

interface Subscription {
    id: string;
    userId: string;
    userEmail: string;
    plan: string;
    status: string;
    amount: number;
    startDate: any;
    endDate: any;
}

export default function SuperAdminSubscriptionsPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [newSub, setNewSub] = useState({ userId: "", plan: "monthly", amount: "299" });

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

        loadSubscriptions();
    };

    const loadSubscriptions = async () => {
        setLoading(true);
        try {
            const snapshot = await getDocs(collection(db, "subscriptions"));
            const subs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Subscription[];
            setSubscriptions(subs);
        } catch (error) {
            console.error("Error loading subscriptions:", error);
        } finally {
            setLoading(false);
        }
    };

    const createSubscription = async () => {
        try {
            const endDate = new Date();
            endDate.setMonth(endDate.getMonth() + (newSub.plan === "yearly" ? 12 : 1));

            await addDoc(collection(db, "subscriptions"), {
                userId: newSub.userId,
                plan: newSub.plan,
                amount: parseFloat(newSub.amount),
                status: "active",
                startDate: serverTimestamp(),
                endDate: endDate
            });

            setDialogOpen(false);
            loadSubscriptions();
            alert("Subscription created successfully");
        } catch (error) {
            console.error("Error creating subscription:", error);
            alert("Failed to create subscription");
        }
    };

    const totalRevenue = subscriptions.reduce((sum, sub) => sum + (sub.amount || 0), 0);

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-black mb-2">Subscription Management</h1>
                    <p className="text-zinc-600">Manage all subscriptions and revenue</p>
                </div>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                            <Plus className="mr-2 h-4 w-4" />
                            Create Subscription
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create Manual Subscription</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block">User ID</label>
                                <Input
                                    value={newSub.userId}
                                    onChange={(e) => setNewSub({ ...newSub, userId: e.target.value })}
                                    placeholder="Enter user ID"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Plan</label>
                                <Select value={newSub.plan} onValueChange={(value) => setNewSub({ ...newSub, plan: value })}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="monthly">Monthly (₹299)</SelectItem>
                                        <SelectItem value="yearly">Yearly (₹2999)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Amount (₹)</label>
                                <Input
                                    type="number"
                                    value={newSub.amount}
                                    onChange={(e) => setNewSub({ ...newSub, amount: e.target.value })}
                                />
                            </div>
                        </div>
                        <Button onClick={createSubscription} className="w-full">Create</Button>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-zinc-200 bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600">Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-black">₹{totalRevenue.toFixed(2)}</div>
                    </CardContent>
                </Card>
                <Card className="border-zinc-200 bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600">Active Subscriptions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-black">
                            {subscriptions.filter(s => s.status === "active").length}
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-zinc-200 bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600">Total Subscriptions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-black">{subscriptions.length}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Subscriptions List */}
            <Card className="border-zinc-200 bg-white">
                <CardHeader>
                    <CardTitle className="text-black">All Subscriptions</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {subscriptions.map(sub => (
                                <div key={sub.id} className="flex items-center justify-between p-4 border border-zinc-200 rounded-lg">
                                    <div>
                                        <p className="font-medium text-black">{sub.userEmail || sub.userId}</p>
                                        <p className="text-sm text-zinc-500">{sub.plan} - {sub.status}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-green-600">₹{sub.amount}</p>
                                        <p className="text-xs text-zinc-500">{sub.startDate?.toDate?.()?.toLocaleDateString()}</p>
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
