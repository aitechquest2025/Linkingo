"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function ConsentBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if consent is already given
        const consent = localStorage.getItem("dpdp-consent");
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("dpdp-consent", "accepted");
        setIsVisible(false);
    };

    const handleDecline = () => {
        // In a real app, you might disable analytics cookies here
        localStorage.setItem("dpdp-consent", "declined");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-5 duration-500">
            <div className="mx-auto max-w-4xl rounded-xl border border-zinc-800 bg-zinc-950/90 p-6 shadow-2xl backdrop-blur-xl md:flex md:items-center md:justify-between">
                <div className="mb-4 md:mb-0 md:mr-8">
                    <h3 className="text-lg font-semibold text-white">Your Privacy Matters</h3>
                    <p className="mt-2 text-sm text-zinc-400">
                        We use cookies and similar technologies to enhance your experience and analyze platform usage, in compliance with the <span className="text-amber-500 font-medium">Digital Personal Data Protection Act (DPDP) 2023</span>.
                    </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                        variant="ghost"
                        onClick={handleDecline}
                        className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                    >
                        Decline
                    </Button>
                    <Button
                        onClick={handleAccept}
                        className="bg-amber-500 text-black hover:bg-amber-600 font-semibold"
                    >
                        Accept & Continue
                    </Button>
                </div>
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-2 right-2 p-2 text-zinc-500 hover:text-white md:hidden"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
