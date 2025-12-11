export default function MarketingPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Marketing Engine</h1>
                <p className="text-zinc-400">Manage coupons, discount codes, and special offers.</p>
            </div>

            <div className="rounded-xl border border-dashed border-zinc-800 p-12 text-center">
                <h3 className="text-lg font-medium text-zinc-300">No Active Campaigns</h3>
                <p className="text-zinc-500 mt-2">Create a coupon code to drive more sales.</p>
            </div>
        </div>
    );
}
