import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Upgrade to Pro | Linkingo",
    description: "Unlock advanced analytics, custom domains, premium themes, and more with Linkingo Pro. Start your free trial today!",
    openGraph: {
        title: "Upgrade to Linkingo Pro",
        description: "Unlock all features and grow your audience faster with Linkingo Pro",
        images: ["/images/linkingo-premium-product.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Upgrade to Linkingo Pro",
        description: "Unlock all features and grow your audience faster",
        images: ["/images/linkingo-premium-product.png"],
    },
};

export default function UpgradeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
