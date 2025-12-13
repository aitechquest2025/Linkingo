"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Loader2, Crown, Save, ChevronDown, ChevronUp } from "lucide-react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ColorPicker } from "@/components/customize/color-picker";
import { BackgroundSelector } from "@/components/customize/background-selector";
import { FontSelector } from "@/components/customize/font-selector";
import { ButtonStyleSelector } from "@/components/customize/button-style-selector";
import { AnimationSelector } from "@/components/customize/animation-selector";

interface CustomizationState {
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        text: string;
        link: string;
    };
    backgroundId: string;
    headingFontId: string;
    bodyFontId: string;
    buttonStyleId: string;
    hoverAnimationId?: string;
    entryAnimationId?: string;
}

const defaultCustomization: CustomizationState = {
    colors: {
        primary: "#8B5CF6",
        secondary: "#EC4899",
        accent: "#3B82F6",
        background: "#FFFFFF",
        text: "#1F2937",
        link: "#6366F1",
    },
    backgroundId: "solid-white",
    headingFontId: "poppins",
    bodyFontId: "inter",
    buttonStyleId: "solid",
};

export default function CustomizePage() {
    const { user, userData } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [customization, setCustomization] = useState<CustomizationState>(defaultCustomization);
    const [isPremium, setIsPremium] = useState(false);

    // Accordion state
    const [openSections, setOpenSections] = useState({
        colors: true,
        background: false,
        typography: false,
        buttons: false,
        animations: false,
    });

    useEffect(() => {
        if (user && userData) {
            loadCustomization();
            // Check if user has active Pro subscription
            setIsPremium(userData.subscription?.status === 'active');
        }
    }, [user, userData]);

    const loadCustomization = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const data = userDoc.data();
                if (data.customization) {
                    setCustomization({ ...defaultCustomization, ...data.customization });
                }
            }
        } catch (error) {
            console.error("Error loading customization:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);
        try {
            await updateDoc(doc(db, "users", user.uid), {
                customization: customization
            });
            alert("Customization saved successfully!");
        } catch (error) {
            console.error("Error saving customization:", error);
            alert("Failed to save customization");
        } finally {
            setSaving(false);
        }
    };

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Customize Your Page</h1>
                    <p className="text-gray-600 mt-1">Personalize every aspect of your Linkingo page</p>
                </div>
                <div className="flex gap-3">
                    {!isPremium && (
                        <Button
                            className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white"
                            onClick={() => window.location.href = '/dashboard/upgrade'}
                        >
                            <Crown className="mr-2 h-4 w-4" />
                            Upgrade to Pro
                        </Button>
                    )}
                    <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Save
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {/* Main Content - Responsive Layout */}
            <div className="grid lg:grid-cols-5 gap-6">
                {/* Customization Controls - Sidebar */}
                <div className="lg:col-span-3 space-y-4">

                    {/* Colors Section */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <button
                            onClick={() => toggleSection('colors')}
                            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                            <h2 className="text-lg font-semibold text-gray-900">Colors</h2>
                            {openSections.colors ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                        {openSections.colors && (
                            <div className="px-6 pb-6 space-y-4 border-t border-gray-100">
                                <p className="text-sm text-gray-600 mt-4">Choose custom colors for your page elements</p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <ColorPicker
                                        label="Primary Color"
                                        value={customization.colors.primary}
                                        onChange={(color) => setCustomization(prev => ({
                                            ...prev,
                                            colors: { ...prev.colors, primary: color }
                                        }))}
                                    />
                                    <ColorPicker
                                        label="Secondary Color"
                                        value={customization.colors.secondary}
                                        onChange={(color) => setCustomization(prev => ({
                                            ...prev,
                                            colors: { ...prev.colors, secondary: color }
                                        }))}
                                    />
                                    <ColorPicker
                                        label="Accent Color"
                                        value={customization.colors.accent}
                                        onChange={(color) => setCustomization(prev => ({
                                            ...prev,
                                            colors: { ...prev.colors, accent: color }
                                        }))}
                                    />
                                    <ColorPicker
                                        label="Background Color"
                                        value={customization.colors.background}
                                        onChange={(color) => setCustomization(prev => ({
                                            ...prev,
                                            colors: { ...prev.colors, background: color }
                                        }))}
                                    />
                                    <ColorPicker
                                        label="Text Color"
                                        value={customization.colors.text}
                                        onChange={(color) => setCustomization(prev => ({
                                            ...prev,
                                            colors: { ...prev.colors, text: color }
                                        }))}
                                    />
                                    <ColorPicker
                                        label="Link Color"
                                        value={customization.colors.link}
                                        onChange={(color) => setCustomization(prev => ({
                                            ...prev,
                                            colors: { ...prev.colors, link: color }
                                        }))}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Background Section */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <button
                            onClick={() => toggleSection('background')}
                            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <h2 className="text-lg font-semibold text-gray-900">Background Style</h2>
                                {!isPremium && <Crown className="w-4 h-4 text-yellow-500" />}
                            </div>
                            {openSections.background ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                        {openSections.background && (
                            <div className="px-6 pb-6 border-t border-gray-100">
                                <div className="mt-4">
                                    <BackgroundSelector
                                        selectedId={customization.backgroundId}
                                        onSelect={(id) => setCustomization(prev => ({ ...prev, backgroundId: id }))}
                                        isPremiumUser={isPremium}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Typography Section */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <button
                            onClick={() => toggleSection('typography')}
                            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <h2 className="text-lg font-semibold text-gray-900">Typography</h2>
                                {!isPremium && <Crown className="w-4 h-4 text-yellow-500" />}
                            </div>
                            {openSections.typography ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                        {openSections.typography && (
                            <div className="px-6 pb-6 space-y-6 border-t border-gray-100">
                                <div className="mt-4">
                                    <FontSelector
                                        selectedId={customization.headingFontId}
                                        onSelect={(id) => setCustomization(prev => ({ ...prev, headingFontId: id }))}
                                        isPremiumUser={isPremium}
                                        label="Heading Font"
                                    />
                                </div>
                                <FontSelector
                                    selectedId={customization.bodyFontId}
                                    onSelect={(id) => setCustomization(prev => ({ ...prev, bodyFontId: id }))}
                                    isPremiumUser={isPremium}
                                    label="Body Font"
                                />
                            </div>
                        )}
                    </div>

                    {/* Buttons Section */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <button
                            onClick={() => toggleSection('buttons')}
                            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <h2 className="text-lg font-semibold text-gray-900">Button Style</h2>
                                {!isPremium && <Crown className="w-4 h-4 text-yellow-500" />}
                            </div>
                            {openSections.buttons ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                        {openSections.buttons && (
                            <div className="px-6 pb-6 border-t border-gray-100">
                                <div className="mt-4">
                                    <ButtonStyleSelector
                                        selectedId={customization.buttonStyleId}
                                        onSelect={(id) => setCustomization(prev => ({ ...prev, buttonStyleId: id }))}
                                        isPremiumUser={isPremium}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Animations Section */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <button
                            onClick={() => toggleSection('animations')}
                            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <h2 className="text-lg font-semibold text-gray-900">Animations</h2>
                                {!isPremium && <Crown className="w-4 h-4 text-yellow-500" />}
                            </div>
                            {openSections.animations ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                        {openSections.animations && (
                            <div className="px-6 pb-6 space-y-6 border-t border-gray-100">
                                <div className="mt-4">
                                    <AnimationSelector
                                        selectedId={customization.hoverAnimationId}
                                        onSelect={(id) => setCustomization(prev => ({ ...prev, hoverAnimationId: id }))}
                                        isPremiumUser={isPremium}
                                        label="Hover Animation"
                                        category="hover"
                                    />
                                </div>
                                <AnimationSelector
                                    selectedId={customization.entryAnimationId}
                                    onSelect={(id) => setCustomization(prev => ({ ...prev, entryAnimationId: id }))}
                                    isPremiumUser={isPremium}
                                    label="Entry Animation"
                                    category="entry"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Live Preview - Sticky on Desktop */}
                <div className="lg:col-span-2">
                    <div className="sticky top-20">
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
                            <div
                                className="rounded-lg p-8 min-h-[400px] flex flex-col items-center justify-center space-y-4"
                                style={{
                                    backgroundColor: customization.colors.background,
                                    color: customization.colors.text
                                }}
                            >
                                <div className="w-20 h-20 rounded-full bg-gray-300" />
                                <h3 className="text-xl font-bold">@{user?.email?.split('@')[0]}</h3>
                                <p className="text-sm opacity-70 text-center">Your bio will appear here</p>
                                <div className="w-full max-w-xs space-y-3 mt-6">
                                    {[1, 2, 3].map(i => (
                                        <div
                                            key={i}
                                            className="p-3 text-center font-medium rounded-lg"
                                            style={{
                                                backgroundColor: customization.colors.primary,
                                                color: '#FFFFFF'
                                            }}
                                        >
                                            Link {i}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Premium Upsell */}
            {!isPremium && (
                <div className="mt-8 p-6 bg-gradient-to-r from-violet-50 to-fuchsia-50 border border-violet-200 rounded-lg">
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                        <Crown className="w-8 h-8 text-violet-600 flex-shrink-0" />
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Unlock Premium Customization
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Get access to 25+ backgrounds, 8 button styles, 25 fonts, and 15 animations.
                                Plus unlimited custom colors to make your page truly unique!
                            </p>
                            <Button
                                className="bg-violet-600 hover:bg-violet-700 text-white"
                                onClick={() => window.location.href = '/dashboard/upgrade'}
                            >
                                Upgrade to Pro - ₹79/month
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
