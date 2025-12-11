import { LinkEditor } from "@/components/admin/link-editor";

export default function LinksPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Your Links</h1>
                <p className="text-muted-foreground">
                    Manage the links that appear on your profile. Drag to reorder.
                </p>
            </div>
            <LinkEditor />
        </div>
    );
}
