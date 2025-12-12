import { NextResponse } from "next/server";
import { doc, getDoc, updateDoc, increment, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ code: string }> }
) {
    const { code } = await params;

    try {
        // Find the short link
        const q = query(collection(db, "shortLinks"), where("code", "==", code));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return NextResponse.redirect(new URL("/", request.url));
        }

        const linkDoc = snapshot.docs[0];
        const linkData = linkDoc.data();

        // Increment click count
        await updateDoc(doc(db, "shortLinks", linkDoc.id), {
            clicks: increment(1)
        });

        // Redirect to original URL
        return NextResponse.redirect(linkData.originalUrl);
    } catch (error) {
        console.error("Error redirecting short link:", error);
        return NextResponse.redirect(new URL("/", request.url));
    }
}
