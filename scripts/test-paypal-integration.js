#!/usr/bin/env node

/**
 * PayPal Integration Test Runner with .env.local support
 */

require('dotenv').config({ path: '.env.local' });

const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m',
};

let passedTests = 0;
let failedTests = 0;
const testResults = [];

function log(message, color = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
}

function logTest(name, passed, details = '') {
    const result = { name, passed, details };
    testResults.push(result);

    if (passed) {
        log(`✓ ${name}`, colors.green);
        passedTests++;
    } else {
        log(`✗ ${name}`, colors.red);
        if (details) log(`  ${details}`, colors.yellow);
        failedTests++;
    }
}

async function makeRequest(path, options = {}) {
    return new Promise((resolve, reject) => {
        const url = new URL(path, BASE_URL);
        const requestOptions = {
            method: options.method || 'GET',
            headers: options.headers || {},
            timeout: 5000,
        };

        const req = http.request(url, requestOptions, (res) => {
            let data = '';
            res.on('data', (chunk) => (data += chunk));
            res.on('end', () => {
                try {
                    const jsonData = data ? JSON.parse(data) : null;
                    resolve({ status: res.statusCode, data: jsonData, headers: res.headers });
                } catch (e) {
                    resolve({ status: res.statusCode, data, headers: res.headers });
                }
            });
        });

        req.on('error', reject);
        req.on('timeout', () => reject(new Error('Request timeout')));

        if (options.body) {
            req.write(JSON.stringify(options.body));
        }

        req.end();
    });
}

async function testEnvironment() {
    log('\n📋 Environment Configuration', colors.cyan);
    log('─'.repeat(60), colors.cyan);

    const requiredVars = {
        'NEXT_PUBLIC_PAYPAL_CLIENT_ID': 'PayPal Client ID',
        'PAYPAL_SECRET_KEY': 'PayPal Secret Key',
        'PAYPAL_PLAN_ID_INDIA_MONTHLY': 'India Monthly Plan ID',
        'PAYPAL_PLAN_ID_INDIA_YEARLY': 'India Yearly Plan ID',
        'PAYPAL_PLAN_ID_GLOBAL_MONTHLY': 'Global Monthly Plan ID',
        'PAYPAL_PLAN_ID_GLOBAL_YEARLY': 'Global Yearly Plan ID',
        'NEXT_PUBLIC_PAYPAL_ENV': 'PayPal Environment',
    };

    for (const [varName, description] of Object.entries(requiredVars)) {
        const value = process.env[varName];
        const exists = value !== undefined && value !== '';
        logTest(`${description} configured`, exists,
            exists ? `Value: ${value.substring(0, 20)}...` : 'Not set in .env.local');
    }

    const isSandbox = process.env.NEXT_PUBLIC_PAYPAL_ENV === 'sandbox';
    logTest('Environment set to sandbox', isSandbox,
        `Current: ${process.env.NEXT_PUBLIC_PAYPAL_ENV || 'not set'}`);
}

async function testFileStructure() {
    log('\n📁 File Structure', colors.cyan);
    log('─'.repeat(60), colors.cyan);

    const files = {
        'lib/paypal/client.ts': 'PayPal Client Configuration',
        'lib/server/subscription.ts': 'Subscription Service',
        'app/api/paypal/create-subscription/route.ts': 'Create Subscription API',
        'app/api/webhooks/paypal/route.ts': 'Webhook Handler',
        'types/paypal.d.ts': 'TypeScript Declarations',
        'app/(dashboard)/dashboard/upgrade/page.tsx': 'Upgrade Page',
        'app/(dashboard)/dashboard/upgrade/layout.tsx': 'Upgrade Layout (SEO)',
        'public/images/linkingo-premium-product.png': 'Product Image',
        'firestore.rules': 'Firestore Security Rules',
        'firestore.indexes.json': 'Firestore Indexes',
    };

    for (const [file, description] of Object.entries(files)) {
        const exists = fs.existsSync(path.join(process.cwd(), file));
        logTest(description, exists, exists ? file : `Missing: ${file}`);
    }
}

async function testAPIEndpoints() {
    log('\n🔌 API Endpoints', colors.cyan);
    log('─'.repeat(60), colors.cyan);

    // Test 1: Missing fields
    try {
        const res = await makeRequest('/api/paypal/create-subscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: {},
        });
        logTest('Validates missing fields', res.status === 400,
            `Status: ${res.status}, Message: ${res.data?.error}`);
    } catch (error) {
        logTest('Validates missing fields', false, `Error: ${error.message}`);
    }

    // Test 2: Invalid region
    try {
        const res = await makeRequest('/api/paypal/create-subscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: { region: 'invalid', billingCycle: 'monthly', userId: 'test' },
        });
        logTest('Validates invalid region', res.status === 400,
            `Status: ${res.status}`);
    } catch (error) {
        logTest('Validates invalid region', false, `Error: ${error.message}`);
    }

    // Test 3: Valid request
    try {
        const res = await makeRequest('/api/paypal/create-subscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: { region: 'india', billingCycle: 'monthly', userId: 'test-123' },
        });
        const passed = res.status === 200 && res.data?.success && res.data?.subscriptionUrl;
        logTest('Creates subscription for India Monthly', passed,
            passed ? `URL: ${res.data.subscriptionUrl.substring(0, 50)}...` : `Status: ${res.status}`);
    } catch (error) {
        logTest('Creates subscription for India Monthly', false, `Error: ${error.message}`);
    }

    // Test 4: Webhook endpoint
    try {
        const res = await makeRequest('/api/webhooks/paypal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'paypal-transmission-id': 'test-' + Date.now(),
                'paypal-transmission-time': new Date().toISOString(),
                'paypal-transmission-sig': 'test-sig',
                'paypal-cert-url': 'https://test.paypal.com/cert',
                'paypal-auth-algo': 'SHA256withRSA',
            },
            body: { event_type: 'BILLING.SUBSCRIPTION.CREATED', resource: { id: 'I-TEST' } },
        });
        logTest('Webhook endpoint accessible', [200, 401].includes(res.status),
            `Status: ${res.status}`);
    } catch (error) {
        logTest('Webhook endpoint accessible', false, `Error: ${error.message}`);
    }
}

