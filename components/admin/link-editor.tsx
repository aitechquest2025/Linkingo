"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { LinkItem, linkService } from "@/lib/links";
import { SmartRulesDialog } from "@/components/admin/smart-rules-dialog";
import { CommerceDialog } from "@/components/admin/commerce-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch"; // Need to create this
import { Card } from "@/components/ui/card";
import {
    GripVertical,
    Trash2,
    Plus,
    Loader2,
    Image as ImageIcon,
} from "lucide-react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Sortable Link Item Component
function SortableLinkItem({
    item,
    onUpdate,
    onDelete,
}: {
    item: LinkItem;
    onUpdate: (id: string, data: Partial<LinkItem>) => void;
    onDelete: (id: string) => void;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className="mb-4">
            <Card className="flex items-center gap-4 p-4 bg-white shadow-sm border-gray-100 hover:border-gray-300 transition-colors">
                <div {...attributes} {...listeners} className="cursor-grab text-gray-400 hover:text-gray-600">
                    <GripVertical className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-2">
                    <div className="flex gap-2">
                        <Input
                            value={item.title}
                            onChange={(e) => onUpdate(item.id, { title: e.target.value })}
                            placeholder="Link Title"
                            className="font-semibold border-none hover:bg-gray-50 focus:bg-white h-auto p-0 px-2"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Input
                            value={item.url}
                            onChange={(e) => onUpdate(item.id, { url: e.target.value })}
                            placeholder="https://example.com"
                            className="text-sm text-muted-foreground border-none hover:bg-gray-50 focus:bg-white h-auto p-0 px-2"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Switch
                        checked={item.isVisible}
                        onCheckedChange={(checked) => onUpdate(item.id, { isVisible: checked })}
                    />
                    <SmartRulesDialog link={item} onUpdate={onUpdate} />
                    <CommerceDialog link={item} onUpdate={onUpdate} />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(item.id)}
                        className="text-gray-400 hover:text-red-500"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </Card>
        </div>
    );
}

export function LinkEditor() {
    const { user } = useAuth();
    const [links, setLinks] = useState<LinkItem[]>([]);
    const [loading, setLoading] = useState(true);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        if (!user) return;
        const unsubscribe = linkService.subscribeLinks(user.uid, (items) => {
            setLinks(items);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [user]);

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setLinks((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over?.id);
                const newItems = arrayMove(items, oldIndex, newIndex);

                // Optimistic update
                linkService.reorderLinks(newItems); // Fire and forget for UX
                return newItems;
            });
        }
    };

    const handleCreate = async () => {
        if (!user) return;
        await linkService.addLink(user.uid, {
            title: "New Link",
            url: "",
            order: links.length,
        });
    };

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-primary" /></div>;

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">My Links</h2>
                <Button onClick={handleCreate} className="bg-primary hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" /> Add Link
                </Button>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={links.map((l) => l.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {links.map((link) => (
                        <SortableLinkItem
                            key={link.id}
                            item={link}
                            onUpdate={linkService.updateLink}
                            onDelete={linkService.deleteLink}
                        />
                    ))}
                </SortableContext>
            </DndContext>

            {links.length === 0 && (
                <div className="text-center py-12 text-muted-foreground bg-white/50 rounded-xl border border-dashed border-gray-300">
                    <p>No links yet. Click "Add Link" to get started.</p>
                </div>
            )}
        </div>
    );
}
