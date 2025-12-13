# Vercel Deployment Configuration

This file contains deployment-specific configurations for Vercel.

## Build Settings
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

## Environment Variables Required

Add these in Vercel Dashboard → Settings → Environment Variables:

### Firebase Configuration
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### PayPal Configuration
```
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_SECRET_KEY=your_paypal_secret_key
PAYPAL_PLAN_ID_INDIA_MONTHLY=P-xxxxxxxxxxxxx
PAYPAL_PLAN_ID_INDIA_YEARLY=P-xxxxxxxxxxxxx
PAYPAL_PLAN_ID_GLOBAL_MONTHLY=P-xxxxxxxxxxxxx
PAYPAL_PLAN_ID_GLOBAL_YEARLY=P-xxxxxxxxxxxxx
NEXT_PUBLIC_PAYPAL_ENV=sandbox
```

**Important**: Change `NEXT_PUBLIC_PAYPAL_ENV` to `live` when ready for production!

### Optional
```
PAYPAL_WEBHOOK_ID=your_webhook_id
```

## Post-Deployment Steps

1. **Update PayPal Webhook URL**
   - Go to PayPal Developer Dashboard
   - Update webhook URL to: `https://linkingo.in/api/webhooks/paypal`
   - Or: `https://your-vercel-domain.vercel.app/api/webhooks/paypal`

2. **Update PayPal Product URLs**
   - Product Page: `https://linkingo.in/dashboard/upgrade`
   - Product Image: `https://linkingo.in/images/linkingo-premium-product.png`

3. **Deploy Firestore Rules**
   - Go to Firebase Console
   - Deploy `firestore.rules`
   - Deploy `firestore.indexes.json`

4. **Test Deployment**
   - Visit `/dashboard/upgrade`
   - Test subscription creation
   - Verify webhook receives events

## Domain Configuration

If using custom domain (linkingo.in):
1. Add domain in Vercel Dashboard
2. Update DNS records as instructed
3. Wait for SSL certificate provisioning
4. Update PayPal URLs to use custom domain
