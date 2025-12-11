import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { LinkItem } from "@/lib/links";

export interface UserProfile {
    uid: string;
    username: string;
    displayName?: string;
    photoURL?: string;
    bio?: string;
    themeId?: string;
}

export async function getUserByUsername(username: string): Promise<UserProfile | null> {
    try {
        const q = query(
            collection(db, "users"),
            where("username", "==", username),
            limit(1)
        );
        const snapshot = await getDocs(q);

        if (snapshot.empty) return null;

        return snapshot.docs[0].data() as UserProfile;
    } catch (error) {
        console.error("Error fetching user by username:", error);
        return null;
    }
}

export async function getUserLinks(userId: string): Promise<LinkItem[]> {
    try {
        const q = query(
            collection(db, "links"),
            where("userId", "==", userId),
            where("isVisible", "==", true) // Only show visible links
        );
        const snapshot = await getDocs(q);

        const links = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as LinkItem[];

        // --- Smart Logic Filter ---
        // In a real implementation, getting the country requires header parsing (e.g. x-vercel-ip-country)
        // For this MVP, we will simulate or default to 'IN' if mostly Indian users.
        // Or we can pass the country as an argument if we fetch it in the page component.
        const visitorCountry = "IN"; // Mocked for now.

        const filteredLinks = links.filter(link => {
            if (!link.isVisible) return false;

            // Geo-Fencing Check
            if (link.smartRules?.geo?.enabled) {
                const allowed = link.smartRules.geo.countryCodes;
                if (allowed && allowed.length > 0 && !allowed.includes(visitorCountry)) {
                    return false; // Hide link if country doesn't match
                }
            }
            return true;
        });

        // Sort by 'order' manually since we might not have a composite index set up yet
        return filteredLinks.sort((a, b) => a.order - b.order);
    } catch (error) {
        console.error("Error fetching user links:", error);
        return [];
    }
}
