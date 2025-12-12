/**
 * Firestore Initialization Script (JavaScript version)
 * Run this to create all collections with sample data
 * 
 * Usage: node scripts/init-firestore.js
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc, serverTimestamp } = require('firebase/firestore');
require('dotenv').config({ path: '.env.local' });

// Firebase config from environment variables
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
    console.log('🚀 Initializing Firestore collections...\n');

    // IMPORTANT: Replace this with your actual UID after first login
    const YOUR_UID = 'u6y8yZaYz2SnPGhg5Z2hRnVz2a62';

    if (YOUR_UID === 'REPLACE_WITH_YOUR_UID') {
        console.log('⚠️  WARNING: You need to update YOUR_UID first!');
        console.log('\n📝 Steps:');
        console.log('1. Login to your app with aitechquest2025@gmail.com');
        console.log('2. Go to Firebase Console → Authentication');
        console.log('3. Copy your User UID');
        console.log('4. Replace REPLACE_WITH_YOUR_UID in this script');
        console.log('5. Run this script again\n');
        return;
    }

    try {
        // 1. Create superadmin user
        await setDoc(doc(db, 'users', YOUR_UID), {
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
            userId: YOUR_UID,
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
            userId: YOUR_UID,
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
        await setDoc(doc(db, 'promoCodes', 'WELCOME20'), {
            code: 'WELCOME20',
            discount: 20,
            maxUses: 100,
            uses: 0,
            active: true
        });
        console.log('✅ Created sample promo code');

        // 6. Create sample log
        await setDoc(doc(db, 'logs', 'init-log'), {
            userId: YOUR_UID,
            action: 'System Initialized',
            timestamp: serverTimestamp(),
            details: { message: 'Firestore collections created successfully' }
        });
        console.log('✅ Created sample log');

        console.log('\n🎉 Firestore initialization complete!');
        console.log('\n✨ You can now:');
        console.log('1. Visit /super-admin to access the dashboard');
        console.log('2. Manage users, subscriptions, partners, and more!');

        process.exit(0);

    } catch (error) {
        console.error('\n❌ Error initializing Firestore:', error.message);
        console.error('\nMake sure:');
        console.error('1. Your .env.local file has all Firebase credentials');
        console.error('2. You have internet connection');
        console.error('3. Firebase project is set up correctly');
        process.exit(1);
    }
}

initializeFirestore();