async function testUpgradePage() {
    log('\n🌐 Upgrade Page', colors.cyan);
    log('─'.repeat(60), colors.cyan);

    try {
        const res = await makeRequest('/dashboard/upgrade');
        logTest('Page loads successfully', res.status === 200,
            `Status: ${res.status}`);
        logTest('Returns HTML content',
            res.headers['content-type']?.includes('text/html'),
            `Content-Type: ${res.headers['content-type']}`);
    } catch (error) {
        logTest('Page loads successfully', false, `Error: ${error.message}`);
    }
}

async function generateReport() {
    const reportPath = path.join(process.cwd(), 'TEST_REPORT.md');

    let report = `# PayPal Integration Test Report\n\n`;
    report += `**Date**: ${new Date().toISOString()}\n`;
    report += `**Environment**: ${process.env.NEXT_PUBLIC_PAYPAL_ENV || 'Not configured'}\n\n`;
    report += `## Summary\n\n`;
    report += `- **Total Tests**: ${passedTests + failedTests}\n`;
    report += `- **Passed**: ${passedTests} ✅\n`;
    report += `- **Failed**: ${failedTests} ❌\n`;
    report += `- **Success Rate**: ${((passedTests / (passedTests + failedTests)) * 100).toFixed(1)}%\n\n`;

    report += `## Test Results\n\n`;

    const categories = {
        'Environment Configuration': [],
        'File Structure': [],
        'API Endpoints': [],
        'Upgrade Page': [],
    };

    testResults.forEach((result, index) => {
        if (index < 8) categories['Environment Configuration'].push(result);
        else if (index < 18) categories['File Structure'].push(result);
        else if (index < 22) categories['API Endpoints'].push(result);
        else categories['Upgrade Page'].push(result);
    });

    for (const [category, results] of Object.entries(categories)) {
        report += `### ${category}\n\n`;
        results.forEach(({ name, passed, details }) => {
            report += `- ${passed ? '✅' : '❌'} ${name}\n`;
            if (details) report += `  - ${details}\n`;
        });
        report += `\n`;
    }

    report += `## Next Steps\n\n`;
    if (failedTests > 0) {
        report += `### Fix Failed Tests\n\n`;
        testResults.filter(r => !r.passed).forEach(({ name, details }) => {
            report += `- [ ] ${name}\n`;
            if (details) report += `  - ${details}\n`;
        });
    } else {
        report += `✅ All tests passed! Ready for production deployment.\n\n`;
        report += `### Deployment Checklist\n\n`;
        report += `- [ ] Deploy Firestore rules\n`;
        report += `- [ ] Deploy Firestore indexes\n`;
        report += `- [ ] Configure PayPal webhook\n`;
        report += `- [ ] Test in sandbox mode\n`;
        report += `- [ ] Switch to live mode\n`;
    }

    fs.writeFileSync(reportPath, report);
    log(`\n📄 Test report saved to: ${reportPath}`, colors.magenta);
}

async function runAllTests() {
    log('\n' + '='.repeat(60), colors.blue);
    log('🧪 PayPal Integration Test Suite', colors.blue);
    log('='.repeat(60), colors.blue);

    try {
        await testEnvironment();
        await testFileStructure();
        await testAPIEndpoints();
        await testUpgradePage();
    } catch (error) {
        log(`\n❌ Test suite error: ${error.message}`, colors.red);
    }

    log('\n' + '='.repeat(60), colors.blue);
    log('📊 Final Summary', colors.blue);
    log('='.repeat(60), colors.blue);
    log(`Total: ${passedTests + failedTests} | Passed: ${passedTests} | Failed: ${failedTests}`);

    if (failedTests === 0) {
        log('\n✅ All tests passed!', colors.green);
    } else {
        log(`\n⚠️  ${failedTests} test(s) failed`, colors.yellow);
    }

    await generateReport();

    log('\n' + '='.repeat(60) + '\n', colors.blue);

    process.exit(failedTests > 0 ? 1 : 0);
}

runAllTests().catch((error) => {
    log(`\n❌ Fatal error: ${error.message}`, colors.red);
    process.exit(1);
});
