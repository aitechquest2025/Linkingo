"use client";

import { Sidebar } from "@/components/admin/sidebar";
import { MobileNav } from "@/components/admin/mobile-nav";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Sidebar for Desktop */}
            <div className="hidden border-r md:block">
                <Sidebar />
            </div>

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Mobile Header */}
                <header className="flex h-14 items-center gap-4 border-b bg-background/50 backdrop-blur-md px-6 md:hidden">
                    <MobileNav />
                    <span className="font-bold">Linkingo</span>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-mesh/5">
                    {children}
                </main>
            </div>
        </div>
    );
}
