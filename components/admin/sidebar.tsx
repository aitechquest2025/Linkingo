"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Link as LinkIcon,
    Settings,
    CreditCard,
    LogOut,
    Palette,
    ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Analytics", href: "/admin" },
    { icon: LinkIcon, label: "Links", href: "/admin/links" },
    { icon: Palette, label: "App", href: "/admin/appearance" },
    { icon: CreditCard, label: "Revenue", href: "/admin/revenue" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export function Sidebar({ className }: { className?: string }) {
    const pathname = usePathname();
    const { logout } = useAuth();

    return (
        <div className={cn("flex h-screen w-64 flex-col border-r bg-card/50 backdrop-blur-xl", className)}>
            <div className="p-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                    Linkingo
                </h1>
            </div>

            <nav className="flex-1 space-y-2 px-4">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href}>
                            <div
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </div>
                        </Link>
                    );
                })}

                {/* Super Admin Section (Separated visually) */}
                <div className="mt-8">
                    <h3 className="mb-2 px-4 text-xs font-semibold uppercase text-muted-foreground">Admin Pro</h3>
                    <Link href="/super-admin">
                        <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
                            <ShieldCheck className="h-4 w-4 text-amber-500" />
                            Super Admin
                        </div>
                    </Link>
                </div>
            </nav>

            <div className="p-4">
                <Button variant="ghost" className="w-full justify-start text-red-500 hover:bg-red-500/10 hover:text-red-600" onClick={() => logout()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                </Button>
            </div>
        </div>
    );
}
