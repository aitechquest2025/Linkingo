"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithPhoneNumber,
    RecaptchaVerifier,
    signOut,
    User,
    ApplicationVerifier,
    ConfirmationResult
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                await saveUserToFirestore(currentUser);
                // Fetch user data from Firestore
                await loadUserData(currentUser.uid);
            } else {
                setUser(null);
                setUserData(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const loadUserData = async (uid: string) => {
        try {
            const userRef = doc(db, "users", uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                setUserData(userSnap.data());
            }
        } catch (error) {
            console.error("Error loading user data:", error);
        }
    };

    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            router.push("/dashboard");
        } catch (error) {
            console.error("Error signing in with Google", error);
            throw error;
        }
    };

    const loginWithEmail = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/dashboard");
        } catch (error) {
            console.error("Error signing in with Email", error);
            throw error;
        }
    };

    const registerWithEmail = async (email: string, password: string) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            // Firestore save is handled by useEffect
            router.push("/dashboard");
            return result;
        } catch (error) {
            console.error("Error registering with Email", error);
            throw error;
        }
    };

    const resetPassword = async (email: string) => {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            console.error("Error sending reset email", error);
            throw error;
        }
    };

    const loginWithPhone = async (phoneNumber: string, appVerifier: ApplicationVerifier) => {
        try {
            const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
            return confirmationResult;
        } catch (error) {
            console.error("Error initiating phone login", error);
            throw error;
        }
    };

    const verifyPhoneOtp = async (confirmationResult: ConfirmationResult, otp: string) => {
        try {
            await confirmationResult.confirm(otp);
            router.push("/dashboard");
        } catch (error) {
            console.error("Error verifying OTP", error);
            throw error;
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
            const username = user.email ? user.email.split("@")[0] : `user_${user.uid.slice(0, 5)}`;
            await setDoc(userRef, {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                phoneNumber: user.phoneNumber,
                username: username,
                createdAt: serverTimestamp(),
            });
        }
    };

    return {
        user,
        userData,
        loading,
        signInWithGoogle,
        loginWithEmail,
        registerWithEmail,
        resetPassword,
        loginWithPhone,
        verifyPhoneOtp,
        logout
    };
}
