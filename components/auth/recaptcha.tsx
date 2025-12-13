"use client";

import ReCAPTCHA from "react-google-recaptcha";
import { useEffect } from "react";

interface RecaptchaProps {
    onChange: (token: string | null) => void;
}

export function Recaptcha({ onChange }: RecaptchaProps) {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    useEffect(() => {
        // Auto-pass if no key configured (for development)
        if (!siteKey) {
            console.log("reCAPTCHA: Development mode - auto-bypassing");
            onChange("dev-bypass-token");
        }
    }, []); // Remove dependencies to ensure it runs immediately

    if (!siteKey) {
        return (
            <div className="text-yellow-600 text-sm text-center my-4 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded">
                ⚠️ reCAPTCHA not configured (development mode - auto-bypassed)
            </div>
        );
    }

    return (
        <div className="flex justify-center my-4">
            <ReCAPTCHA
                sitekey={siteKey}
                onChange={onChange}
                theme="light"
            />
        </div>
    );
}
