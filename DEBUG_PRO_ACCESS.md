# Debug Pro Access Issue

Your Pro features are not showing. Let's debug this step by step.

## Check Your User Document in Firebase

1. Go to Firebase Console → Firestore Database
2. Open `users` collection
3. Find your document (aitechquest2025@gmail.com)
4. Verify it has these EXACT fields:

```
role: "superadmin"
subscription: (map)
  ├── status: "active"  ← MUST be exactly "active"
  ├── plan: "pro"
  ├── subscriptionId: "sub_admin_2025"
  ├── startDate: [timestamp]
  └── endDate: [timestamp - 1 year from now]
```

## Common Issues

### Issue 1: Missing `startDate` or `endDate`
**Solution**: Add both timestamp fields to the `subscription` map

### Issue 2: Wrong status value
**Solution**: Make sure `subscription.status` is exactly `"active"` (not "premium", "permium", or anything else)

### Issue 3: Subscription is not a map
**Solution**: Delete the field and recreate it as a map, then add the sub-fields

### Issue 4: Browser cache
**Solution**: 
1. Log out of linkingo.in
2. Clear browser cache (Ctrl+Shift+Delete)
3. Log back in

## Quick Test

Open browser console (F12) and run this on linkingo.in:

```javascript
// Check if user data is loaded
console.log('User subscription:', localStorage.getItem('user'));
```

## If Still Not Working

1. **Hard refresh**: Ctrl+F5 on linkingo.in
2. **Try incognito mode**: Open linkingo.in in incognito/private window
3. **Check console errors**: F12 → Console tab, look for errors

## Expected Behavior

When Pro is working correctly:
- ✅ No "Upgrade to Pro" button in settings
- ✅ Custom domain input is enabled
- ✅ DNS setup guide is visible
- ✅ Premium customization options unlocked
- ✅ "Pro" badge visible in dashboard

---

**Still having issues?** Share a screenshot of your user document from Firebase Console.
