"use client";

import ReCAPTCHA from "react-google-recaptcha";
import { useEffect } from "react";

interface RecaptchaProps {
    onChange: (token: string | null) => void;
}

export function Recaptcha({ onChange }: RecaptchaProps) {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    useEffect(() => {
        if (!siteKey) {
            // Auto-pass if no key configured (for development)
            onChange("dev-bypass-token");
        }
    }, [siteKey, onChange]);

    if (!siteKey) {
        return (
            <div className="text-yellow-600 text-sm text-center my-4 bg-yellow-50 p-3 rounded">
                ⚠️ reCAPTCHA not configured (development mode)
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
