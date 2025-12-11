"use client";

import { useEffect, useState } from "react";
import { adminService } from "@/lib/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "lucide-react"; // Using lucide icon as placeholder if badge ui not exists.
// Actually, let's make a simple Badge component usage inline or text-xs styling
import { Loader2 } from "lucide-react";

export default function UserManagementPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUsers = async () => {
            const data = await adminService.getAllUsers();
            setUsers(data);
            setLoading(false);
        };
        loadUsers();
    }, []);

    if (loading) return <Loader2 className="animate-spin text-white" />;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">User Management</h1>
                <p className="text-zinc-400">View and manage all registered users.</p>
            </div>

            <Card className="bg-zinc-900 border-zinc-800 text-zinc-50">
                <CardHeader>
                    <CardTitle>All Users ({users.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {users.map((user) => (
                            <div key={user.id} className="flex items-center justify-between p-4 bg-zinc-800/30 rounded-lg border border-zinc-800">
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarImage src={user.photoURL} />
                                        <AvatarFallback>{user.email?.[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-zinc-200">{user.displayName || "Unknown"}</p>
                                        <p className="text-sm text-zinc-500">{user.email}</p>
                                        <p className="text-xs text-zinc-600 mt-1">ID: {user.uid}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium border border-green-500/20">
                                        Active
                                    </span>
                                    <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                                        Details
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
