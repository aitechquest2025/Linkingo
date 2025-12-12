"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Crown } from "lucide-react";

export default function UpgradePage() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
    const [region, setRegion] = useState<"india" | "global">("india");

    const plans = [
        {
            name: "Free",
            icon: "🎨",
            priceIndia: { monthly: 0, yearly: 0 },
            priceGlobal: { monthly: 0, yearly: 0 },
            description: "Perfect for getting started with your link-in-bio page.",
            features: [
                "Unlimited links",
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
            priceIndia: { monthly: 79, yearly: 570 }, // 40% discount: ₹948 → ₹570
            priceGlobal: { monthly: 1.99, yearly: 14.28 }, // 40% discount: $23.88 → $14.28
            description: "Unlock all features and grow your audience faster.",
            features: [
                "Unlimited links",
                "Advanced analytics",
                "Custom domain",
                "Remove branding",
                "Priority support",
                "Revenue tracking",
                "Custom themes & backgrounds",
                "API access"
            ],
            cta: "Start free trial",
            popular: true
        }
    ];

    const getPrice = (plan: typeof plans[0]) => {
        const prices = region === "india" ? plan.priceIndia : plan.priceGlobal;
        return billingCycle === "monthly" ? prices.monthly : prices.yearly;
    };

    const getCurrency = () => region === "india" ? "₹" : "$";

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
            <div className="max-w-5xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-black mb-4">Plans and pricing</h1>
                    <p className="text-zinc-600 mb-6">Choose the perfect plan for your needs</p>

                    {/* Region Toggle */}
                    <div className="inline-flex items-center gap-3 bg-white rounded-full p-1 shadow-sm border border-purple-200 mb-4">
                        <button
                            onClick={() => setRegion("india")}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${region === "india"
                                ? "bg-purple-600 text-white"
                                : "text-gray-600 hover:text-black"
                                }`}
                        >
                            🇮🇳 India
                        </button>
                        <button
                            onClick={() => setRegion("global")}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${region === "global"
                                ? "bg-purple-600 text-white"
                                : "text-gray-600 hover:text-black"
                                }`}
                        >
                            🌍 Global
                        </button>
                    </div>

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center gap-3 bg-white rounded-full p-1 shadow-sm border border-purple-200">
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
                                Save 40%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {plans.map((plan) => {
                        const price = getPrice(plan);
                        return (
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
                                            Most Popular
                                        </div>
                                    </div>
                                )}

                                <CardHeader className="pt-8">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-3xl">{plan.icon}</span>
                                        <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                    </div>
                                    <CardDescription className="text-base leading-relaxed">
                                        {plan.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    {/* Price */}
                                    <div>
                                        {price > 0 ? (
                                            <>
                                                <div className="text-5xl font-bold text-black">
                                                    {getCurrency()}{price}
                                                </div>
                                                <div className="text-sm text-gray-600 mt-1">
                                                    per {billingCycle === "yearly" ? "year" : "month"}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-5xl font-bold text-black">Free</div>
                                        )}
                                    </div>

                                    {/* CTA Button */}
                                    <Button
                                        className={`w-full h-12 text-base ${plan.popular
                                            ? "bg-purple-600 hover:bg-purple-700 text-white"
                                            : "bg-white border-2 border-gray-300 text-black hover:bg-gray-50"
                                            }`}
                                    >
                                        {plan.cta}
                                    </Button>

                                    {/* Features */}
                                    <ul className="space-y-3 pt-4 border-t">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <Check className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
