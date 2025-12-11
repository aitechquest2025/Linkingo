export default function SubscriptionsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Subscription Manager</h1>
                <p className="text-zinc-400">Create plans and manage subscriber tiers.</p>
            </div>

            <div className="rounded-xl border border-dashed border-zinc-800 p-12 text-center">
                <h3 className="text-lg font-medium text-zinc-300">No Plans Created</h3>
                <p className="text-zinc-500 mt-2">Start by creating a new subscription tier (e.g. Pro, Business).</p>
            </div>
        </div>
    );
}
