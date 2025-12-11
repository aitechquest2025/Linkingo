"use client";

import { useEffect, useState } from "react";
import { logService, SystemLog } from "@/lib/logs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertTriangle, Info, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SystemLogsPage() {
    const [logs, setLogs] = useState<SystemLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadLogs = async () => {
            const data = await logService.getRecentLogs();
            setLogs(data);
            setLoading(false);
        };
        loadLogs();
    }, []);

    if (loading) return <Loader2 className="animate-spin text-white" />;

    const getIcon = (level: string) => {
        switch (level) {
            case 'error': return <XCircle className="h-4 w-4 text-red-500" />;
            case 'warning': return <AlertTriangle className="h-4 w-4 text-amber-500" />;
            default: return <Info className="h-4 w-4 text-blue-500" />;
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">System Logs</h1>
                <p className="text-zinc-400">Audit trail of system activities and errors.</p>
            </div>

            <Card className="bg-zinc-900 border-zinc-800 text-zinc-50">
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border border-zinc-800">
                        {logs.length === 0 ? (
                            <div className="p-8 text-center text-zinc-500">No logs found.</div>
                        ) : (
                            <div className="divide-y divide-zinc-800">
                                {logs.map((log) => (
                                    <div key={log.id} className="flex items-start gap-4 p-4 hover:bg-zinc-800/50 transition-colors">
                                        <div className="mt-1">{getIcon(log.level)}</div>
                                        <div className="flex-1 space-y-1">
                                            <p className="font-medium text-sm text-zinc-200">{log.action}</p>
                                            <p className="text-xs text-zinc-500 font-mono">{log.details}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-zinc-600">
                                                {log.createdAt ? new Date(log.createdAt.seconds * 1000).toLocaleString() : "N/A"}
                                            </p>
                                            <p className="text-[10px] text-zinc-700 font-mono mt-1">
                                                User: {log.userId?.slice(0, 8)}...
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
