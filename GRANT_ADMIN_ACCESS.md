# Grant Super Admin Access - Instructions

## Quick Start

Run this command to grant super admin and Pro access to `aitechquest2025@gmail.com`:

```bash
npm run grant-admin
```

## What This Does

The script will:
1. ✅ Find your user account by email (`aitechquest2025@gmail.com`)
2. ✅ Grant **super admin** role
3. ✅ Grant **Pro subscription** (1 year, active)
4. ✅ Enable all premium features

## Prerequisites

**IMPORTANT**: You must login to the app FIRST before running this script!

1. Go to https://linkingo.in/login
2. Login with `aitechquest2025@gmail.com`
3. Complete the signup/login process
4. Then run the script

## Running the Script

```bash
cd C:\Users\Rakesh\Linkingo
npm run grant-admin
```

## Expected Output

```
🔍 Searching for user: aitechquest2025@gmail.com
✅ Found user: aitechquest2025@gmail.com
   UID: abc123...
   Username: aitechquest
✅ Granted super admin role
✅ Granted Pro subscription (1 year)

🎉 Success! Access granted to aitechquest2025@gmail.com

📝 You now have:
   ✓ Super Admin access (/super-admin)
   ✓ Pro subscription (all premium features)
   ✓ Custom domain access
   ✓ Premium themes, backgrounds, fonts, animations

🔗 Login at: https://linkingo.in/login
🔗 Super Admin Dashboard: https://linkingo.in/super-admin
```

## What You Can Access Now

### Super Admin Dashboard
- URL: https://linkingo.in/super-admin
- Features:
  - View all users
  - View all subscriptions
  - Platform statistics
  - Revenue tracking
  - User management

### Pro Features
- ✅ Custom domain
- ✅ 30 color themes (25 premium)
- ✅ 30 backgrounds (25 premium)
- ✅ 10 button styles (8 premium)
- ✅ 30 fonts (25 premium)
- ✅ 20 animations (15 premium)
- ✅ Advanced analytics
- ✅ Remove branding
- ✅ Priority support

## Troubleshooting

### "User not found"
- Make sure you've logged in to the app first
- Check that you used the correct email: `aitechquest2025@gmail.com`

### "Permission denied"
- Check Firebase credentials in `.env.local`
- Verify Firestore rules allow admin access

### Script won't run
- Install dependencies: `npm install`
- Install ts-node: `npm install -D ts-node @types/node`
- Make sure you're in the project directory

## Manual Alternative

If the script doesn't work, you can manually update Firestore:

1. Go to Firebase Console → Firestore Database
2. Find your user document in the `users` collection
3. Edit the document and add:
   ```json
   {
     "role": "superadmin",
     "subscription": {
       "status": "active",
       "plan": "pro",
       "startDate": <current timestamp>,
       "endDate": <1 year from now>
     }
   }
   ```

## Need Help?

If you encounter any issues:
1. Check the console output for error messages
2. Verify Firebase credentials
3. Make sure you're logged in to the app first
4. Contact support if needed

---

**Ready to run?** Execute: `npm run grant-admin`
