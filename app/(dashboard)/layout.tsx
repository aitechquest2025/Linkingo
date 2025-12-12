"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Link2, BarChart3, DollarSign, Palette, Settings, Crown, ExternalLink, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { logout, user } = useAuth();
    const pathname = usePathname();

    const navigation = [
        { name: "Links", href: "/dashboard", icon: Link2 },
        { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
        { name: "Revenue", href: "/dashboard/revenue", icon: DollarSign },
        { name: "Customize", href: "/dashboard/customize", icon: Palette },
        { name: "Settings", href: "/dashboard/settings", icon: Settings },
        { name: "Upgrade", href: "/dashboard/upgrade", icon: Crown },
    ];

    // Generate username from email
    const username = user?.email?.split('@')[0] || 'preview';

    return (
        <div className="min-h-screen bg-zinc-50">
            {/* Top Navigation Bar */}
            <header className="border-b border-zinc-200 bg-white sticky top-0 z-50 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="size-8 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
                                <span className="font-bold text-white text-sm">L</span>
                            </div>
                            <span className="font-bold text-lg text-black">Linkingo</span>
                        </Link>

                        {/* Horizontal Navigation */}
                        <nav className="hidden md:flex items-center space-x-1">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href;
                                const Icon = item.icon;
                                return (
                                    <Link key={item.name} href={item.href}>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className={`${isActive
                                                    ? "text-violet-600 bg-violet-50"
                                                    : "text-zinc-600 hover:text-black hover:bg-zinc-100"
                                                }`}
                                        >
                                            <Icon className="mr-2 h-4 w-4" />
                                            {item.name}
                                        </Button>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-3">
                            <Link href={`/${username}`} target="_blank">
                                <Button variant="outline" size="sm" className="hidden sm:flex border-zinc-300 hover:bg-zinc-50">
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    View Page
                                </Button>
                            </Link>
                            <Button variant="ghost" size="icon" onClick={logout} className="text-zinc-600 hover:bg-zinc-100">
                                <LogOut className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
}
