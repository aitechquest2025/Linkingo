# PayPal Integration Testing Guide

## Quick Start Testing

### 1. Verify Environment Variables
Check your `.env.local` has all required variables:
```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_client_id
PAYPAL_SECRET_KEY=your_secret_key
PAYPAL_PLAN_ID_INDIA_MONTHLY=P-xxxxx
PAYPAL_PLAN_ID_INDIA_YEARLY=P-xxxxx
PAYPAL_PLAN_ID_GLOBAL_MONTHLY=P-xxxxx
PAYPAL_PLAN_ID_GLOBAL_YEARLY=P-xxxxx
NEXT_PUBLIC_PAYPAL_ENV=sandbox
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Test Subscription Flow

#### Step 1: Navigate to Upgrade Page
Open: `http://localhost:3000/dashboard/upgrade`

#### Step 2: Select Options
- Choose region: India or Global
- Choose billing: Monthly or Yearly

#### Step 3: Click "Start free trial"
- Should call `/api/paypal/create-subscription`
- Should redirect to PayPal checkout page

#### Step 4: Complete Payment (Sandbox)
- Use PayPal sandbox test account
- Complete the payment flow
- PayPal will redirect back to your site

#### Step 5: Verify Webhook
- Check your terminal/console for webhook logs
- Webhook should receive `BILLING.SUBSCRIPTION.ACTIVATED` event
- User should be upgraded in Firestore

### 4. Deploy Firestore Rules (Manual)

Since Firebase CLI isn't configured, deploy rules manually:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Firestore Database** → **Rules**
4. Copy content from `firestore.rules` and paste
5. Click **Publish**

Then deploy indexes:
1. Navigate to **Firestore Database** → **Indexes**
2. Click **Add Index**
3. Collection: `users`
4. Field: `subscription.subscriptionId` (Ascending)
5. Query scope: Collection
6. Click **Create**

### 5. Configure PayPal Webhook

1. Go to [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/webhooks)
2. Click **Add Webhook**
3. Webhook URL: `https://linkingo.in/api/webhooks/paypal` (or your ngrok URL for local testing)
4. Select events:
   - BILLING.SUBSCRIPTION.CREATED
   - BILLING.SUBSCRIPTION.ACTIVATED
   - BILLING.SUBSCRIPTION.CANCELLED
   - BILLING.SUBSCRIPTION.EXPIRED
   - PAYMENT.SALE.COMPLETED
5. Save

### 6. Local Webhook Testing (Optional)

Use ngrok to test webhooks locally:

```bash
# Install ngrok
npm install -g ngrok

# Start ngrok tunnel
ngrok http 3000

# Use the ngrok URL for webhook:
# https://xxxxx.ngrok.io/api/webhooks/paypal
```

## Testing Checklist

### API Routes
- [ ] `/api/paypal/create-subscription` returns subscription URL
- [ ] Validates input (region, billingCycle, userId)
- [ ] Returns correct plan ID based on selection

### Webhook Handler
- [ ] Receives webhook events from PayPal
- [ ] Verifies webhook signature
- [ ] Upgrades user on ACTIVATED event
- [ ] Downgrades user on CANCELLED/EXPIRED events
- [ ] Logs payment on SALE.COMPLETED event

### Database Updates
- [ ] User subscription status changes to "premium"
- [ ] Subscription ID is stored
- [ ] Plan ID is stored
- [ ] Start date is recorded
- [ ] Billing cycle and region are saved

### User Experience
- [ ] Upgrade page displays correctly
- [ ] Pricing shows INR amounts
- [ ] Region toggle works
- [ ] Billing cycle toggle works
- [ ] "Start free trial" button redirects to PayPal
- [ ] Loading state shows during redirect
- [ ] Error handling works for failed payments

## Common Issues & Solutions

### Issue: "Failed to create subscription"
**Solution**: Check that environment variables are set correctly

### Issue: Webhook not receiving events
**Solution**: 
- Verify webhook URL is publicly accessible
- Check PayPal webhook configuration
- Use ngrok for local testing

### Issue: User not upgraded after payment
**Solution**:
- Check webhook logs in terminal
- Verify Firestore rules allow webhook updates
- Check subscription.subscriptionId index exists

### Issue: TypeScript errors
**Solution**: Run `npm run build` to check for compilation errors

## Production Deployment

### Before Going Live:
1. Switch `NEXT_PUBLIC_PAYPAL_ENV=live`
2. Update to live PayPal credentials
3. Update plan IDs to production values
4. Update webhook URL to production domain
5. Test with small real payment first
6. Monitor first 10-20 transactions

### Deployment Commands:
```bash
# Build
npm run build

# Deploy to Vercel/Netlify
git add .
git commit -m "Add PayPal subscription integration"
git push origin main
```

## Monitoring

### Check These Logs:
- PayPal webhook events in server logs
- Firestore write operations
- API route responses
- Payment completion events

### PayPal Dashboard:
- View all subscriptions
- Check payment history
- Monitor webhook delivery status
- View failed webhooks

## Support

If you encounter issues:
1. Check browser console for errors
2. Check server logs for API errors
3. Verify PayPal webhook delivery in dashboard
4. Check Firestore for subscription updates
5. Review [PayPal Docs](https://developer.paypal.com/docs/subscriptions/)

---

**Ready to test!** Start your dev server and navigate to `/dashboard/upgrade` to begin testing the subscription flow.
