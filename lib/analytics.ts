import { collection, addDoc, query, where, getDocs, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

export interface AnalyticsEvent {
    userId: string;
    linkId?: string;
    type: "click" | "view";
    timestamp: any;
    metadata?: {
        referrer?: string;
        userAgent?: string;
    };
}

export interface LinkAnalytics {
    linkId: string;
    linkTitle: string;
    clicks: number;
    views: number;
    clickRate: number;
}

/**
 * Track an analytics event
 */
export async function trackEvent(event: Omit<AnalyticsEvent, "timestamp">) {
    try {
        await addDoc(collection(db, "analytics"), {
            ...event,
            timestamp: serverTimestamp(),
        });
        return { success: true };
    } catch (error) {
        console.error("Error tracking event:", error);
        return { success: false, error };
    }
}

/**
 * Get analytics for a specific user
 */
export async function getUserAnalytics(userId: string, days: number = 30) {
    try {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        const q = query(
            collection(db, "analytics"),
            where("userId", "==", userId),
            where("timestamp", ">=", Timestamp.fromDate(startDate))
        );

        const snapshot = await getDocs(q);
        const events = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                userId: data.userId,
                linkId: data.linkId,
                type: data.type,
                timestamp: data.timestamp,
                metadata: data.metadata
            } as AnalyticsEvent;
        });

        return events;
    } catch (error) {
        console.error("Error fetching analytics:", error);
        return [];
    }
}

/**
 * Get link performance analytics
 */
export async function getLinkAnalytics(userId: string, links: any[], days: number = 30): Promise<LinkAnalytics[]> {
    try {
        const events = await getUserAnalytics(userId, days);

        const linkStats = links.map(link => {
            const linkClicks = events.filter(e => e.type === "click" && e.linkId === link.id);
            const linkViews = events.filter(e => e.type === "view");

            const clicks = linkClicks.length;
            const views = linkViews.length || 1; // Avoid division by zero
            const clickRate = (clicks / views) * 100;

            return {
                linkId: link.id,
                linkTitle: link.title,
                clicks,
                views,
                clickRate: parseFloat(clickRate.toFixed(1))
            };
        });

        return linkStats.sort((a, b) => b.clicks - a.clicks);
    } catch (error) {
        console.error("Error calculating link analytics:", error);
        return [];
    }
}

/**
 * Get total stats for a user
 */
export async function getTotalStats(userId: string, days: number = 30) {
    try {
        const events = await getUserAnalytics(userId, days);

        const totalClicks = events.filter(e => e.type === "click").length;
        const totalViews = events.filter(e => e.type === "view").length;
        const clickRate = totalViews > 0 ? (totalClicks / totalViews) * 100 : 0;

        return {
            totalClicks,
            totalViews,
            clickRate: parseFloat(clickRate.toFixed(1))
        };
    } catch (error) {
        console.error("Error calculating total stats:", error);
        return {
            totalClicks: 0,
            totalViews: 0,
            clickRate: 0
        };
    }
}
