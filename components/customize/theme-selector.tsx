"use client";

import { ColorPalette, colorPalettes } from '@/lib/themes/color-palettes';
import { Crown } from 'lucide-react';

interface ThemeSelectorProps {
    selectedId: string;
    onSelect: (id: string) => void;
    isPremiumUser: boolean;
}

export function ThemeSelector({ selectedId, onSelect, isPremiumUser }: ThemeSelectorProps) {
    const handleSelect = (palette: ColorPalette) => {
        if (palette.isPremium && !isPremiumUser) {
            alert('This theme is premium only. Upgrade to Pro to unlock!');
            return;
        }
        onSelect(palette.id);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Color Themes</h3>

            {/* Category filters */}
            <div className="grid grid-cols-3 gap-2">
                {['vibrant', 'pastel', 'dark'].map(category => (
                    <button
                        key={category}
                        className="px-4 py-2 rounded-lg border capitalize hover:bg-gray-50"
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Theme grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {colorPalettes.map(palette => (
                    <button
                        key={palette.id}
                        onClick={() => handleSelect(palette)}
                        className={`relative p-4 rounded-lg border-2 transition-all ${selectedId === palette.id
                                ? 'border-purple-600 ring-2 ring-purple-200'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        {/* Premium badge */}
                        {palette.isPremium && (
                            <div className="absolute top-2 right-2">
                                <Crown className="w-4 h-4 text-yellow-500" />
                            </div>
                        )}

                        {/* Color preview */}
                        <div className="space-y-2">
                            <div className="flex gap-1 h-8">
                                <div
                                    className="flex-1 rounded"
                                    style={{ background: palette.colors.primary }}
                                />
                                <div
                                    className="flex-1 rounded"
                                    style={{ background: palette.colors.secondary }}
                                />
                                <div
                                    className="flex-1 rounded"
                                    style={{ background: palette.colors.accent }}
                                />
                            </div>
                            <p className="text-sm font-medium text-gray-900">{palette.name}</p>
                            <p className="text-xs text-gray-500 capitalize">{palette.category}</p>
                        </div>

                        {/* Lock overlay for premium */}
                        {palette.isPremium && !isPremiumUser && (
                            <div className="absolute inset-0 bg-black/10 rounded-lg flex items-center justify-center backdrop-blur-[1px]">
                                <Crown className="w-6 h-6 text-yellow-500" />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
