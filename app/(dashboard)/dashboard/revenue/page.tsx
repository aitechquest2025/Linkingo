export default function RevenuePage() {
    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-black dark:text-white mb-2">Revenue</h1>
                <p className="text-zinc-600 dark:text-zinc-400">Track your subscription earnings and payouts.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Total Revenue</p>
                    <p className="text-3xl font-bold text-black dark:text-white mt-2">₹0</p>
                </div>
                <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Active Subscribers</p>
                    <p className="text-3xl font-bold text-black dark:text-white mt-2">0</p>
                </div>
            </div>
        </div>
    );
}
