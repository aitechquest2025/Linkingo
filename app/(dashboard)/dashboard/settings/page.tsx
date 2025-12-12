export default function SettingsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-black dark:text-white mb-2">Account Settings</h1>
                <p className="text-zinc-600 dark:text-zinc-400">Manage your profile and preferences.</p>
            </div>

            <div className="space-y-6">
                <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900">
                    <h2 className="text-xl font-semibold text-black dark:text-white mb-4">Profile Information</h2>
                    <p className="text-zinc-600 dark:text-zinc-400">Update your username, bio, and social links.</p>
                </div>

                <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900">
                    <h2 className="text-xl font-semibold text-black dark:text-white mb-4">Account Security</h2>
                    <p className="text-zinc-600 dark:text-zinc-400">Change password and manage security settings.</p>
                </div>
            </div>
        </div>
    );
}
