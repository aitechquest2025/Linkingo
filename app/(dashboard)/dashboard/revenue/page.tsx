"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Download, Loader2, DollarSign } from "lucide-react";
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface RevenueEntry {
    id: string;
    category: string;
    amount: number;
    date: Date;
    note: string;
}

const REVENUE_CATEGORIES = [
    "Affiliate",
    "Patreon",
    "Gumroad",
    "Youtube",
    "Course",
    "Tips",
    "Sponsorship",
    "Products",
    "Memberships",
    "Others"
];

export default function RevenuePage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [entries, setEntries] = useState<RevenueEntry[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [adding, setAdding] = useState(false);

    const [newEntry, setNewEntry] = useState({
        category: "Affiliate",
        amount: "",
        note: ""
    });

    useEffect(() => {
        if (user) {
            loadRevenue();
        }
    }, [user]);

    const loadRevenue = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const q = query(collection(db, "revenue"), where("userId", "==", user.uid));
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                date: doc.data().date?.toDate() || new Date()
            })) as RevenueEntry[];
            setEntries(data);
        } catch (error) {
            console.error("Error loading revenue:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddEntry = async () => {
        if (!user || !newEntry.amount) return;
        setAdding(true);
        try {
            await addDoc(collection(db, "revenue"), {
                userId: user.uid,
                category: newEntry.category,
                amount: parseFloat(newEntry.amount),
                note: newEntry.note,
                date: serverTimestamp()
            });
            setNewEntry({ category: "Affiliate", amount: "", note: "" });
            setDialogOpen(false);
            loadRevenue();
        } catch (error) {
            console.error("Error adding entry:", error);
            alert("Failed to add revenue entry");
        } finally {
            setAdding(false);
        }
    };

    const totalRevenue = entries.reduce((sum, entry) => sum + entry.amount, 0);

    const categoryBreakdown = REVENUE_CATEGORIES.map(category => ({
        category,
        total: entries.filter(e => e.category === category).reduce((sum, e) => sum + e.amount, 0)
    })).filter(item => item.total > 0);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-black dark:text-white mb-2">Revenue Tracking</h1>
                    <p className="text-zinc-600 dark:text-zinc-400">Track your earnings from all sources</p>
                </div>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Entry
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Add Revenue Entry</DialogTitle>
                            <DialogDescription>Record a new revenue transaction</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block">Category</label>
                                <Select value={newEntry.category} onValueChange={(value) => setNewEntry({ ...newEntry, category: value })}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {REVENUE_CATEGORIES.map(cat => (
                                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Amount (₹)</label>
                                <Input
                                    type="number"
                                    value={newEntry.amount}
                                    onChange={(e) => setNewEntry({ ...newEntry, amount: e.target.value })}
                                    placeholder="0.00"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Note (Optional)</label>
                                <Input
                                    value={newEntry.note}
                                    onChange={(e) => setNewEntry({ ...newEntry, note: e.target.value })}
                                    placeholder="Add a note..."
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 justify-end">
                            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                            <Button onClick={handleAddEntry} disabled={adding || !newEntry.amount}>
                                {adding ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Add Entry
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-black dark:text-white">₹{totalRevenue.toFixed(2)}</div>
                        <p className="text-xs text-zinc-500 mt-1">All time</p>
                    </CardContent>
                </Card>

                <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Entries</CardTitle>
                        <Download className="h-4 w-4 text-zinc-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-black dark:text-white">{entries.length}</div>
                        <p className="text-xs text-zinc-500 mt-1">Total records</p>
                    </CardContent>
                </Card>
            </div>

            {/* Category Breakdown */}
            {categoryBreakdown.length > 0 && (
                <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    <CardHeader>
                        <CardTitle className="text-black dark:text-white">Category Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {categoryBreakdown.map(item => (
                                <div key={item.category} className="flex items-center justify-between">
                                    <span className="text-sm text-zinc-700 dark:text-zinc-300">{item.category}</span>
                                    <span className="text-sm font-semibold text-black dark:text-white">₹{item.total.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Recent Entries */}
            {entries.length > 0 ? (
                <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    <CardHeader>
                        <CardTitle className="text-black dark:text-white">Recent Entries</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {entries.slice(0, 10).map(entry => (
                                <div key={entry.id} className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                                    <div>
                                        <p className="text-sm font-medium text-black dark:text-white">{entry.category}</p>
                                        {entry.note && <p className="text-xs text-zinc-500">{entry.note}</p>}
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-green-600">₹{entry.amount.toFixed(2)}</p>
                                        <p className="text-xs text-zinc-500">{entry.date.toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    <CardContent className="py-12 text-center">
                        <p className="text-zinc-500">No revenue entries yet. Click "Add Entry" to get started!</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
