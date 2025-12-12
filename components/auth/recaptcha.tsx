"use client";

import ReCAPTCHA from "react-google-recaptcha";

interface RecaptchaProps {
    onChange: (token: string | null) => void;
}

export function Recaptcha({ onChange }: RecaptchaProps) {
    // Use dummy test key if env var is missing
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

    return (
        <div className="flex justify-center my-4">
            <ReCAPTCHA
                sitekey={siteKey}
                onChange={onChange}
                theme="dark"
            />
        </div>
    );
}
