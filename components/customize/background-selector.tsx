"use client";

import { BackgroundStyle, backgroundStyles } from '@/lib/themes/backgrounds';
import { Crown } from 'lucide-react';
import { useState } from 'react';

interface BackgroundSelectorProps {
    selectedId: string;
    onSelect: (id: string) => void;
    isPremiumUser: boolean;
}

export function BackgroundSelector({ selectedId, onSelect, isPremiumUser }: BackgroundSelectorProps) {
    const [categoryFilter, setCategoryFilter] = useState<string>('all');

    const filteredBackgrounds = categoryFilter === 'all'
        ? backgroundStyles
        : backgroundStyles.filter(bg => bg.category === categoryFilter);

    const handleSelect = (background: BackgroundStyle) => {
        if (background.isPremium && !isPremiumUser) {
            alert('This background is premium only. Upgrade to Pro to unlock!');
            return;
        }
        onSelect(background.id);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Backgrounds</h3>

            {/* Category filters */}
            <div className="flex gap-2 overflow-x-auto">
                {['all', 'solid', 'gradient', 'pattern', 'animated', 'image'].map(category => (
                    <button
                        key={category}
                        onClick={() => setCategoryFilter(category)}
                        className={`px-4 py-2 rounded-lg border capitalize whitespace-nowrap ${categoryFilter === category
                                ? 'bg-purple-600 text-white border-purple-600'
                                : 'bg-white border-gray-200 hover:bg-gray-50'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Background grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredBackgrounds.map(background => (
                    <button
                        key={background.id}
                        onClick={() => handleSelect(background)}
                        className={`relative rounded-lg border-2 overflow-hidden transition-all ${selectedId === background.id
                                ? 'border-purple-600 ring-2 ring-purple-200'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        {/* Premium badge */}
                        {background.isPremium && (
                            <div className="absolute top-2 right-2 z-10">
                                <Crown className="w-4 h-4 text-yellow-500" />
                            </div>
                        )}

                        {/* Background preview */}
                        <div
                            className="h-24 w-full"
                            style={{ cssText: background.css }}
                        />

                        {/* Name */}
                        <div className="p-2 bg-white border-t">
                            <p className="text-sm font-medium text-gray-900 truncate">{background.name}</p>
                        </div>

                        {/* Lock overlay for premium */}
                        {background.isPremium && !isPremiumUser && (
                            <div className="absolute inset-0 bg-black/10 flex items-center justify-center backdrop-blur-[1px]">
                                <Crown className="w-6 h-6 text-yellow-500" />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
