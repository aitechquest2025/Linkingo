"use client";

import { ButtonStyle, buttonStyles } from '@/lib/themes/button-styles';
import { Crown } from 'lucide-react';

interface ButtonStyleSelectorProps {
    selectedId: string;
    onSelect: (id: string) => void;
    isPremiumUser: boolean;
}

export function ButtonStyleSelector({ selectedId, onSelect, isPremiumUser }: ButtonStyleSelectorProps) {
    const handleSelect = (style: ButtonStyle) => {
        if (style.isPremium && !isPremiumUser) {
            alert('This button style is premium only. Upgrade to Pro to unlock!');
            return;
        }
        onSelect(style.id);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Button Styles</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {buttonStyles.map(style => (
                    <button
                        key={style.id}
                        onClick={() => handleSelect(style)}
                        className={`relative p-6 rounded-lg border-2 transition-all ${selectedId === style.id
                                ? 'border-purple-600 ring-2 ring-purple-200'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        {/* Premium badge */}
                        {style.isPremium && (
                            <div className="absolute top-2 right-2">
                                <Crown className="w-4 h-4 text-yellow-500" />
                            </div>
                        )}

                        {/* Button preview */}
                        <div className="flex flex-col items-center gap-3">
                            <div
                                className="px-6 py-3 rounded-lg font-semibold"
                                style={{ cssText: style.css.base }}
                            >
                                Sample Button
                            </div>
                            <p className="text-sm font-medium text-gray-900">{style.name}</p>
                        </div>

                        {/* Lock overlay */}
                        {style.isPremium && !isPremiumUser && (
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
