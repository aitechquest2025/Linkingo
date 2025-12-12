"use client";

import ReCAPTCHA from "react-google-recaptcha";

interface RecaptchaProps {
    onChange: (token: string | null) => void;
}

export function Recaptcha({ onChange }: RecaptchaProps) {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    if (!siteKey) {
        console.error("reCAPTCHA site key not configured");
        return null;
    }

    return (
        <div className="flex justify-center my-4">
            <ReCAPTCHA
                sitekey={siteKey}
                onChange={onChange}
                size="invisible"
                badge="bottomright"
            />
        </div>
    );
}
