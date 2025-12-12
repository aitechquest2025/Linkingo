export default function AnalyticsPage() {
    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-black dark:text-white mb-2">Analytics</h1>
                <p className="text-zinc-600 dark:text-zinc-400">Track your link performance and audience insights.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Total Clicks</p>
                    <p className="text-3xl font-bold text-black dark:text-white mt-2">0</p>
                </div>
                <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Page Views</p>
                    <p className="text-3xl font-bold text-black dark:text-white mt-2">0</p>
                </div>
                <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Click Rate</p>
                    <p className="text-3xl font-bold text-black dark:text-white mt-2">0%</p>
                </div>
            </div>
        </div>
    );
}
