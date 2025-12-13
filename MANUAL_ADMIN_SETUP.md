# Manual Super Admin Setup (Recommended)

Since the script requires special Firestore permissions, it's easier and more secure to set up super admin access manually through the Firebase Console.

## Step-by-Step Instructions

### Step 1: Login to Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your Linkingo project
3. Click on "Firestore Database" in the left sidebar

### Step 2: Find Your User Document

1. Click on the `users` collection
2. Find the document with your email (`aitechquest2025@gmail.com`)
3. Click on the document ID to open it

**Tip**: If you can't find it, use the Filter feature:
- Click "Filter" button
- Field: `email`
- Operator: `==`
- Value: `aitechquest2025@gmail.com`

### Step 3: Add Super Admin Role

1. In the document editor, click "Add field" (or edit existing fields)
2. Add/Update these fields:

**Field 1: role**
```
Field: role
Type: string
Value: superadmin
```

**Field 2: subscription** (nested object)
```
Field: subscription
Type: map
```

Then add these sub-fields to `subscription`:
- `status` (string): `active`
- `plan` (string): `pro`
- `startDate` (timestamp): Click "Set to current time"
- `endDate` (timestamp): Set to 1 year from now
- `subscriptionId` (string): `sub_admin_2025`

### Step 4: Save Changes

1. Click "Update" or "Save"
2. Refresh your browser on linkingo.in
3. You now have super admin + Pro access!

## Visual Guide

### Finding Your User Document

```
Firestore Database
└── users (collection)
    └── [your-uid] (document)
        ├── email: "aitechquest2025@gmail.com"
        ├── username: "aitechquest"
        ├── role: "superadmin" ← ADD THIS
        └── subscription: {
            ├── status: "active" ← ADD THIS
            ├── plan: "pro" ← ADD THIS
            ├── startDate: [timestamp] ← ADD THIS
            ├── endDate: [timestamp] ← ADD THIS
            └── subscriptionId: "sub_admin_2025" ← ADD THIS
        }
```

## What You'll Get

After saving:
- ✅ Super Admin access (`/super-admin` dashboard)
- ✅ Pro subscription (all premium features)
- ✅ Custom domain access
- ✅ Premium themes, backgrounds, fonts, animations
- ✅ Advanced analytics
- ✅ Remove branding

## Access Your Dashboards

- **User Dashboard**: https://linkingo.in/dashboard
- **Super Admin Dashboard**: https://linkingo.in/super-admin

## Verification

To verify it worked:
1. Go to https://linkingo.in/dashboard/settings
2. You should see "Pro" badge
3. Custom domain field should be enabled
4. Go to https://linkingo.in/super-admin
5. You should see the super admin dashboard

---

**This is the recommended method** - it's secure, doesn't require script permissions, and takes just 2 minutes!
