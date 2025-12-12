"use client";

import Link from "next/link";
import { FileText, Shield, AlertCircle, Scale } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b border-zinc-200 bg-white sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <Link href="/" className="text-2xl font-bold text-violet-600">
                        Linkingo
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-violet-100 rounded-full mb-4">
                        <FileText className="h-8 w-8 text-violet-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-zinc-600">
                        Last updated: December 13, 2025
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-zinc max-w-none">
                    {/* Introduction */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-black mb-4">1. Acceptance of Terms</h2>
                        <p className="text-zinc-700 leading-relaxed">
                            By accessing or using Linkingo ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Service.
                        </p>
                        <p className="text-zinc-700 leading-relaxed mt-4">
                            We reserve the right to modify these Terms at any time. Continued use of the Service after changes constitutes acceptance of the modified Terms.
                        </p>
                    </section>

                    {/* User Accounts */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-black mb-4">2. User Accounts</h2>
                        <h3 className="text-xl font-semibold text-black mb-3 mt-6">2.1 Account Creation</h3>
                        <ul className="list-disc pl-6 text-zinc-700 space-y-2">
                            <li>You must be at least 18 years old to create an account</li>
                            <li>You must provide accurate and complete information</li>
                            <li>You are responsible for maintaining account security</li>
                            <li>One person or entity may maintain only one free account</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-black mb-3 mt-6">2.2 Account Termination</h3>
                        <p className="text-zinc-700">
                            We reserve the right to suspend or terminate accounts that violate these Terms, engage in fraudulent activity, or for any other reason at our discretion.
                        </p>
                    </section>

                    {/* Acceptable Use */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-black mb-4">3. Acceptable Use Policy</h2>
                        <p className="text-zinc-700 mb-4">You agree NOT to use the Service to:</p>
                        <ul className="list-disc pl-6 text-zinc-700 space-y-2">
                            <li>Violate any applicable laws or regulations</li>
                            <li>Infringe on intellectual property rights</li>
                            <li>Distribute malware, viruses, or harmful code</li>
                            <li>Engage in spam, phishing, or fraudulent activities</li>
                            <li>Harass, abuse, or harm others</li>
                            <li>Impersonate any person or entity</li>
                            <li>Collect user data without consent</li>
                            <li>Interfere with or disrupt the Service</li>
                        </ul>
                    </section>

                    {/* Content */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-black mb-4">4. User Content</h2>
                        <h3 className="text-xl font-semibold text-black mb-3 mt-6">4.1 Your Responsibility</h3>
                        <p className="text-zinc-700">
                            You are solely responsible for all content you post, including links, text, images, and other materials. You represent that you have all necessary rights to the content you share.
                        </p>

                        <h3 className="text-xl font-semibold text-black mb-3 mt-6">4.2 License to Linkingo</h3>
                        <p className="text-zinc-700">
                            By posting content, you grant Linkingo a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content solely for the purpose of providing the Service.
                        </p>

                        <h3 className="text-xl font-semibold text-black mb-3 mt-6">4.3 Content Removal</h3>
                        <p className="text-zinc-700">
                            We reserve the right to remove any content that violates these Terms or is otherwise objectionable, without prior notice.
                        </p>
                    </section>

                    {/* Intellectual Property */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-black mb-4">5. Intellectual Property</h2>
                        <p className="text-zinc-700">
                            The Service, including its design, features, and functionality, is owned by Linkingo and protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or reverse engineer any part of the Service without written permission.
                        </p>
                    </section>

                    {/* Payment Terms */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-black mb-4">6. Payment and Subscriptions</h2>
                        <h3 className="text-xl font-semibold text-black mb-3 mt-6">6.1 Premium Plans</h3>
                        <p className="text-zinc-700">
                            For current subscription pricing and plans, please visit our <Link href="/dashboard/upgrade" className="text-violet-600 hover:text-violet-700 font-semibold underline">pricing page</Link>.
                        </p>

                        <h3 className="text-xl font-semibold text-black mb-3 mt-6">6.2 Billing</h3>
                        <ul className="list-disc pl-6 text-zinc-700 space-y-2">
                            <li>Subscriptions auto-renew unless cancelled</li>
                            <li>You will be charged at the start of each billing cycle</li>
                            <li>Prices are subject to change with 30 days notice</li>
                            <li>All payments are processed securely through third-party providers</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-black mb-3 mt-6">6.3 Refunds</h3>
                        <p className="text-zinc-700">
                            Refunds are provided at our discretion. Contact <a href="mailto:hellolinkingo@gmail.com" className="text-violet-600 hover:text-violet-700 font-semibold">hellolinkingo@gmail.com</a> for refund requests.
                        </p>
                    </section>

                    {/* Cancellation */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-black mb-4">7. Cancellation</h2>
                        <p className="text-zinc-700">
                            You may cancel your subscription at any time through your account settings. Cancellation takes effect at the end of the current billing period. You will retain access to premium features until then.
                        </p>
                    </section>

                    {/* Disclaimers */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-black mb-4">8. Disclaimers</h2>
                        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                            <p className="text-zinc-700 font-semibold mb-2">THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND.</p>
                            <p className="text-zinc-700">
                                We do not guarantee that the Service will be uninterrupted, error-free, or secure. We are not responsible for any loss of data, revenue, or other damages resulting from use of the Service.
                            </p>
                        </div>
                    </section>

                    {/* Limitation of Liability */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-black mb-4">9. Limitation of Liability</h2>
                        <p className="text-zinc-700">
                            To the maximum extent permitted by law, Linkingo shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising from your use of the Service.
                        </p>
                        <p className="text-zinc-700 mt-4">
                            Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim.
                        </p>
                    </section>

                    {/* Indemnification */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-black mb-4">10. Indemnification</h2>
                        <p className="text-zinc-700">
                            You agree to indemnify and hold harmless Linkingo from any claims, damages, losses, or expenses (including legal fees) arising from your use of the Service, violation of these Terms, or infringement of any third-party rights.
                        </p>
                    </section>

                    {/* Dispute Resolution */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-black mb-4">11. Dispute Resolution</h2>
                        <h3 className="text-xl font-semibold text-black mb-3 mt-6">11.1 Informal Resolution</h3>
                        <p className="text-zinc-700">
                            Before filing a claim, you agree to contact us at <a href="mailto:hellolinkingo@gmail.com" className="text-violet-600 hover:text-violet-700 font-semibold">hellolinkingo@gmail.com</a> to attempt to resolve the dispute informally.
                        </p>

                        <h3 className="text-xl font-semibold text-black mb-3 mt-6">11.2 Arbitration</h3>
                        <p className="text-zinc-700">
                            Any disputes that cannot be resolved informally shall be settled through binding arbitration in accordance with the laws of India.
                        </p>
                    </section>

                    {/* Governing Law */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-black mb-4">12. Governing Law</h2>
                        <p className="text-zinc-700">
                            These Terms are governed by the laws of India. Any legal action must be brought in the courts of India.
                        </p>
                    </section>

                    {/* Changes to Terms */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-black mb-4">13. Changes to Terms</h2>
                        <p className="text-zinc-700">
                            We may update these Terms from time to time. We will notify you of material changes via email or prominent notice on the Service. Your continued use after changes constitutes acceptance.
                        </p>
                    </section>

                    {/* Contact */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-black mb-4">14. Contact Us</h2>
                        <p className="text-zinc-700 mb-4">
                            For questions about these Terms:
                        </p>
                        <div className="bg-violet-50 p-6 rounded-lg">
                            <p className="font-semibold text-black mb-2">Linkingo Support</p>
                            <p className="text-zinc-700">Email: <a href="mailto:hellolinkingo@gmail.com" className="text-violet-600 hover:text-violet-700 font-semibold">hellolinkingo@gmail.com</a></p>
                            <p className="text-zinc-700">Location: India</p>
                        </div>
                    </section>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-zinc-200 bg-zinc-50 mt-20">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-zinc-600 text-sm">
                            © 2025 Linkingo. Built for India with ❤️
                        </p>
                        <div className="flex gap-6 text-sm">
                            <Link href="/contact" className="text-zinc-600 hover:text-violet-600">
                                Contact Us
                            </Link>
                            <Link href="/privacy" className="text-zinc-600 hover:text-violet-600">
                                Privacy Policy
                            </Link>
                            <Link href="/" className="text-zinc-600 hover:text-violet-600">
                                Home
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
