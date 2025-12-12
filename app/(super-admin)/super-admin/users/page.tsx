"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { doc, getDoc, collection, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search, Crown, Ban, Trash2 } from "lucide-react";

interface User {
    id: string;
    email: string;
    username: string;
    displayName: string;
    subscriptionStatus: string;
    role: string;
    createdAt: any;
}

export default function SuperAdminUsersPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSuper, setIsSuper] = useState(false);

    useEffect(() => {
        checkSuperAdmin();
    }, [user]);

    const checkSuperAdmin = async () => {
        if (!user) {
            router.push("/login");
            return;
        }

        // Check if user is superadmin
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (!userDoc.exists() || userDoc.data().role !== "superadmin") {
            router.push("/dashboard");
            return;
        }

        setIsSuper(true);
        loadUsers();
    };

    const loadUsers = async () => {
        setLoading(true);
        try {
            const snapshot = await getDocs(collection(db, "users"));
            const userData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as User[];
            setUsers(userData);
        } catch (error) {
            console.error("Error loading users:", error);
        } finally {
            setLoading(false);
        }
    };

    const togglePremium = async (userId: string, currentStatus: string) => {
        try {
            const newStatus = currentStatus === "premium" ? "free" : "premium";
            await updateDoc(doc(db, "users", userId), {
                subscriptionStatus: newStatus
            });
            loadUsers();
            alert(`User subscription updated to ${newStatus}`);
        } catch (error) {
            console.error("Error updating subscription:", error);
            alert("Failed to update subscription");
        }
    };

    const deleteUser = async (userId: string) => {
        if (!confirm("Are you sure you want to delete this user?")) return;

        try {
            await deleteDoc(doc(db, "users", userId));
            loadUsers();
            alert("User deleted successfully");
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user");
        }
    };

    if (!isSuper) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
            </div>
        );
    }

    const filteredUsers = users.filter(u =>
        u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-black mb-2">User Management</h1>
                <p className="text-zinc-600">Manage all users and subscriptions</p>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-zinc-200 bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600">Total Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-black">{users.length}</div>
                    </CardContent>
                </Card>
                <Card className="border-zinc-200 bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600">Premium Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-black">
                            {users.filter(u => u.subscriptionStatus === "premium").length}
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-zinc-200 bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600">Free Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-black">
                            {users.filter(u => u.subscriptionStatus === "free").length}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            <Card className="border-zinc-200 bg-white">
                <CardContent className="pt-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                        <Input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by email or username..."
                            className="pl-10"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Users Table */}
            <Card className="border-zinc-200 bg-white">
                <CardHeader>
                    <CardTitle className="text-black">All Users ({filteredUsers.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {filteredUsers.map(user => (
                                <div key={user.id} className="flex items-center justify-between p-4 border border-zinc-200 rounded-lg hover:bg-zinc-50">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium text-black">{user.email}</p>
                                            {user.role === "superadmin" && (
                                                <span className="px-2 py-0.5 text-xs bg-red-100 text-red-700 rounded">Admin</span>
                                            )}
                                            {user.subscriptionStatus === "premium" && (
                                                <Crown className="h-4 w-4 text-amber-500" />
                                            )}
                                        </div>
                                        <p className="text-sm text-zinc-500">@{user.username || "no-username"}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => togglePremium(user.id, user.subscriptionStatus)}
                                            disabled={user.role === "superadmin"}
                                            className="border-zinc-300"
                                        >
                                            {user.subscriptionStatus === "premium" ? "Remove Premium" : "Grant Premium"}
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => deleteUser(user.id)}
                                            disabled={user.role === "superadmin"}
                                            className="border-red-300 text-red-600 hover:bg-red-50"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
