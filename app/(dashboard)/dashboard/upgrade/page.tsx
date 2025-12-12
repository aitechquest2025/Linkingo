import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Crown } from "lucide-react";

export default function UpgradePage() {
    const features = [
        "Unlimited links",
        "Advanced analytics",
        "Custom domain",
        "Remove Linkingo branding",
        "Priority support",
        "Revenue tracking",
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-black dark:text-white mb-2">Upgrade to Pro</h1>
                <p className="text-zinc-600 dark:text-zinc-400">Unlock all features and grow your audience faster.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    <CardHeader>
                        <CardTitle className="text-black dark:text-white">Free</CardTitle>
                        <CardDescription>Perfect for getting started</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-black dark:text-white mb-6">₹0<span className="text-lg font-normal text-zinc-600 dark:text-zinc-400">/month</span></div>
                        <ul className="space-y-3">
                            <li className="flex items-center text-zinc-600 dark:text-zinc-400">
                                <Check className="mr-2 h-4 w-4 text-green-500" />
                                Up to 5 links
                            </li>
                            <li className="flex items-center text-zinc-600 dark:text-zinc-400">
                                <Check className="mr-2 h-4 w-4 text-green-500" />
                                Basic analytics
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                <Card className="border-violet-500 dark:border-violet-600 bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-950/30 dark:to-fuchsia-950/30 relative overflow-hidden">
                    <div className="absolute top-4 right-4">
                        <Crown className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                    </div>
                    <CardHeader>
                        <CardTitle className="text-black dark:text-white">Pro</CardTitle>
                        <CardDescription>For serious creators</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-black dark:text-white mb-6">₹299<span className="text-lg font-normal text-zinc-600 dark:text-zinc-400">/month</span></div>
                        <ul className="space-y-3 mb-6">
                            {features.map((feature) => (
                                <li key={feature} className="flex items-center text-zinc-700 dark:text-zinc-300">
                                    <Check className="mr-2 h-4 w-4 text-violet-600 dark:text-violet-400" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white">
                            Upgrade Now
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
