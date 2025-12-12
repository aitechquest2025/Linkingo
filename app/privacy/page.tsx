"use client";

import Link from "next/link";
import { Shield, Lock, Eye, UserCheck, Globe, FileText } from "lucide-react";

export default function PrivacyPage() {
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
                        <Shield className="h-8 w-8 text-violet-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-zinc-600">
                        Last updated: December 13, 2025
                    </p>
                </div>

                {/* Compliance Badges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <Globe className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <p className="text-xs font-semibold text-blue-900">DPDP Act</p>
                        <p className="text-xs text-blue-700">India</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <Lock className="h-6 w-6 text-green-600 mx-auto mb-2" />
                        <p className="text-xs font-semibold text-green-900">GDPR</p>
                        <p className="text-xs text-green-700">Europe</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <Eye className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                        <p className="text-xs font-semibold text-purple-900">CCPA</p>
                        <p className="text-xs text-purple-700">California</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <UserCheck className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                        <p className="text-xs font-semibold text-orange-900">ISO 27001</p>
                        <p className="text-xs text-orange-700">Global</p>
                    </div>
                </div>

                {/* Content */}
                <div className="prose prose-zinc max-w-none">
                    {/* Introduction */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-black mb-4">Introduction</h2>
                        <p className="text-zinc-700 leading-relaxed">
                            Linkingo ("we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform and services.
                        </p>
                        <p className="text-zinc-700 leading-relaxed mt-4">
                            This policy complies with the Digital Personal Data Protection Act, 2023 (DPDP Act) of India, the General Data Protection Regulation (GDPR) of the European Union, the California Consumer Privacy Act (CCPA), and other applicable international privacy laws.
                        </p>
                    </section>

                    {/* Data We Collect */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-black mb-4">1. Information We Collect</h2>

                        <h3 className="text-xl font-semibold text-black mb-3 mt-6">1.1 Information You Provide</h3>
                        <ul className="list-disc pl-6 text-zinc-700 space-y-2">
                            <li><strong>Account Information:</strong> Name, email address, username, password, profile picture</li>
                            <li><strong>Profile Data:</strong> Bio, social media links, custom domain, display preferences</li>
                            <li><strong>Payment Information:</strong> UPI ID, transaction details (processed securely through third-party payment processors)</li>
                            <li><strong>Content:</strong> Links you create, revenue entries, analytics preferences</li>
                            <li><strong>Communications:</strong> Messages sent through our contact forms or support channels</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-black mb-3 mt-6">1.2 Automatically Collected Information</h3>
                        <ul className="list-disc pl-6 text-zinc-700 space-y-2">
                            <li><strong>Usage Data:</strong> Page views, link clicks, time spent, device information</li>
                            <li><strong>Technical Data:</strong> IP address, browser type, operating system, device identifiers</li>
                            <li><strong>Cookies:</strong> Session cookies, preference cookies, analytics cookies</li>
                            <li><strong>Location Data:</strong> Approximate location based on IP address</li>
                        </ul>
                    </section>

                    {/* How We Use Data */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-black mb-4">2. How We Use Your Information</h2>
                        <p className="text-zinc-700 mb-4">We use your personal data for the following purposes:</p>
                        <ul className="list-disc pl-6 text-zinc-700 space-y-2">
                            <li><strong>Service Provision:</strong> To create and manage your account, provide our link-in-bio services</li>
                            <li><strong>Analytics:</strong> To provide you with insights about your link performance and audience</li>
                            <li><strong>Payment Processing:</strong> To process subscriptions and revenue tracking</li>
                            <li><strong>Communication:</strong> To send service updates, respond to inquiries, provide customer support</li>
                            <li><strong>Improvement:</strong> To improve our services, develop new features, fix bugs</li>
                            <li><strong>Security:</strong> To detect fraud, prevent abuse, ensure platform security</li>
                            <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
                        </ul>
                    </section>

                    {/* Legal Basis (GDPR) */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-black mb-4">3. Legal Basis for Processing (GDPR)</h2>
                        <p className="text-zinc-700 mb-4">For users in the European Economic Area (EEA), we process your data based on:</p>
                        <ul className="list-disc pl-6 text-zinc-700 space-y-2">
                            <li><strong>Consent:</strong> You have given explicit consent for specific purposes</li>
                            <li><strong>Contract:</strong> Processing is necessary to fulfill our service agreement with you</li>
                            <li><strong>Legitimate Interests:</strong> For analytics, security, and service improvement</li>
                            <li><strong>Legal Obligation:</strong> To comply with applicable laws</li>
                        </ul>
                    </section>

                    {/* Data Sharing */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-black mb-4">4. Data Sharing and Disclosure</h2>
                        <p className="text-zinc-700 mb-4">We may share your information with:</p>
                        <ul className="list-disc pl-6 text-zinc-700 space-y-2">
                            <li><strong>Service Providers:</strong> Firebase (Google), Vercel, payment processors</li>
                            <li><strong>Analytics Partners:</strong> To understand usage patterns (anonymized data)</li>
                            <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
                            <li><strong>Business Transfers:</strong> In case of merger, acquisition, or asset sale</li>
                        </ul>
                        <p className="text-zinc-700 mt-4">
                            <strong>We do NOT sell your personal data to third parties.</strong>
                        </p>
                    </section>

                    {/* Your Rights */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-black mb-4">5. Your Privacy Rights</h2>

                        <h3 className="text-xl font-semibold text-black mb-3 mt-6">5.1 Rights Under DPDP Act (India)</h3>
                        <ul className="list-disc pl-6 text-zinc-700 space-y-2">
                            <li>Right to access your personal data</li>
                            <li>Right to correction of inaccurate data</li>
                            <li>Right to erasure and right to be forgotten</li>
                            <li>Right to nominate a representative</li>
                            <li>Right to grievance redressal</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-black mb-3 mt-6">5.2 Rights Under GDPR (EU/EEA)</h3>
                        <ul className="list-disc pl-6 text-zinc-700 space-y-2">
                            <li>Right to access, rectification, and erasure</li>
                            <li>Right to data portability</li>
                            <li>Right to restrict or object to processing</li>
                            <li>Right to withdraw consent</li>
                            <li>Right to lodge a complaint with supervisory authority</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-black mb-3 mt-6">5.3 Rights Under CCPA (California)</h3>
                        <ul className="list-disc pl-6 text-zinc-700 space-y-2">
                            <li>Right to know what personal information is collected</li>
                            <li>Right to delete personal information</li>
                            <li>Right to opt-out of sale (we don't sell data)</li>
                            <li>Right to non-discrimination</li>
                        </ul>

                        <p className="text-zinc-700 mt-6">
                            To exercise any of these rights, contact us at{" "}
                            <a href="mailto:hellolinkingo@gmail.com" className="text-violet-600 hover:text-violet-700 font-semibold">
                                hellolinkingo@gmail.com
                            </a>
                        </p>
                    </section>

                    {/* Data Security */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-black mb-4">6. Data Security</h2>
                        <p className="text-zinc-700 mb-4">We implement industry-standard security measures:</p>
                        <ul className="list-disc pl-6 text-zinc-700 space-y-2">
                            <li>Encryption in transit (HTTPS/TLS) and at rest</li>
                            <li>Secure authentication (Firebase Authentication)</li>
                            <li>Regular security audits and updates</li>
                            <li>Access controls and monitoring</li>
                            <li>Secure data centers (Google Cloud Platform)</li>
                        </ul>
                    </section>

                    {/* Data Retention */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-black mb-4">7. Data Retention</h2>
                        <p className="text-zinc-700">
                            We retain your personal data only as long as necessary for the purposes outlined in this policy or as required by law. When you delete your account, we will delete or anonymize your data within 30 days, except where retention is required for legal, regulatory, or security purposes.
                        </p>
                    </section>

                    {/* International Transfers */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-black mb-4">8. International Data Transfers</h2>
                        <p className="text-zinc-700">
                            Your data may be transferred to and processed in countries outside your residence, including the United States and European Union. We ensure appropriate safeguards are in place, including Standard Contractual Clauses (SCCs) and compliance with applicable data protection frameworks.
                        </p>
                    </section>

                    {/* Children's Privacy */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-black mb-4">9. Children's Privacy</h2>
                        <p className="text-zinc-700">
                            Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal data from children. If we become aware that we have collected data from a child, we will delete it promptly. Under DPDP Act, parental consent is required for processing data of individuals under 18.
                        </p>
                    </section>

                    {/* Cookies */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-black mb-4">10. Cookies and Tracking</h2>
                        <p className="text-zinc-700 mb-4">We use cookies and similar technologies for:</p>
                        <ul className="list-disc pl-6 text-zinc-700 space-y-2">
                            <li><strong>Essential Cookies:</strong> Required for authentication and security</li>
                            <li><strong>Analytics Cookies:</strong> To understand usage patterns</li>
                            <li><strong>Preference Cookies:</strong> To remember your settings</li>
                        </ul>
                        <p className="text-zinc-700 mt-4">
                            You can control cookies through your browser settings. Note that disabling essential cookies may affect service functionality.
                        </p>
                    </section>

                    {/* Updates */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-black mb-4">11. Policy Updates</h2>
                        <p className="text-zinc-700">
                            We may update this Privacy Policy periodically. We will notify you of material changes via email or prominent notice on our platform. Continued use of our services after changes constitutes acceptance of the updated policy.
                        </p>
                    </section>

                    {/* Contact */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-black mb-4">12. Contact Us</h2>
                        <p className="text-zinc-700 mb-4">
                            For privacy-related questions, concerns, or to exercise your rights:
                        </p>
                        <div className="bg-violet-50 p-6 rounded-lg">
                            <p className="font-semibold text-black mb-2">Data Protection Officer</p>
                            <p className="text-zinc-700">Email: <a href="mailto:hellolinkingo@gmail.com" className="text-violet-600 hover:text-violet-700 font-semibold">hellolinkingo@gmail.com</a></p>
                            <p className="text-zinc-700">Location: India</p>
                        </div>
                    </section>

                    {/* Grievance Officer (DPDP) */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-black mb-4">13. Grievance Redressal (DPDP Act)</h2>
                        <p className="text-zinc-700 mb-4">
                            Under the DPDP Act, 2023, you have the right to file a grievance regarding data processing:
                        </p>
                        <div className="bg-blue-50 p-6 rounded-lg">
                            <p className="font-semibold text-black mb-2">Grievance Officer</p>
                            <p className="text-zinc-700">Email: <a href="mailto:hellolinkingo@gmail.com" className="text-violet-600 hover:text-violet-700 font-semibold">hellolinkingo@gmail.com</a></p>
                            <p className="text-zinc-700 mt-2 text-sm">We will acknowledge your grievance within 24 hours and resolve it within 30 days.</p>
                        </div>
                    </section>

                    {/* Consent */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-black mb-4">14. Consent</h2>
                        <p className="text-zinc-700">
                            By using Linkingo, you consent to the collection, use, and processing of your personal data as described in this Privacy Policy. You may withdraw consent at any time by contacting us or deleting your account.
                        </p>
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
                            <Link href="/terms" className="text-zinc-600 hover:text-violet-600">
                                Terms of Service
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
