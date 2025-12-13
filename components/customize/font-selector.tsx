"use client";

import { FontOption, fonts } from '@/lib/themes/fonts';
import { Crown } from 'lucide-react';
import { useState } from 'react';

interface FontSelectorProps {
    selectedId: string;
    onSelect: (id: string) => void;
    isPremiumUser: boolean;
    label: string;
}

export function FontSelector({ selectedId, onSelect, isPremiumUser, label }: FontSelectorProps) {
    const [categoryFilter, setCategoryFilter] = useState<string>('all');

    const filteredFonts = categoryFilter === 'all'
        ? fonts
        : fonts.filter(font => font.category === categoryFilter);

    const handleSelect = (font: FontOption) => {
        if (font.isPremium && !isPremiumUser) {
            alert('This font is premium only. Upgrade to Pro to unlock!');
            return;
        }
        onSelect(font.id);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">{label}</h3>

            {/* Category filters */}
            <div className="flex gap-2 overflow-x-auto">
                {['all', 'serif', 'sans-serif', 'display', 'monospace'].map(category => (
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

            {/* Font list */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredFonts.map(font => (
                    <button
                        key={font.id}
                        onClick={() => handleSelect(font)}
                        className={`w-full p-4 rounded-lg border-2 text-left transition-all ${selectedId === font.id
                                ? 'border-purple-600 bg-purple-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <p
                                    className="text-lg mb-1"
                                    style={{ fontFamily: `'${font.googleFontName}', ${font.fallback}` }}
                                >
                                    The quick brown fox jumps
                                </p>
                                <p className="text-sm text-gray-600">{font.name}</p>
                            </div>
                            {font.isPremium && (
                                <Crown className="w-4 h-4 text-yellow-500 ml-2" />
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
