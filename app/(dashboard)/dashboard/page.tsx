import { LinkManager } from "@/components/dashboard/link-manager";

export default function DashboardPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">My Links</h1>
                <p className="text-zinc-400">Manage and organize your public links here.</p>
            </div>

            <LinkManager />
        </div>
    );
}
