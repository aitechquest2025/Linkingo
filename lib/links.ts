import { db } from "@/lib/firebase";
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
    onSnapshot,
    serverTimestamp,
    writeBatch,
} from "firebase/firestore";

export interface LinkItem {
    id: string;
    title: string;
    url: string;
    icon?: string;
    isVisible: boolean;
    order: number;
    clicks: number;
    userId: string;
    type: "classic" | "music" | "video" | "header";
    smartRules?: {
        geo?: {
            enabled: boolean;
            allow?: boolean; // true = allow only, false = block
            countryCodes: string[]; // e.g., ["IN", "US"]
        };
        schedule?: {
            enabled: boolean;
            startTime?: string; // ISO String
            endTime?: string;
            daysOfWeek?: number[]; // 0-6 (Sun-Sat)
        };
    };
    commerce?: {
        isLocked: boolean;
        price: number;
        currency: string; // "INR"
        fileUrl?: string; // For digital products
        buttonText?: string; // "Buy for ₹100"
    };
}

export const linkService = {
    // Subscribe to real-time updates
    subscribeLinks: (userId: string, callback: (links: LinkItem[]) => void) => {
        const q = query(
            collection(db, "links"),
            where("userId", "==", userId),
            orderBy("order", "asc")
        );
        return onSnapshot(q, (snapshot) => {
            const links = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as LinkItem[];
            callback(links);
        });
    },

    // Add new link
    addLink: async (userId: string, link: Partial<LinkItem>) => {
        return addDoc(collection(db, "links"), {
            ...link,
            userId,
            clicks: 0,
            isVisible: true,
            createdAt: serverTimestamp(),
            type: link.type || "classic",
        });
    },

    // Update link
    updateLink: async (id: string, data: Partial<LinkItem>) => {
        const linkRef = doc(db, "links", id);
        return updateDoc(linkRef, data);
    },

    // Delete link
    deleteLink: async (id: string) => {
        return deleteDoc(doc(db, "links", id));
    },

    // Reorder links (batch update)
    reorderLinks: async (items: LinkItem[]) => {
        const batch = writeBatch(db);
        items.forEach((item, index) => {
            const ref = doc(db, "links", item.id);
            batch.update(ref, { order: index });
        });
        return batch.commit();
    },
};
