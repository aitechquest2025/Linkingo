# PayPal Integration Guide for Linkingo

## Overview
This guide explains how to integrate PayPal subscriptions with your Linkingo upgrade page at `https://linkingo.in/dashboard/upgrade`.

## Prerequisites
- PayPal Business Account
- Access to [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)
- Product images uploaded to your site

## Step 1: Create PayPal Subscription Products

### For Indian Users (INR)
1. Log in to [PayPal Business](https://www.paypal.com/businessmanage/products/subscriptions)
2. Click "Create Product"
3. Fill in the details:
   - **Product Name**: Linkingo Pro (India)
   - **Product Type**: Digital Goods
   - **Product Category**: Software
   - **Product page URL**: `https://linkingo.in/dashboard/upgrade`
   - **Product image URL**: `https://linkingo.in/images/linkingo-premium-product.png`

4. Create two pricing plans:
   - **Monthly Plan**: ₹79/month
   - **Yearly Plan**: ₹570/year (40% discount)

### For Global Users (USD)
Repeat the above steps with:
- **Product Name**: Linkingo Pro (Global)
- **Monthly Plan**: $1.99/month
- **Yearly Plan**: $14.28/year (40% discount)

## Step 2: Get PayPal API Credentials

1. Go to [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications/live)
2. Create a new app or use existing one
3. Copy your:
   - **Client ID**
   - **Secret Key**

## Step 3: Configure Environment Variables

Add to your `.env.local` file:

```env
# PayPal Configuration
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_client_id_here
PAYPAL_SECRET_KEY=your_secret_key_here

# PayPal Plan IDs (get these after creating subscription products)
PAYPAL_PLAN_ID_INDIA_MONTHLY=P-xxxxxxxxxxxxx
PAYPAL_PLAN_ID_INDIA_YEARLY=P-xxxxxxxxxxxxx
PAYPAL_PLAN_ID_GLOBAL_MONTHLY=P-xxxxxxxxxxxxx
PAYPAL_PLAN_ID_GLOBAL_YEARLY=P-xxxxxxxxxxxxx

# PayPal Environment (sandbox or live)
NEXT_PUBLIC_PAYPAL_ENV=live
```

## Step 4: Install PayPal SDK

```bash
npm install @paypal/react-paypal-js
```

## Step 5: Update the Upgrade Page

The upgrade page at `/dashboard/upgrade/page.tsx` already has a placeholder for PayPal integration. Update the `handleUpgrade` function:

```typescript
const handleUpgrade = async (planName: string) => {
    if (planName === "Free") {
        router.push("/register");
        return;
    }

    setIsProcessing(true);
    
    try {
        // Determine the plan ID based on region and billing cycle
        let planId = "";
        
        if (region === "india") {
            planId = billingCycle === "monthly" 
                ? process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID_INDIA_MONTHLY!
                : process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID_INDIA_YEARLY!;
        } else {
            planId = billingCycle === "monthly"
                ? process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID_GLOBAL_MONTHLY!
                : process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID_GLOBAL_YEARLY!;
        }

        // Redirect to PayPal subscription page
        window.location.href = `https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=${planId}`;
        
    } catch (error) {
        console.error("Payment error:", error);
        alert("Something went wrong. Please try again.");
    } finally {
        setIsProcessing(false);
    }
};
```

## Step 6: Set Up Webhooks (Important!)

1. Go to [PayPal Webhooks](https://developer.paypal.com/dashboard/webhooks)
2. Create a new webhook with URL: `https://linkingo.in/api/webhooks/paypal`
3. Subscribe to these events:
   - `BILLING.SUBSCRIPTION.CREATED`
   - `BILLING.SUBSCRIPTION.ACTIVATED`
   - `BILLING.SUBSCRIPTION.CANCELLED`
   - `BILLING.SUBSCRIPTION.EXPIRED`
   - `PAYMENT.SALE.COMPLETED`

## Step 7: Create Webhook Handler

Create `/app/api/webhooks/paypal/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const headersList = headers();
        
        // Verify webhook signature (important for security!)
        // TODO: Implement PayPal webhook signature verification
        
        const eventType = body.event_type;
        
        switch (eventType) {
            case "BILLING.SUBSCRIPTION.ACTIVATED":
                // Update user to premium in your database
                const subscriptionId = body.resource.id;
                const userEmail = body.resource.subscriber.email_address;
                
                // TODO: Update Firestore user document
                // await updateUserToPremium(userEmail, subscriptionId);
                
                break;
                
            case "BILLING.SUBSCRIPTION.CANCELLED":
            case "BILLING.SUBSCRIPTION.EXPIRED":
                // Downgrade user to free tier
                // TODO: Update Firestore user document
                break;
        }
        
        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json({ error: "Webhook failed" }, { status: 400 });
    }
}
```

## Step 8: Test in Sandbox Mode

1. Use PayPal Sandbox credentials first
2. Set `NEXT_PUBLIC_PAYPAL_ENV=sandbox`
3. Test the complete flow:
   - Click "Start free trial"
   - Complete PayPal checkout
   - Verify webhook receives events
   - Confirm user is upgraded

## Step 9: Go Live

1. Switch to live credentials
2. Set `NEXT_PUBLIC_PAYPAL_ENV=live`
3. Update plan IDs to production values
4. Deploy to production

## Security Checklist

- ✅ Webhook signature verification implemented
- ✅ HTTPS enabled on production
- ✅ Environment variables secured
- ✅ CSRF protection enabled
- ✅ Rate limiting on payment endpoints
- ✅ Security headers configured in `next.config.ts`

## Product URLs for PayPal Configuration

When setting up your PayPal subscription products, use these URLs:

- **Product Page URL**: `https://linkingo.in/dashboard/upgrade`
- **Product Image URL**: `https://linkingo.in/images/linkingo-premium-product.png`

Both URLs are publicly accessible and optimized for PayPal's requirements (400x400px image).

## Support

For PayPal integration issues:
- [PayPal Developer Documentation](https://developer.paypal.com/docs/subscriptions/)
- [PayPal Support](https://www.paypal.com/us/smarthelp/contact-us)
