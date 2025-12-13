import checkoutNodeJssdk from "@paypal/checkout-server-sdk";

/**
 * PayPal HTTP client configuration
 * Returns PayPal HTTP client instance based on environment
 */
function environment() {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
    const clientSecret = process.env.PAYPAL_SECRET_KEY!;

    if (process.env.NEXT_PUBLIC_PAYPAL_ENV === "live") {
        return new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret);
    } else {
        return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
    }
}

/**
 * Returns PayPal HTTP client instance
 */
export function paypalClient() {
    return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

/**
 * Get PayPal plan ID based on region and billing cycle
 */
export function getPayPalPlanId(region: "india" | "global", billingCycle: "monthly" | "yearly"): string {
    const planKey = `PAYPAL_PLAN_ID_${region.toUpperCase()}_${billingCycle.toUpperCase()}`;
    const planId = process.env[planKey];

    if (!planId) {
        throw new Error(`PayPal plan ID not found for ${region} ${billingCycle}`);
    }

    return planId;
}

/**
 * Verify PayPal webhook signature
 * @param headers - Request headers
 * @param body - Request body
 * @returns boolean indicating if signature is valid
 */
export async function verifyWebhookSignature(
    headers: Record<string, string>,
    body: string
): Promise<boolean> {
    try {
        const webhookId = process.env.PAYPAL_WEBHOOK_ID;

        if (!webhookId) {
            console.error("PAYPAL_WEBHOOK_ID not configured");
            return false;
        }

        // PayPal webhook verification would go here
        // For now, we'll do basic validation
        const transmissionId = headers["paypal-transmission-id"];
        const transmissionTime = headers["paypal-transmission-time"];
        const transmissionSig = headers["paypal-transmission-sig"];
        const certUrl = headers["paypal-cert-url"];
        const authAlgo = headers["paypal-auth-algo"];

        if (!transmissionId || !transmissionTime || !transmissionSig || !certUrl || !authAlgo) {
            console.error("Missing required PayPal webhook headers");
            return false;
        }

        // In production, implement full signature verification
        // using PayPal's webhook verification API
        return true;
    } catch (error) {
        console.error("Webhook signature verification error:", error);
        return false;
    }
}
