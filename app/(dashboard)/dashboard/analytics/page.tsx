"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, TrendingUp, Eye, MousePointerClick } from "lucide-react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface AnalyticsData {
    totalClicks: number;
    pageViews: number;
    clickRate: number;
    linkPerformance: Array<{
        linkId: string;
        title: string;
        clicks: number;
    }>;
}

export default function AnalyticsPage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [analytics, setAnalytics] = useState<AnalyticsData>({
        totalClicks: 0,
        pageViews: 0,
        clickRate: 0,
        linkPerformance: []
    });

    useEffect(() => {
        if (user) {
            loadAnalytics();
        }
    }, [user]);

    const loadAnalytics = async () => {
        if (!user) return;
        setLoading(true);
        try {
            // In a real implementation, you would fetch analytics data from Firestore
            // For now, we'll use placeholder data
            setAnalytics({
                totalClicks: 0,
                pageViews: 0,
                clickRate: 0,
                linkPerformance: []
            });
        } catch (error) {
            console.error("Error loading analytics:", error);
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
        <div className="max-w-6xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-black dark:text-white mb-2">Analytics</h1>
                <p className="text-zinc-600 dark:text-zinc-400">Track your link performance and audience insights</p>
            </div>

            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Total Clicks</CardTitle>
                        <MousePointerClick className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-black dark:text-white">{analytics.totalClicks}</div>
                        <p className="text-xs text-zinc-500 mt-1">All time</p>
                    </CardContent>
                </Card>

                <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Page Views</CardTitle>
                        <Eye className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-black dark:text-white">{analytics.pageViews}</div>
                        <p className="text-xs text-zinc-500 mt-1">All time</p>
                    </CardContent>
                </Card>

                <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Click Rate</CardTitle>
                        <TrendingUp className="h-4 w-4 text-violet-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-black dark:text-white">{analytics.clickRate}%</div>
                        <p className="text-xs text-zinc-500 mt-1">Clicks per view</p>
                    </CardContent>
                </Card>
            </div>

            {/* Link Performance */}
            <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <CardHeader>
                    <CardTitle className="text-black dark:text-white">Link Performance</CardTitle>
                </CardHeader>
                <CardContent>
                    {analytics.linkPerformance.length > 0 ? (
                        <div className="space-y-4">
                            {analytics.linkPerformance.map((link, index) => (
                                <div key={link.linkId} className="flex items-center justify-between p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-950 flex items-center justify-center">
                                            <span className="text-sm font-bold text-violet-600 dark:text-violet-400">#{index + 1}</span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-black dark:text-white">{link.title}</p>
                                            <p className="text-sm text-zinc-500">{link.clicks} clicks</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="w-24 h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-violet-600"
                                                style={{ width: `${(link.clicks / analytics.totalClicks) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Eye className="h-12 w-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
                            <p className="text-zinc-500">No analytics data yet</p>
                            <p className="text-sm text-zinc-400 mt-1">Share your link to start tracking performance</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Chart Placeholder */}
            <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <CardHeader>
                    <CardTitle className="text-black dark:text-white">Clicks Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg">
                        <p className="text-zinc-400">Chart visualization coming soon</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
