"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const ADMIN_EMAILS = ["admin@linkingo.com", "rakesh@gmail.com"]; // Hardcoded for MVP, ideally in Firestore 'roles' collection

export function useAdminProtection() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        if (loading) return;

        if (!user) {
            router.push("/login");
            return;
        }

        // Check if user email is in the admin list
        // In a real app, you'd check a "role" field in Firestore claims
        const checkRole = async () => {
            // Option 1: Simple Email whitelist (Best for initial MVP)
            if (ADMIN_EMAILS.includes(user.email || "")) {
                setIsSuperAdmin(true);
            } else {
                // Option 2: Check Firestore strictly
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists() && userDoc.data().role === "super_admin") {
                    setIsSuperAdmin(true);
                } else {
                    router.push("/admin"); // Redirect regular users back to normal dashboard
                }
            }
            setChecking(false);
        };

        checkRole();
    }, [user, loading, router]);

    return { isSuperAdmin, checking };
}
