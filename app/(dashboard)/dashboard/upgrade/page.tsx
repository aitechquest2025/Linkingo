"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Crown } from "lucide-react";

export default function UpgradePage() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

    const plans = [
        {
            name: "Free",
            icon: "🎨",
            price: 0,
            description: "Design anything and bring your ideas to life. No cost, just creativity.",
            features: [
                "Up to 5 links",
                "Basic analytics",
                "Linkingo branding",
                "Community support"
            ],
            cta: "Get started",
            popular: false
        },
        {
            name: "Pro",
            icon: "👑",
            price: billingCycle === "monthly" ? 299 : 2999,
            description: "Unlock premium content, more powerful design tools, and AI features.",
            features: [
                "Unlimited links",
                "Advanced analytics",
                "Custom domain",
                "Remove branding",
                "Priority support",
                "Revenue tracking",
                "Custom themes",
                "API access"
            ],
            cta: "Start a free trial",
            popular: true,
            savings: billingCycle === "yearly" ? "Save up to 16%" : null
        },
        {
            name: "Business",
            icon: "💼",
            price: billingCycle === "monthly" ? 6500 : 65000,
            description: "Create content faster, market smarter, and grow your business with advanced tools.",
            features: [
                "Everything in Pro",
                "Team collaboration",
                "White label",
                "Dedicated support",
                "Custom integrations",
                "SLA guarantee"
            ],
            cta: "Start a free trial",
            popular: false
        },
        {
            name: "Enterprise",
            icon: "🏢",
            price: null,
            description: "Empower your organisation with end-to-end visual communication.",
            features: [
                "Everything in Business",
                "Unlimited team members",
                "Advanced security",
                "Custom contracts",
                "Dedicated account manager"
            ],
            cta: "Contact Sales",
            popular: false
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-black mb-4">Plans and pricing</h1>

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center gap-3 bg-white rounded-full p-1 shadow-sm border border-purple-200 mt-6">
                        <button
                            onClick={() => setBillingCycle("monthly")}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${billingCycle === "monthly"
                                    ? "bg-purple-600 text-white"
                                    : "text-gray-600 hover:text-black"
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle("yearly")}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${billingCycle === "yearly"
                                    ? "bg-purple-600 text-white"
                                    : "text-gray-600 hover:text-black"
                                }`}
                        >
                            Yearly
                            <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">
                                Save up to 16%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {plans.map((plan) => (
                        <Card
                            key={plan.name}
                            className={`relative ${plan.popular
                                    ? "border-2 border-purple-500 shadow-xl scale-105"
                                    : "border-gray-200 bg-white"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                                        <Crown className="h-3 w-3" />
                                        Intro price
                                    </div>
                                </div>
                            )}

                            <CardHeader className="pt-8">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl">{plan.icon}</span>
                                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                                    {plan.popular && <Crown className="h-5 w-5 text-yellow-500" />}
                                </div>
                                <CardDescription className="text-sm leading-relaxed">
                                    {plan.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-6">
                                {/* Price */}
                                <div>
                                    {plan.price !== null ? (
                                        <>
                                            <div className="text-4xl font-bold text-black">
                                                ₹{plan.price.toLocaleString()}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                /{billingCycle === "yearly" ? "year" : "month"} for one person
                                            </div>
                                            {plan.savings && (
                                                <div className="text-sm text-purple-600 font-medium mt-1">
                                                    {plan.savings}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="text-2xl font-bold text-black">Let's talk</div>
                                    )}
                                </div>

                                {/* CTA Button */}
                                <Button
                                    className={`w-full ${plan.popular
                                            ? "bg-purple-600 hover:bg-purple-700 text-white"
                                            : "bg-white border-2 border-gray-300 text-black hover:bg-gray-50"
                                        }`}
                                >
                                    {plan.cta}
                                </Button>

                                {/* Features */}
                                <ul className="space-y-3 pt-4 border-t">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm">
                                            <Check className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
