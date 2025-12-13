import { NextRequest, NextResponse } from "next/server";
import { getPayPalPlanId } from "@/lib/paypal/client";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { region, billingCycle, userId } = body;

        // Validate input
        if (!region || !billingCycle || !userId) {
            return NextResponse.json(
                { error: "Missing required fields: region, billingCycle, userId" },
                { status: 400 }
            );
        }

        if (!["india", "global"].includes(region)) {
            return NextResponse.json(
                { error: "Invalid region. Must be 'india' or 'global'" },
                { status: 400 }
            );
        }

        if (!["monthly", "yearly"].includes(billingCycle)) {
            return NextResponse.json(
                { error: "Invalid billingCycle. Must be 'monthly' or 'yearly'" },
                { status: 400 }
            );
        }

        // Get the appropriate PayPal plan ID
        const planId = getPayPalPlanId(region as "india" | "global", billingCycle as "monthly" | "yearly");

        // Return the plan ID and redirect URL
        // PayPal will handle the subscription creation on their end
        const subscriptionUrl = `https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=${planId}`;

        return NextResponse.json({
            success: true,
            planId,
            subscriptionUrl,
            metadata: {
                region,
                billingCycle,
                userId,
            },
        });
    } catch (error) {
        console.error("Error creating PayPal subscription:", error);
        return NextResponse.json(
            { error: "Failed to create subscription" },
            { status: 500 }
        );
    }
}
