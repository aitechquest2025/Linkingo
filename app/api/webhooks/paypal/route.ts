import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { verifyWebhookSignature } from "@/lib/paypal/client";
import {
    upgradeUserToPremium,
    downgradeUserToFree,
    findUserBySubscriptionId,
} from "@/lib/server/subscription";

export async function POST(request: NextRequest) {
    try {
        const body = await request.text();
        const headersList = await headers();

        // Convert headers to Record<string, string>
        const headersObj: Record<string, string> = {};
        for (const [key, value] of headersList.entries()) {
            headersObj[key] = value;
        }

        // Verify webhook signature for security
        const isValid = await verifyWebhookSignature(headersObj, body);

        if (!isValid) {
            console.error("Invalid webhook signature");
            return NextResponse.json(
                { error: "Invalid signature" },
                { status: 401 }
            );
        }

        const event = JSON.parse(body);
        const eventType = event.event_type;

        console.log(`Received PayPal webhook: ${eventType}`);

        switch (eventType) {
            case "BILLING.SUBSCRIPTION.ACTIVATED": {
                // User successfully subscribed
                const subscriptionId = event.resource.id;
                const planId = event.resource.plan_id;
                const subscriberEmail = event.resource.subscriber?.email_address;
                const startTime = new Date(event.resource.start_time);

                console.log(`Subscription activated: ${subscriptionId} for ${subscriberEmail}`);

                // Find user by subscription ID or email
                // Note: You may need to store userId in custom_id during subscription creation
                const userId = event.resource.custom_id || await findUserBySubscriptionId(subscriptionId);

                if (!userId) {
                    console.error(`User not found for subscription ${subscriptionId}`);
                    return NextResponse.json({ received: true, warning: "User not found" });
                }

                // Determine billing cycle and region from plan ID
                const billingCycle = planId.includes("MONTHLY") ? "monthly" : "yearly";
                const region = planId.includes("INDIA") ? "india" : "global";

                await upgradeUserToPremium(userId, {
                    subscriptionId,
                    planId,
                    status: "active",
                    billingCycle: billingCycle as "monthly" | "yearly",
                    region: region as "india" | "global",
                    startDate: startTime,
                });

                break;
            }

            case "BILLING.SUBSCRIPTION.CANCELLED":
            case "BILLING.SUBSCRIPTION.EXPIRED": {
                // User cancelled or subscription expired
                const subscriptionId = event.resource.id;

                console.log(`Subscription ${eventType.toLowerCase()}: ${subscriptionId}`);

                const userId = await findUserBySubscriptionId(subscriptionId);

                if (!userId) {
                    console.error(`User not found for subscription ${subscriptionId}`);
                    return NextResponse.json({ received: true, warning: "User not found" });
                }

                await downgradeUserToFree(userId);

                break;
            }

            case "PAYMENT.SALE.COMPLETED": {
                // Payment successfully processed
                const saleId = event.resource.id;
                const amount = event.resource.amount.total;
                const currency = event.resource.amount.currency;

                console.log(`Payment completed: ${saleId} - ${currency} ${amount}`);

                // You can log this for analytics/revenue tracking
                // await logPayment(saleId, amount, currency);

                break;
            }

            case "BILLING.SUBSCRIPTION.CREATED": {
                // Subscription created but not yet activated
                console.log(`Subscription created: ${event.resource.id}`);
                // No action needed, wait for ACTIVATED event
                break;
            }

            default:
                console.log(`Unhandled webhook event type: ${eventType}`);
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("PayPal webhook error:", error);
        return NextResponse.json(
            { error: "Webhook processing failed" },
            { status: 500 }
        );
    }
}
