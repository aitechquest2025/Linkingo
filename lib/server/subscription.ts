import { db } from "@/lib/firebase";
import { doc, updateDoc, Timestamp, getDoc } from "firebase/firestore";

export interface SubscriptionData {
    subscriptionId: string;
    planId: string;
    status: "active" | "cancelled" | "expired";
    billingCycle: "monthly" | "yearly";
    region: "india" | "global";
    startDate: Date;
    endDate?: Date;
}

/**
 * Upgrade user to premium subscription
 */
export async function upgradeUserToPremium(
    userId: string,
    subscriptionData: SubscriptionData
): Promise<void> {
    try {
        const userRef = doc(db, "users", userId);

        await updateDoc(userRef, {
            "subscription.status": "premium",
            "subscription.subscriptionId": subscriptionData.subscriptionId,
            "subscription.planId": subscriptionData.planId,
            "subscription.billingCycle": subscriptionData.billingCycle,
            "subscription.region": subscriptionData.region,
            "subscription.startDate": Timestamp.fromDate(subscriptionData.startDate),
            "subscription.endDate": subscriptionData.endDate
                ? Timestamp.fromDate(subscriptionData.endDate)
                : null,
            "subscription.updatedAt": Timestamp.now(),
        });

        console.log(`User ${userId} upgraded to premium`);
    } catch (error) {
        console.error(`Error upgrading user ${userId}:`, error);
        throw error;
    }
}

/**
 * Downgrade user to free tier
 */
export async function downgradeUserToFree(userId: string): Promise<void> {
    try {
        const userRef = doc(db, "users", userId);

        await updateDoc(userRef, {
            "subscription.status": "free",
            "subscription.subscriptionId": null,
            "subscription.planId": null,
            "subscription.billingCycle": null,
            "subscription.region": null,
            "subscription.endDate": Timestamp.now(),
            "subscription.updatedAt": Timestamp.now(),
        });

        console.log(`User ${userId} downgraded to free`);
    } catch (error) {
        console.error(`Error downgrading user ${userId}:`, error);
        throw error;
    }
}

/**
 * Get user's subscription status
 */
export async function getSubscriptionStatus(userId: string): Promise<{
    status: "free" | "premium" | "cancelled";
    subscriptionId: string | null;
    billingCycle: string | null;
    region: string | null;
} | null> {
    try {
        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            return null;
        }

        const data = userDoc.data();
        return {
            status: data.subscription?.status || "free",
            subscriptionId: data.subscription?.subscriptionId || null,
            billingCycle: data.subscription?.billingCycle || null,
            region: data.subscription?.region || null,
        };
    } catch (error) {
        console.error(`Error getting subscription status for user ${userId}:`, error);
        return null;
    }
}

/**
 * Find user by PayPal subscription ID
 */
export async function findUserBySubscriptionId(subscriptionId: string): Promise<string | null> {
    try {
        // Note: This requires a Firestore index on subscription.subscriptionId
        // You'll need to create this index in Firebase Console or firestore.indexes.json
        const { collection, query, where, getDocs } = await import("firebase/firestore");

        const usersRef = collection(db, "users");
        const q = query(usersRef, where("subscription.subscriptionId", "==", subscriptionId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return null;
        }

        return querySnapshot.docs[0].id;
    } catch (error) {
        console.error(`Error finding user by subscription ID ${subscriptionId}:`, error);
        return null;
    }
}
