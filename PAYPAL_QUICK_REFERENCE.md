# PayPal Integration - Quick Reference

## Environment Variables (.env.local)
```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_client_id
PAYPAL_SECRET_KEY=your_secret_key
PAYPAL_PLAN_ID_INDIA_MONTHLY=P-xxxxx
PAYPAL_PLAN_ID_INDIA_YEARLY=P-xxxxx
PAYPAL_PLAN_ID_GLOBAL_MONTHLY=P-xxxxx
PAYPAL_PLAN_ID_GLOBAL_YEARLY=P-xxxxx
NEXT_PUBLIC_PAYPAL_ENV=sandbox  # or 'live'
```

## API Endpoints

### Create Subscription
**POST** `/api/paypal/create-subscription`
```json
{
  "region": "india",
  "billingCycle": "monthly",
  "userId": "firebase_user_id"
}
```

### Webhook Handler
**POST** `/api/webhooks/paypal`
- Receives PayPal subscription events
- Auto-upgrades/downgrades users

## Pricing Strategy
| Display (INR) | Charge (USD) | Period |
|---------------|--------------|--------|
| ₹79 | $0.88 | Monthly |
| ₹570 | $6.30 | Yearly |

## User Flow
1. User clicks "Start free trial" → `/dashboard/upgrade`
2. API creates subscription → `/api/paypal/create-subscription`
3. Redirect to PayPal checkout
4. User completes payment
5. Webhook activates subscription → `/api/webhooks/paypal`
6. User upgraded in Firestore

## Firestore Schema
```typescript
users/{userId} {
  subscription: {
    status: "free" | "premium" | "cancelled"
    subscriptionId: "I-xxxxx"
    planId: "P-xxxxx"
    billingCycle: "monthly" | "yearly"
    region: "india" | "global"
    startDate: Timestamp
    endDate: Timestamp | null
    updatedAt: Timestamp
  }
}
```

## Testing Commands
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Test webhook locally with ngrok
ngrok http 3000
```

## PayPal Dashboard URLs
- **Sandbox**: https://developer.paypal.com/dashboard/
- **Live**: https://www.paypal.com/businessmanage/
- **Webhooks**: https://developer.paypal.com/dashboard/webhooks

## Deployment Checklist
- [ ] Update `.env` to `NEXT_PUBLIC_PAYPAL_ENV=live`
- [ ] Switch to live PayPal credentials
- [ ] Update plan IDs to production
- [ ] Configure webhook: `https://linkingo.in/api/webhooks/paypal`
- [ ] Deploy Firestore rules & indexes
- [ ] Test with real payment
- [ ] Monitor webhook logs

## Files Created
- `lib/paypal/client.ts` - PayPal configuration
- `app/api/paypal/create-subscription/route.ts` - Subscription API
- `app/api/webhooks/paypal/route.ts` - Webhook handler
- `lib/server/subscription.ts` - Database service
- `types/paypal.d.ts` - TypeScript declarations

## Key Functions
```typescript
// Upgrade user
upgradeUserToPremium(userId, subscriptionData)

// Downgrade user
downgradeUserToFree(userId)

// Get status
getSubscriptionStatus(userId)

// Find by subscription ID
findUserBySubscriptionId(subscriptionId)
```

## Support
- [PayPal API Docs](https://developer.paypal.com/docs/subscriptions/)
- [Webhook Events](https://developer.paypal.com/api/rest/webhooks/)
- [Testing Guide](./TESTING_GUIDE.md)
- [Full Integration Guide](./PAYPAL_INTEGRATION.md)
