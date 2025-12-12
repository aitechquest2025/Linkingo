"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, Users, MousePointerClick, BarChart3 } from "lucide-react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getTotalStats, getLinkAnalytics } from "@/lib/analytics";

export default function AnalyticsPage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalClicks: 0,
        pageViews: 0,
        clickRate: 0
    });
    const [linkPerformance, setLinkPerformance] = useState<any[]>([]);

    useEffect(() => {
        if (user) {
            loadAnalytics();
        }
    }, [user]);

    const loadAnalytics = async () => {
        if (!user) return;
        setLoading(true);

        try {
            // Get user's links
            const linksQuery = query(collection(db, "links"), where("userId", "==", user.uid));
            const linksSnapshot = await getDocs(linksQuery);
            const links = linksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Get total stats
            const totalStats = await getTotalStats(user.uid, 30);
            setStats({
                totalClicks: totalStats.totalClicks,
                pageViews: totalStats.totalViews,
                clickRate: totalStats.clickRate
            });

            // Get link performance
            const linkStats = await getLinkAnalytics(user.uid, links, 30);
            setLinkPerformance(linkStats);
        } catch (error) {
            console.error("Error loading analytics:", error);
        } finally {
            setLoading(false);
        }
    };

    const topLink = linkPerformance.length > 0 ? linkPerformance[0].linkTitle : "N/A";

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-black mb-2">Analytics</h1>
                <p className="text-zinc-600">Track your link performance and audience engagement</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-gray-200 bg-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600">Total Clicks</CardTitle>
                        <MousePointerClick className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-black">{stats.totalClicks.toLocaleString()}</div>
                        <p className="text-xs text-zinc-500 mt-1">Last 30 days</p>
                    </CardContent>
                </Card>

                <Card className="border-gray-200 bg-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600">Page Views</CardTitle>
                        <Users className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-black">{stats.pageViews.toLocaleString()}</div>
                        <p className="text-xs text-zinc-500 mt-1">Last 30 days</p>
                    </CardContent>
                </Card>

                <Card className="border-gray-200 bg-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600">Click Rate</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-black">{stats.clickRate}%</div>
                        <p className="text-xs text-zinc-500 mt-1">Avg per view</p>
                    </CardContent>
                </Card>

                <Card className="border-gray-200 bg-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600">Top Link</CardTitle>
                        <BarChart3 className="h-4 w-4 text-amber-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-bold text-black truncate">{topLink}</div>
                        <p className="text-xs text-zinc-500 mt-1">
                            {linkPerformance.length > 0 ? `${linkPerformance[0].clicks} clicks` : "No data"}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Link Performance */}
            <Card className="border-gray-200 bg-white">
                <CardHeader>
                    <CardTitle className="text-black">Link Performance</CardTitle>
                    <CardDescription>See how each link is performing</CardDescription>
                </CardHeader>
                <CardContent>
                    {linkPerformance.length > 0 ? (
                        <div className="space-y-4">
                            {linkPerformance.map((link, idx) => (
                                <div key={idx} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-black">{link.linkTitle}</p>
                                            <p className="text-sm text-zinc-500">{link.clicks} clicks • {link.views} views</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-purple-600">{link.clickRate}%</p>
                                            <p className="text-xs text-zinc-500">click rate</p>
                                        </div>
                                    </div>
                                    <div className="w-full bg-zinc-100 rounded-full h-2">
                                        <div
                                            className="bg-purple-600 h-2 rounded-full transition-all"
                                            style={{ width: `${Math.min(link.clickRate, 100)}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <BarChart3 className="h-12 w-12 text-zinc-300 mx-auto mb-3" />
                            <p className="text-zinc-500">No analytics data yet. Share your page to start tracking!</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Chart Placeholder */}
            <Card className="border-gray-200 bg-white">
                <CardHeader>
                    <CardTitle className="text-black">Traffic Over Time</CardTitle>
                    <CardDescription>Your page views and clicks over the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-64 flex items-center justify-center bg-zinc-50 rounded-lg border-2 border-dashed border-zinc-200">
                        <div className="text-center">
                            <BarChart3 className="h-12 w-12 text-zinc-300 mx-auto mb-2" />
                            <p className="text-zinc-500">Chart visualization coming soon</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
