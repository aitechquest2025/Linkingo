"use client";

import { useState, useRef, useEffect } from 'react';
import { Check, Copy } from 'lucide-react';

interface ColorPickerProps {
    value: string;
    onChange: (color: string) => void;
    label: string;
}

export function ColorPicker({ value, onChange, label }: ColorPickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const pickerRef = useRef<HTMLDivElement>(null);

    // Close picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative" ref={pickerRef}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>

            {/* Color Preview Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors bg-white"
            >
                <div
                    className="w-10 h-10 rounded-md border border-gray-200 flex-shrink-0"
                    style={{ backgroundColor: value }}
                />
                <div className="flex-1 text-left">
                    <div className="text-sm font-medium text-gray-900">{value.toUpperCase()}</div>
                    <div className="text-xs text-gray-500">Click to change</div>
                </div>
            </button>

            {/* Color Picker Popover */}
            {isOpen && (
                <div className="absolute z-50 mt-2 p-4 bg-white rounded-lg shadow-xl border border-gray-200 w-full sm:w-80">
                    {/* Native Color Input */}
                    <div className="mb-4">
                        <input
                            type="color"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className="w-full h-32 rounded-lg cursor-pointer border border-gray-200"
                        />
                    </div>

                    {/* HEX Input */}
                    <div className="mb-4">
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            HEX Color
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => {
                                    const hex = e.target.value;
                                    if (/^#[0-9A-F]{6}$/i.test(hex)) {
                                        onChange(hex);
                                    }
                                }}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm font-mono"
                                placeholder="#000000"
                            />
                            <button
                                type="button"
                                onClick={copyToClipboard}
                                className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                title="Copy to clipboard"
                            >
                                {copied ? (
                                    <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                    <Copy className="w-4 h-4 text-gray-600" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Preset Colors */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-2">
                            Quick Colors
                        </label>
                        <div className="grid grid-cols-8 gap-2">
                            {[
                                '#000000', '#FFFFFF', '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899',
                                '#1F2937', '#F3F4F6', '#DC2626', '#D97706', '#059669', '#2563EB', '#7C3AED', '#DB2777',
                            ].map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() => onChange(color)}
                                    className="w-8 h-8 rounded-md border-2 border-gray-200 hover:border-gray-400 transition-colors"
                                    style={{ backgroundColor: color }}
                                    title={color}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
