import { db } from "@/lib/firebase";
import {
    collection,
    addDoc,
    query,
    orderBy,
    limit,
    getDocs,
    serverTimestamp,
    Timestamp,
} from "firebase/firestore";

export interface SystemLog {
    id: string;
    action: string;
    userId?: string; // Who performed the action
    details: string;
    level: "info" | "warning" | "error";
    createdAt: Timestamp;
}

export const logService = {
    log: async (action: string, details: string, userId?: string, level: "info" | "warning" | "error" = "info") => {
        try {
            await addDoc(collection(db, "system_logs"), {
                action,
                details,
                userId: userId || "system",
                level,
                createdAt: serverTimestamp(),
            });
        } catch (e) {
            console.error("Failed to write system log", e);
        }
    },

    getRecentLogs: async (count = 50): Promise<SystemLog[]> => {
        const q = query(
            collection(db, "system_logs"),
            orderBy("createdAt", "desc"),
            limit(count)
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as SystemLog[];
    },
};
