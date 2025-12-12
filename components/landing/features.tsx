import { Card, CardContent } from "@/components/ui/card";
import { Link2, IndianRupee, BarChart3 } from "lucide-react";

const features = [
    {
        title: "One Link for Everything",
        description: "Combine all your social profiles, content, and links into a single, beautiful landing page.",
        icon: Link2,
        gradient: "from-pink-500 to-rose-500",
    },
    {
        title: "Accept UPI Payments",
        description: "Receive payments directly to your bank account with zero platform fees using UPI.",
        icon: IndianRupee,
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        title: "Deep Analytics",
        description: "Track your clicks, views, and revenue to understand your audience better.",
        icon: BarChart3,
        gradient: "from-violet-500 to-purple-500",
    },
];

export function Features() {
    return (
        <section className="py-24 bg-zinc-950">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Everything you need to grow</h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        Powerful features designed for creators, built to help you scale your digital presence.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <Card key={i} className="bg-zinc-900 border-zinc-800 border overflow-hidden group hover:border-zinc-700 transition-colors">
                            <CardContent className="p-8">
                                <div className={`size-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <feature.icon className="text-white size-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-zinc-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
