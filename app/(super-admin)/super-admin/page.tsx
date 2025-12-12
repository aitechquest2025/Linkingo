"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Users, DollarSign, Crown, TrendingUp } from "lucide-react";

export default function SuperAdminDashboard() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalUsers: 0,
        premiumUsers: 0,
        totalRevenue: 0,
        activeSubscriptions: 0
    });

    useEffect(() => {
        checkSuperAdmin();
    }, [user]);

    const checkSuperAdmin = async () => {
        if (!user) {
            router.push("/login");
            return;
        }

        try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            console.log("User document exists:", userDoc.exists());
            console.log("User data:", userDoc.data());
            console.log("User role:", userDoc.data()?.role);

            if (!userDoc.exists() || userDoc.data().role !== "superadmin") {
                console.log("Access denied - redirecting to dashboard");
                router.push("/dashboard");
                return;
            }

            console.log("Super admin access granted");
            loadStats();
        } catch (error) {
            console.error("Error checking super admin:", error);
            router.push("/dashboard");
        }
    };

    const loadStats = async () => {
        setLoading(true);
        try {
            const usersSnapshot = await getDocs(collection(db, "users"));
            const users = usersSnapshot.docs.map(doc => doc.data());

            const subsSnapshot = await getDocs(collection(db, "subscriptions"));
            const subs = subsSnapshot.docs.map(doc => doc.data());

            setStats({
                totalUsers: users.length,
                premiumUsers: users.filter(u => u.subscriptionStatus === "premium").length,
                totalRevenue: subs.reduce((sum, s) => sum + (s.amount || 0), 0),
                activeSubscriptions: subs.filter(s => s.status === "active").length
            });
        } catch (error) {
            console.error("Error loading stats:", error);
        } finally {
            setLoading(false);
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
        <div className="max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-black mb-2">Super Admin Dashboard</h1>
                <p className="text-zinc-600">Overview of platform metrics</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="border-zinc-200 bg-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-black">{stats.totalUsers}</div>
                    </CardContent>
                </Card>

                <Card className="border-zinc-200 bg-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600">Premium Users</CardTitle>
                        <Crown className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-black">{stats.premiumUsers}</div>
                    </CardContent>
                </Card>

                <Card className="border-zinc-200 bg-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-black">₹{stats.totalRevenue.toFixed(2)}</div>
                    </CardContent>
                </Card>

                <Card className="border-zinc-200 bg-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600">Active Subscriptions</CardTitle>
                        <TrendingUp className="h-4 w-4 text-violet-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-black">{stats.activeSubscriptions}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card className="border-zinc-200 bg-white">
                <CardHeader>
                    <CardTitle className="text-black">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                        <Link href="/super-admin/users">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                Manage Users
                            </Button>
                        </Link>
                        <Link href="/super-admin/subscriptions">
                            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                                View Subscriptions
                            </Button>
                        </Link>
                        <Link href="/super-admin/marketing">
                            <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white">
                                Marketing Tools
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
