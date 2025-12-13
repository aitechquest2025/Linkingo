"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Link2, BarChart3, DollarSign, Palette, Settings, Crown, ExternalLink, LogOut, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { logout, user, userData } = useAuth();
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Check if user has Pro subscription
    const isPremium = userData?.subscription?.status === 'active';

    // Filter navigation based on Pro status
    const navigation = [
        { name: "Links", href: "/dashboard", icon: Link2 },
        { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
        { name: "Revenue", href: "/dashboard/revenue", icon: DollarSign },
        { name: "Customize", href: "/dashboard/customize", icon: Palette },
        { name: "Settings", href: "/dashboard/settings", icon: Settings },
        // Only show Upgrade if user is NOT premium
        ...(!isPremium ? [{ name: "Upgrade", href: "/dashboard/upgrade", icon: Crown }] : []),
    ];

    // Generate username from email
    const username = user?.email?.split('@')[0] || 'preview';

    return (
        <div className="min-h-screen bg-zinc-50">
            {/* Top Navigation Bar */}
            <header className="border-b border-zinc-200 bg-white sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="size-8 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
                                <span className="font-bold text-white text-sm">L</span>
                            </div>
                            <span className="font-bold text-lg text-black">Linkingo</span>
                        </Link>

                        {/* Desktop Navigation */}
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
                        <div className="flex items-center gap-2">
                            <Link href={`/${username}`} target="_blank" className="hidden sm:block">
                                <Button variant="outline" size="sm" className="border-zinc-300 hover:bg-zinc-50">
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    View Page
                                </Button>
                            </Link>
                            <Button variant="ghost" size="icon" onClick={logout} className="hidden md:flex text-zinc-600 hover:bg-zinc-100">
                                <LogOut className="h-4 w-4" />
                            </Button>

                            {/* Mobile Menu Button */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-zinc-200 bg-white">
                        <nav className="px-4 py-4 space-y-1">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href;
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <Button
                                            variant="ghost"
                                            className={`w-full justify-start ${isActive
                                                ? "text-violet-600 bg-violet-50"
                                                : "text-zinc-600 hover:text-black hover:bg-zinc-100"
                                                }`}
                                        >
                                            <Icon className="mr-3 h-5 w-5" />
                                            {item.name}
                                        </Button>
                                    </Link>
                                );
                            })}
                            <div className="pt-4 border-t border-zinc-200 space-y-2">
                                <Link href={`/${username}`} target="_blank" onClick={() => setMobileMenuOpen(false)}>
                                    <Button variant="outline" className="w-full justify-start border-zinc-300">
                                        <ExternalLink className="mr-3 h-5 w-5" />
                                        View Page
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-red-600 hover:bg-red-50"
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        logout();
                                    }}
                                >
                                    <LogOut className="mr-3 h-5 w-5" />
                                    Logout
                                </Button>
                            </div>
                        </nav>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
                {children}
            </main>
        </div>
    );
}
