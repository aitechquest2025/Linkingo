/**
 * Grant Super Admin and Pro Access Script
 * 
 * This script grants super admin role and Pro subscription to aitechquest2025@gmail.com
 * 
 * Usage:
 * 1. Make sure you're logged in to Firebase
 * 2. Run: npm run grant-admin
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, updateDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function grantAdminAccess() {
    console.log('🔍 Searching for user: aitechquest2025@gmail.com');

    try {
        // Find user by email
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', 'aitechquest2025@gmail.com'));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log('❌ User not found!');
            console.log('📝 Please login first at https://linkingo.in/login');
            console.log('   Then run this script again.');
            return;
        }

        const userDoc = querySnapshot.docs[0];
        const userId = userDoc.id;
        const userData = userDoc.data();

        console.log(`✅ Found user: ${userData.email}`);
        console.log(`   UID: ${userId}`);
        console.log(`   Username: ${userData.username || 'Not set'}`);

        // Update user with super admin role
        await updateDoc(doc(db, 'users', userId), {
            role: 'superadmin',
            updatedAt: serverTimestamp()
        });
        console.log('✅ Granted super admin role');

        // Create or update Pro subscription
        const subscriptionId = `sub_${userId}`;
        const oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

        await setDoc(doc(db, 'users', userId), {
            subscription: {
                status: 'active',
                plan: 'pro',
                startDate: serverTimestamp(),
                endDate: oneYearFromNow,
                subscriptionId: subscriptionId
            }
        }, { merge: true });
        console.log('✅ Granted Pro subscription (1 year)');

        console.log('\n🎉 Success! Access granted to aitechquest2025@gmail.com');
        console.log('\n📝 You now have:');
        console.log('   ✓ Super Admin access (/super-admin)');
        console.log('   ✓ Pro subscription (all premium features)');
        console.log('   ✓ Custom domain access');
        console.log('   ✓ Premium themes, backgrounds, fonts, animations');
        console.log('\n🔗 Login at: https://linkingo.in/login');
        console.log('🔗 Super Admin Dashboard: https://linkingo.in/super-admin');

    } catch (error) {
        console.error('❌ Error granting access:', error);
        console.log('\n💡 Troubleshooting:');
        console.log('   1. Make sure Firebase credentials are in .env.local');
        console.log('   2. Login to the app first');
        console.log('   3. Check Firestore rules allow admin access');
    }
}

grantAdminAccess();
