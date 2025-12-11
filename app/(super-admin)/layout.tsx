"use client";

import { useAdminProtection } from "@/hooks/use-admin";
import { SuperAdminSidebar } from "@/components/admin/super-sidebar";
import { Loader2 } from "lucide-react";

export default function SuperAdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isSuperAdmin, checking } = useAdminProtection();

    if (checking) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-zinc-950">
                <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
            </div>
        );
    }

    if (!isSuperAdmin) {
        return null; // The hook handles redirection
    }

    return (
        <div className="flex h-screen overflow-hidden bg-zinc-900 text-zinc-50">
            <SuperAdminSidebar />
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
}
