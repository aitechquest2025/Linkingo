# Deploy Updated Firestore Rules

The Firestore rules have been updated in the code, but you need to deploy them to Firebase.

## Option 1: Deploy via Firebase Console (Easiest)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your Linkingo project
3. Click "Firestore Database" → "Rules" tab
4. Copy the content from `firestore.rules` file
5. Paste it into the rules editor
6. Click "Publish"

## Option 2: Deploy via Firebase CLI

```bash
firebase deploy --only firestore:rules
```

## What Changed

Line 20 in `firestore.rules`:
```javascript
// OLD (wrong)
subscription.status == 'premium'

// NEW (correct)
subscription.status == 'active'
```

This fix ensures Pro features work correctly for users with `subscription.status: 'active'`.

---

**After deploying the rules**, refresh linkingo.in and you'll have full Pro access!
