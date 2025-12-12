/**
 * Firestore Initialization Script
 * Run this once to create all collections with sample data
 * 
 * Usage:
 * 1. Create a new file: scripts/init-firestore.ts
 * 2. Run: npx ts-node scripts/init-firestore.ts
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';

// Your Firebase config (copy from Firebase Console)
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

async function initializeFirestore() {
    console.log('🚀 Initializing Firestore collections...');

    try {
        // 1. Create sample user (YOU - as superadmin)
        const superAdminId = 'REPLACE_WITH_YOUR_UID'; // Get this after first login
        await setDoc(doc(db, 'users', superAdminId), {
            email: 'aitechquest2025@gmail.com',
            role: 'superadmin',
            subscriptionStatus: 'premium',
            username: 'aitechquest',
            displayName: 'Admin User',
            bio: 'Super Administrator',
            photoURL: '',
            coverURL: '',
            socialLinks: {
                twitter: '',
                instagram: '',
                youtube: '',
                tiktok: '',
                linkedin: '',
                telegram: '',
                facebook: '',
                github: ''
            },
            theme: {
                colorTheme: 'default',
                buttonStyle: 'rounded',
                fontFamily: 'inter',
                backgroundType: 'solid',
                customColor: '#ffffff'
            },
            createdAt: serverTimestamp()
        });
        console.log('✅ Created superadmin user');

        // 2. Create sample subscription
        await setDoc(doc(db, 'subscriptions', 'sample-sub-1'), {
            userId: superAdminId,
            userEmail: 'aitechquest2025@gmail.com',
            plan: 'yearly',
            status: 'active',
            amount: 2999,
            startDate: serverTimestamp(),
            endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        });
        console.log('✅ Created sample subscription');

        // 3. Create sample revenue entry
        await setDoc(doc(db, 'revenue', 'sample-revenue-1'), {
            userId: superAdminId,
            category: 'Affiliate',
            amount: 5000,
            note: 'Sample revenue entry',
            date: serverTimestamp()
        });
        console.log('✅ Created sample revenue entry');

        // 4. Create sample partner
        await setDoc(doc(db, 'partners', 'sample-partner-1'), {
            name: 'Sample Partner',
            email: 'partner@example.com',
            commission: 20,
            totalReferrals: 0,
            totalEarnings: 0
        });
        console.log('✅ Created sample partner');

        // 5. Create sample promo code
        await setDoc(doc(db, 'promoCodes', 'sample-promo-1'), {
            code: 'WELCOME20',
            discount: 20,
            maxUses: 100,
            uses: 0,
            active: true
        });
        console.log('✅ Created sample promo code');

        // 6. Create sample log
        await setDoc(doc(db, 'logs', 'sample-log-1'), {
            userId: superAdminId,
            action: 'System Initialized',
            timestamp: serverTimestamp(),
            details: { message: 'Firestore collections created' }
        });
        console.log('✅ Created sample log');

        console.log('\n🎉 Firestore initialization complete!');
        console.log('\n📝 Next steps:');
        console.log('1. Login to your app with aitechquest2025@gmail.com');
        console.log('2. Get your UID from Firestore users collection');
        console.log('3. Replace REPLACE_WITH_YOUR_UID in this script');
        console.log('4. Run this script again to update with correct UID');

    } catch (error) {
        console.error('❌ Error initializing Firestore:', error);
    }
}

initializeFirestore();
