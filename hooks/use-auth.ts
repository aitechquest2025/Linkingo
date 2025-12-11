"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase"; // Ensure this path is correct
import {
    onAuthStateChanged,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    signOut,
    User,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                // Optional: sync user to Firestore on login
                await saveUserToFirestore(currentUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            router.push("/admin"); // Redirect to dashboard
        } catch (error) {
            console.error("Error signing in with Google", error);
        }
    };

    const signInWithGithub = async () => {
        try {
            const provider = new GithubAuthProvider();
            await signInWithPopup(auth, provider);
            router.push("/admin");
        } catch (error) {
            console.error("Error signing in with Github", error);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            router.push("/login");
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    const saveUserToFirestore = async (user: User) => {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            const username = user.email?.split("@")[0] || `user_${user.uid.slice(0, 5)}`;
            await setDoc(userRef, {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                username: username, // Default username
                createdAt: serverTimestamp(),
            });
        }
    };

    return { user, loading, signInWithGoogle, signInWithGithub, logout };
}
