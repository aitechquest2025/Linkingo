"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    ShieldCheck,
    CreditCard,
    Ticket,
    Users,
    LayoutDashboard,
    LogOut,
    ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";

const adminItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/super-admin" },
    { icon: Users, label: "User Management", href: "/super-admin/users" },
    { icon: CreditCard, label: "Subscriptions", href: "/super-admin/subscriptions" },
    { icon: Ticket, label: "Marketing", href: "/super-admin/marketing" },
    { icon: Ticket, label: "System Logs", href: "/super-admin/logs" },
    { icon: Users, label: "Partners", href: "/super-admin/partners" },
];

export function SuperAdminSidebar({ className }: { className?: string }) {
    const pathname = usePathname();

    return (
        <div className={cn("flex h-screen w-64 flex-col border-r bg-zinc-950 text-zinc-50", className)}>
            <div className="p-6">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <ShieldCheck className="h-6 w-6 text-amber-500" />
                    <span>Super Admin</span>
                </h1>
            </div>

            <nav className="flex-1 space-y-2 px-4">
                {adminItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href}>
                            <div
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-amber-500/10 text-amber-500"
                                        : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-50"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 space-y-2">
                <Link href="/admin">
                    <Button variant="ghost" className="w-full justify-start text-zinc-400 hover:text-white">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to App
                    </Button>
                </Link>
            </div>
        </div>
    );
}
