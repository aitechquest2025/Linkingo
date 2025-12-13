import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function CustomDomainHelpPage() {
    return (
        <div className="min-h-screen bg-zinc-50 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <Link href="/dashboard/settings">
                    <Button variant="ghost" className="mb-6">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Settings
                    </Button>
                </Link>

                <h1 className="text-4xl font-bold text-black mb-4">Custom Domain Setup Guide</h1>
                <p className="text-zinc-600 mb-8">Learn how to connect your own domain to your Linkingo page</p>

                <div className="space-y-8">
                    {/* What is a Custom Domain */}
                    <section className="bg-white p-6 rounded-lg border border-zinc-200">
                        <h2 className="text-2xl font-bold text-black mb-3">What is a Custom Domain?</h2>
                        <p className="text-zinc-700 mb-4">
                            A custom domain allows you to use your own domain name (e.g., <code className="bg-zinc-100 px-2 py-1 rounded">yourdomain.com</code>)
                            instead of the default Linkingo URL (<code className="bg-zinc-100 px-2 py-1 rounded">linkingo.in/username</code>).
                        </p>
                        <div className="bg-blue-50 p-4 rounded border border-blue-200">
                            <p className="text-sm text-blue-900">
                                <strong>Example:</strong><br />
                                Default: <code>linkingo.in/john</code><br />
                                Custom: <code>john.com</code>
                            </p>
                        </div>
                    </section>

                    {/* Requirements */}
                    <section className="bg-white p-6 rounded-lg border border-zinc-200">
                        <h2 className="text-2xl font-bold text-black mb-3">Requirements</h2>
                        <ul className="space-y-2 text-zinc-700">
                            <li className="flex items-start gap-2">
                                <span className="text-violet-600 font-bold">✓</span>
                                <span><strong>Pro Plan:</strong> Custom domains are only available on the Pro plan (₹79/month)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-violet-600 font-bold">✓</span>
                                <span><strong>Your Own Domain:</strong> You need to own a domain name</span>
                            </li>
                        </ul>
                    </section>

                    {/* Step-by-Step Setup */}
                    <section className="bg-white p-6 rounded-lg border border-zinc-200">
                        <h2 className="text-2xl font-bold text-black mb-4">Step-by-Step Setup</h2>

                        {/* Step 1 */}
                        <div className="mb-6 pb-6 border-b border-zinc-200">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</span>
                                <h3 className="text-xl font-semibold text-black">Buy a Domain</h3>
                            </div>
                            <p className="text-zinc-700 mb-3">If you don't have a domain, purchase one from:</p>
                            <ul className="space-y-1 text-zinc-600 ml-11">
                                <li>• <strong>Namecheap.com</strong> - ₹500/year</li>
                                <li>• <strong>GoDaddy.com</strong> - ₹699/year</li>
                                <li>• <strong>Hostinger.com</strong> - ₹399/year</li>
                            </ul>
                        </div>

                        {/* Step 2 */}
                        <div className="mb-6 pb-6 border-b border-zinc-200">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</span>
                                <h3 className="text-xl font-semibold text-black">Configure DNS Settings</h3>
                            </div>
                            <p className="text-zinc-700 mb-3">In your domain provider's dashboard, add a CNAME record:</p>
                            <div className="bg-zinc-50 p-4 rounded border border-zinc-300 font-mono text-sm space-y-2">
                                <div className="grid grid-cols-3 gap-2">
                                    <div className="text-zinc-600">Type:</div>
                                    <div className="col-span-2 text-black font-semibold">CNAME</div>
                                    <div className="text-zinc-600">Name:</div>
                                    <div className="col-span-2 text-black font-semibold">www (or @)</div>
                                    <div className="text-zinc-600">Value:</div>
                                    <div className="col-span-2 text-black font-semibold">cname.vercel-dns.com</div>
                                    <div className="text-zinc-600">TTL:</div>
                                    <div className="col-span-2 text-black font-semibold">3600 (or Auto)</div>
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="mb-6 pb-6 border-b border-zinc-200">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">3</span>
                                <h3 className="text-xl font-semibold text-black">Add Domain to Linkingo</h3>
                            </div>
                            <p className="text-zinc-700">Go to Settings → Custom Domain and enter your domain name.</p>
                        </div>

                        {/* Step 4 */}
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <span className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">4</span>
                                <h3 className="text-xl font-semibold text-black">Wait for DNS Propagation</h3>
                            </div>
                            <p className="text-zinc-700">DNS changes typically take 5-30 minutes, but can take up to 24 hours.</p>
                        </div>
                    </section>

                    {/* Troubleshooting */}
                    <section className="bg-white p-6 rounded-lg border border-zinc-200">
                        <h2 className="text-2xl font-bold text-black mb-3">Troubleshooting</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-black mb-1">Domain not working after 24 hours?</h3>
                                <ul className="text-zinc-700 space-y-1 ml-4">
                                    <li>• Check CNAME value is exactly <code className="bg-zinc-100 px-1 rounded">cname.vercel-dns.com</code></li>
                                    <li>• Verify you used CNAME record type (not A record)</li>
                                    <li>• If using Cloudflare, disable the proxy (orange cloud)</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-black mb-1">SSL Certificate Error?</h3>
                                <p className="text-zinc-700">Wait 5-10 minutes after DNS propagation. SSL certificates are generated automatically.</p>
                            </div>
                        </div>
                    </section>

                    {/* Need Help */}
                    <section className="bg-gradient-to-r from-violet-50 to-fuchsia-50 p-6 rounded-lg border border-violet-200">
                        <h2 className="text-xl font-bold text-black mb-2">Need Help?</h2>
                        <p className="text-zinc-700 mb-4">Contact our support team if you're having trouble setting up your custom domain.</p>
                        <div className="flex gap-3">
                            <Link href="mailto:support@linkingo.in">
                                <Button variant="outline">Email Support</Button>
                            </Link>
                            <Link href="https://x.com/Linkingodotin" target="_blank">
                                <Button variant="outline">Twitter Support</Button>
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
