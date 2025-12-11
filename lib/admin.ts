import { db } from "@/lib/firebase";
import {
    collection,
    getCountFromServer,
    query,
    where,
    getDocs,
    orderBy,
    limit,
    Timestamp,
} from "firebase/firestore";

export interface DashboardStats {
    totalUsers: number;
    totalLinks: number;
    totalRevenue: number; // Placeholder for platform revenue
    recentUsers: any[];
}

export const adminService = {
    getStats: async (): Promise<DashboardStats> => {
        try {
            // 1. Total Users Count (Efficient Aggregation)
            const usersSnap = await getCountFromServer(collection(db, "users"));

            // 2. Total Links Count
            const linksSnap = await getCountFromServer(collection(db, "links"));

            // 3. Recent Users (Last 5)
            const recentUsersQ = query(
                collection(db, "users"),
                orderBy("createdAt", "desc"),
                limit(5)
            );
            const recentUsersSnap = await getDocs(recentUsersQ);
            const recentUsers = recentUsersSnap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            return {
                totalUsers: usersSnap.data().count,
                totalLinks: linksSnap.data().count,
                totalRevenue: 0, // Implement real aggregation later
                recentUsers,
            };
        } catch (error) {
            console.error("Error fetching admin stats:", error);
            return { totalUsers: 0, totalLinks: 0, totalRevenue: 0, recentUsers: [] };
        }
    },

    getAllUsers: async () => {
        const q = query(collection(db, "users"), orderBy("createdAt", "desc"), limit(100)); // Limit 100 for now
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
};
