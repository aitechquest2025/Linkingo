"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, Users, MousePointerClick, BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
    // Mock data - replace with real analytics
    const stats = {
        totalClicks: 1234,
        pageViews: 5678,
        clickRate: 21.7,
        topLink: "My Portfolio"
    };

    const linkPerformance = [
        { name: "My Portfolio", clicks: 456, views: 1200 },
        { name: "Instagram", clicks: 389, views: 980 },
        { name: "YouTube Channel", clicks: 267, views: 750 },
        { name: "Twitter", clicks: 122, views: 450 },
    ];

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
                        <p className="text-xs text-green-600 mt-1">+12% from last month</p>
                    </CardContent>
                </Card>

                <Card className="border-gray-200 bg-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600">Page Views</CardTitle>
                        <Users className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-black">{stats.pageViews.toLocaleString()}</div>
                        <p className="text-xs text-green-600 mt-1">+8% from last month</p>
                    </CardContent>
                </Card>

                <Card className="border-gray-200 bg-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600">Click Rate</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-black">{stats.clickRate}%</div>
                        <p className="text-xs text-green-600 mt-1">+3% from last month</p>
                    </CardContent>
                </Card>

                <Card className="border-gray-200 bg-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600">Top Link</CardTitle>
                        <BarChart3 className="h-4 w-4 text-amber-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-bold text-black truncate">{stats.topLink}</div>
                        <p className="text-xs text-zinc-500 mt-1">{linkPerformance[0].clicks} clicks</p>
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
                    <div className="space-y-4">
                        {linkPerformance.map((link, idx) => {
                            const clickRate = ((link.clicks / link.views) * 100).toFixed(1);
                            return (
                                <div key={idx} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-black">{link.name}</p>
                                            <p className="text-sm text-zinc-500">{link.clicks} clicks • {link.views} views</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-purple-600">{clickRate}%</p>
                                            <p className="text-xs text-zinc-500">click rate</p>
                                        </div>
                                    </div>
                                    <div className="w-full bg-zinc-100 rounded-full h-2">
                                        <div
                                            className="bg-purple-600 h-2 rounded-full transition-all"
                                            style={{ width: `${clickRate}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
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
