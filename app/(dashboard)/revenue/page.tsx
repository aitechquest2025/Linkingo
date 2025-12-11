"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { RevenueEntry, revenueService, REVENUE_CATEGORIES } from "@/lib/revenue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, DollarSign, TrendingUp, Calendar, Trash2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

export default function RevenuePage() {
    const { user } = useAuth();
    const [entries, setEntries] = useState<RevenueEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddOpen, setIsAddOpen] = useState(false);

    // Form State
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState<string>("Affiliate");

    useEffect(() => {
        if (!user) return;
        const unsubscribe = revenueService.subscribeRevenue(user.uid, (data) => {
            setEntries(data);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [user]);

    const handleAddEntry = async () => {
        if (!user || !amount) return;
        await revenueService.addEntry(user.uid, {
            amount: parseFloat(amount),
            category: category as any,
        });
        setAmount("");
        setIsAddOpen(false);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this entry?")) {
            await revenueService.deleteEntry(id);
        }
    };

    // Calculations
    const totalRevenue = entries.reduce((acc, curr) => acc + curr.amount, 0);

    const categoryData = REVENUE_CATEGORIES.map(cat => ({
        name: cat,
        value: entries.filter(e => e.category === cat).reduce((acc, c) => acc + c.amount, 0)
    })).filter(c => c.value > 0);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Revenue</h1>
                    <p className="text-muted-foreground">Track your earnings from all sources.</p>
                </div>
                <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-primary hover:bg-primary/90">
                            <Plus className="mr-2 h-4 w-4" /> Add Entry
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Revenue Entry</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Category</label>
                                <Select value={category} onValueChange={setCategory}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {REVENUE_CATEGORIES.map((cat) => (
                                            <SelectItem key={cat} value={cat}>
                                                {cat}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Amount</label>
                                <Input
                                    type="number"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                            <Button onClick={handleAddEntry} className="w-full">
                                Add Entry
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-200/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-700 dark:text-green-400">
                            ${totalRevenue.toFixed(2)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Transactions</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{entries.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Top Category</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {categoryData.sort((a, b) => b.value - a.value)[0]?.name || "-"}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {/* Category Breakdown Chart */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Category Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        {categoryData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex h-full items-center justify-center text-muted-foreground">
                                No data to display
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* History Table (Simulated) */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Recent History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 max-h-[300px] overflow-y-auto">
                            {entries.map((entry) => (
                                <div key={entry.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg group">
                                    <div className="flex items-center gap-3">
                                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                                        <div>
                                            <p className="font-medium">{entry.category}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {entry.date ? new Date(entry.date.seconds * 1000).toLocaleDateString() : "Just now"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold text-green-600">
                                            +${entry.amount.toFixed(2)}
                                        </span>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleDelete(entry.id)}>
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {entries.length === 0 && <p className="text-center text-muted-foreground text-sm">No transactions yet.</p>}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
