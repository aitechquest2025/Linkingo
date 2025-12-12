import { NextRequest, NextResponse } from "next/server";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId, linkId, type, metadata } = body;

        // Validate required fields
        if (!userId || !type) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Validate type
        if (type !== "click" && type !== "view") {
            return NextResponse.json(
                { success: false, error: "Invalid event type" },
                { status: 400 }
            );
        }

        // Create analytics document
        const docRef = await addDoc(collection(db, "analytics"), {
            userId,
            linkId: linkId || null,
            type,
            timestamp: serverTimestamp(),
            metadata: metadata || {}
        });

        return NextResponse.json({
            success: true,
            id: docRef.id
        });
    } catch (error) {
        console.error("Error tracking event:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
