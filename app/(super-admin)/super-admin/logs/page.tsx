"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { doc, getDoc, collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function SuperAdminLogsPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [logs, setLogs] = useState<any[]>([]);

    useEffect(() => {
        checkSuperAdmin();
    }, [user]);

    const checkSuperAdmin = async () => {
        if (!user) {
            router.push("/login");
            return;
        }

        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (!userDoc.exists() || userDoc.data().role !== "superadmin") {
            router.push("/dashboard");
            return;
        }

        loadLogs();
    };

    const loadLogs = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "logs"), orderBy("timestamp", "desc"), limit(100));
            const snapshot = await getDocs(q);
            setLogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
            console.error("Error loading logs:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-black mb-2">Activity Logs</h1>
                <p className="text-zinc-600">System activity and audit trail</p>
            </div>

            <Card className="border-zinc-200 bg-white">
                <CardHeader>
                    <CardTitle className="text-black">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
                        </div>
                    ) : logs.length > 0 ? (
                        <div className="space-y-2">
                            {logs.map(log => (
                                <div key={log.id} className="p-4 border border-zinc-200 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium text-black">{log.action}</p>
                                        <p className="text-sm text-zinc-500">{log.timestamp?.toDate?.()?.toLocaleString()}</p>
                                    </div>
                                    <p className="text-sm text-zinc-600 mt-1">{log.userId}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-zinc-500">No activity logs yet</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
