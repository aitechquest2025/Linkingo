"use client";

import { LinkAnimation, linkAnimations } from '@/lib/themes/animations';
import { Crown } from 'lucide-react';
import { useState } from 'react';

interface AnimationSelectorProps {
    selectedId?: string;
    onSelect: (id: string | undefined) => void;
    isPremiumUser: boolean;
    label: string;
    category: LinkAnimation['category'];
}

export function AnimationSelector({ selectedId, onSelect, isPremiumUser, label, category }: AnimationSelectorProps) {
    const animations = linkAnimations.filter(a => a.category === category);

    const handleSelect = (animation: LinkAnimation) => {
        if (animation.isPremium && !isPremiumUser) {
            alert('This animation is premium only. Upgrade to Pro to unlock!');
            return;
        }
        onSelect(animation.id);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{label}</h3>
                <button
                    onClick={() => onSelect(undefined)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                >
                    None
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {animations.map(animation => (
                    <button
                        key={animation.id}
                        onClick={() => handleSelect(animation)}
                        className={`relative p-4 rounded-lg border-2 text-left transition-all ${selectedId === animation.id
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900">{animation.name}</p>
                                <p className="text-sm text-gray-500 capitalize">{animation.category}</p>
                            </div>
                            {animation.isPremium && (
                                <Crown className="w-4 h-4 text-yellow-500" />
                            )}
                        </div>

                        {/* Animation preview */}
                        <div className="mt-3">
                            <div className="w-full h-10 bg-purple-100 rounded flex items-center justify-center text-sm font-medium">
                                Preview
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
