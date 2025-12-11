"use client";

import { useEffect, useState } from "react";
import { adminService, DashboardStats } from "@/lib/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Link as LinkIcon, DollarSign, Activity } from "lucide-react";

export default function SuperAdminDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            const data = await adminService.getStats();
            setStats(data);
        };
        fetchStats();
    }, []);

    if (!stats) return <div className="text-zinc-500">Loading stats...</div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Platform Overview</h2>
                <p className="text-zinc-400">Welcome back, Super Admin. Here's what's happening today.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <Card className="bg-zinc-900 border-zinc-800 text-zinc-50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalUsers}</div>
                        <p className="text-xs text-zinc-500">+2% from last month</p>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900 border-zinc-800 text-zinc-50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Total Links</CardTitle>
                        <LinkIcon className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalLinks}</div>
                        <p className="text-xs text-zinc-500">Active across platform</p>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900 border-zinc-800 text-zinc-50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Total MRR</CardTitle>
                        <DollarSign className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$0.00</div>
                        <p className="text-xs text-zinc-500">Monthly Recurring Revenue</p>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900 border-zinc-800 text-zinc-50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">System Health</CardTitle>
                        <Activity className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-500">99.9%</div>
                        <p className="text-xs text-zinc-500">Uptime</p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity Section */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 bg-zinc-900 border-zinc-800 text-zinc-50">
                    <CardHeader>
                        <CardTitle>Recent Signups</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {stats.recentUsers.map((user) => (
                                <div key={user.uid} className="flex items-center justify-between border-b border-zinc-800 pb-2 last:border-0">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400">
                                            {user.email?.[0]?.toUpperCase() || "U"}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-zinc-200">{user.displayName || user.email}</p>
                                            <p className="text-xs text-zinc-500">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="text-xs text-zinc-500">
                                        {user.createdAt ? new Date(user.createdAt.seconds * 1000).toLocaleDateString() : "N/A"}
                                    </div>
                                </div>
                            ))}
                            {stats.recentUsers.length === 0 && <p className="text-zinc-500 text-sm">No users found.</p>}
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3 bg-zinc-900 border-zinc-800 text-zinc-50">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="p-3 bg-zinc-800/50 rounded-lg text-sm text-zinc-400 border border-zinc-800 hover:border-amber-500/50 cursor-pointer transition-colors">
                            Create System Notification
                        </div>
                        <div className="p-3 bg-zinc-800/50 rounded-lg text-sm text-zinc-400 border border-zinc-800 hover:border-amber-500/50 cursor-pointer transition-colors">
                            Generate Discount Code
                        </div>
                        <div className="p-3 bg-zinc-800/50 rounded-lg text-sm text-zinc-400 border border-zinc-800 hover:border-amber-500/50 cursor-pointer transition-colors">
                            Manage Deployments
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
