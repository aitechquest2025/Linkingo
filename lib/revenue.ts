import { db } from "@/lib/firebase";
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
    onSnapshot,
    serverTimestamp,
    Timestamp,
} from "firebase/firestore";

export interface RevenueEntry {
    id: string;
    amount: number;
    category: "Affiliate" | "Patreon" | "Gumroad" | "Youtube" | "Course" | "Tips" | "Sponsorship" | "Products" | "Memberships" | "Others";
    description?: string;
    source: "Manual" | "Razorpay";
    date: Timestamp;
    userId: string;
}

export const REVENUE_CATEGORIES = [
    "Affiliate",
    "Patreon",
    "Gumroad",
    "Youtube",
    "Course",
    "Tips",
    "Sponsorship",
    "Products",
    "Memberships",
    "Others",
];

export const revenueService = {
    // Subscribe to revenue logs
    subscribeRevenue: (userId: string, callback: (entries: RevenueEntry[]) => void) => {
        const q = query(
            collection(db, "revenue_entries"),
            where("userId", "==", userId),
            orderBy("date", "desc")
        );
        return onSnapshot(q, (snapshot) => {
            const entries = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as RevenueEntry[];
            callback(entries);
        });
    },

    // Add manual entry
    addEntry: async (userId: string, entry: Partial<RevenueEntry>) => {
        return addDoc(collection(db, "revenue_entries"), {
            ...entry,
            userId,
            source: "Manual",
            date: entry.date || serverTimestamp(),
        });
    },

    // Delete entry
    deleteEntry: async (id: string) => {
        return deleteDoc(doc(db, "revenue_entries", id));
    },
};
