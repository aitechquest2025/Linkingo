"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { QrCode, Download, Loader2, Crown } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";

export default function QRCodePage() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isPremium, setIsPremium] = useState(false);
    const [username, setUsername] = useState("");
    const qrRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        checkPremiumAccess();
    }, [user]);

    const checkPremiumAccess = async () => {
        if (!user) {
            router.push("/login");
            return;
        }

        setLoading(true);
        try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                const premium = userData.subscriptionStatus === "premium";
                setIsPremium(premium);
                setUsername(userData.username || user.email?.split("@")[0] || "");

                if (!premium) {
                    router.push("/dashboard/upgrade");
                }
            }
        } catch (error) {
            console.error("Error checking premium access:", error);
        } finally {
            setLoading(false);
        }
    };

    const downloadQR = () => {
        const svg = qrRef.current?.querySelector("svg");
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL("image/png");

            const downloadLink = document.createElement("a");
            downloadLink.download = `linkingo-${username}-qr.png`;
            downloadLink.href = pngFile;
            downloadLink.click();
        };

        img.src = "data:image/svg+xml;base64," + btoa(svgData);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
            </div>
        );
    }

    if (!isPremium) {
        return null;
    }

    const profileUrl = `https://linkingo.in/${username}`;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-black mb-2">QR Code Generator</h1>
                <p className="text-zinc-600">Generate a QR code for your profile</p>
            </div>

            <Card className="border-gray-200 bg-white">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <QrCode className="h-5 w-5 text-purple-600" />
                        <CardTitle className="text-black">Your Profile QR Code</CardTitle>
                        <Crown className="h-4 w-4 text-amber-500" />
                    </div>
                    <CardDescription>Share your profile with a scannable QR code</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* QR Code Display */}
                    <div className="flex flex-col items-center gap-6">
                        <div
                            ref={qrRef}
                            className="bg-white p-8 rounded-lg border-2 border-zinc-200 shadow-lg"
                        >
                            <QRCode
                                value={profileUrl}
                                size={256}
                                level="H"
                                fgColor="#000000"
                                bgColor="#ffffff"
                            />
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-zinc-600 mb-2">Scan to visit:</p>
                            <p className="text-lg font-semibold text-violet-600">{profileUrl}</p>
                        </div>
                    </div>

                    {/* Download Button */}
                    <div className="flex justify-center">
                        <Button
                            onClick={downloadQR}
                            className="bg-violet-600 hover:bg-violet-700 text-white"
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Download QR Code
                        </Button>
                    </div>

                    {/* Usage Tips */}
                    <div className="bg-violet-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-black mb-2">💡 Usage Tips</h3>
                        <ul className="text-sm text-zinc-700 space-y-1">
                            <li>• Print on business cards or flyers</li>
                            <li>• Add to social media posts</li>
                            <li>• Display at events or presentations</li>
                            <li>• Share in email signatures</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
