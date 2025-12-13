"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Crown, Save } from "lucide-react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserTheme, defaultTheme, applyTheme } from "@/lib/themes/theme-engine";
import { ThemeSelector } from "@/components/customize/theme-selector";
import { BackgroundSelector } from "@/components/customize/background-selector";
import { FontSelector } from "@/components/customize/font-selector";
import { ButtonStyleSelector } from "@/components/customize/button-style-selector";
import { AnimationSelector } from "@/components/customize/animation-selector";

export default function CustomizePage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isPremium, setIsPremium] = useState(false);
    const [theme, setTheme] = useState<UserTheme>(defaultTheme);

    useEffect(() => {
        if (user) {
            loadTheme();
        }
    }, [user]);

    // Apply theme whenever it changes
    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    const loadTheme = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const data = userDoc.data();
                setIsPremium(data.subscription?.status === 'active');
                if (data.customization) {
                    setTheme({ ...defaultTheme, ...data.customization });
                }
            }
        } catch (error) {
            console.error("Error loading theme:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);
        try {
            await updateDoc(doc(db, "users", user.uid), {
                customization: theme
            });
            alert("Customization saved successfully!");
        } catch (error) {
            console.error("Error saving customization:", error);
            alert("Failed to save customization");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-black mb-2">Customize Your Page</h1>
                    <p className="text-zinc-600">Personalize every aspect of your Linkingo page</p>
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
                                Save Changes
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="colors" className="w-full">
                <TabsList className="grid w-full grid-cols-5 lg:w-auto">
                    <TabsTrigger value="colors">Colors</TabsTrigger>
                    <TabsTrigger value="backgrounds">Backgrounds</TabsTrigger>
                    <TabsTrigger value="buttons">Buttons</TabsTrigger>
                    <TabsTrigger value="fonts">Fonts</TabsTrigger>
                    <TabsTrigger value="animations">Animations</TabsTrigger>
                </TabsList>

                {/* Colors Tab */}
                <TabsContent value="colors" className="mt-6">
                    <ThemeSelector
                        selectedId={theme.colorPaletteId}
                        onSelect={(id) => setTheme({ ...theme, colorPaletteId: id })}
                        isPremiumUser={isPremium}
                    />
                </TabsContent>

                {/* Backgrounds Tab */}
                <TabsContent value="backgrounds" className="mt-6">
                    <BackgroundSelector
                        selectedId={theme.backgroundId}
                        onSelect={(id) => setTheme({ ...theme, backgroundId: id })}
                        isPremiumUser={isPremium}
                    />
                </TabsContent>

                {/* Buttons Tab */}
                <TabsContent value="buttons" className="mt-6">
                    <ButtonStyleSelector
                        selectedId={theme.buttonStyleId}
                        onSelect={(id) => setTheme({ ...theme, buttonStyleId: id })}
                        isPremiumUser={isPremium}
                    />
                </TabsContent>

                {/* Fonts Tab */}
                <TabsContent value="fonts" className="mt-6 space-y-8">
                    <FontSelector
                        selectedId={theme.headingFontId}
                        onSelect={(id) => setTheme({ ...theme, headingFontId: id })}
                        isPremiumUser={isPremium}
                        label="Heading Font"
                    />
                    <FontSelector
                        selectedId={theme.bodyFontId}
                        onSelect={(id) => setTheme({ ...theme, bodyFontId: id })}
                        isPremiumUser={isPremium}
                        label="Body Font"
                    />
                </TabsContent>

                {/* Animations Tab */}
                <TabsContent value="animations" className="mt-6 space-y-8">
                    <AnimationSelector
                        selectedId={theme.hoverAnimationId}
                        onSelect={(id) => setTheme({ ...theme, hoverAnimationId: id })}
                        isPremiumUser={isPremium}
                        label="Hover Animation"
                        category="hover"
                    />
                    <AnimationSelector
                        selectedId={theme.entryAnimationId}
                        onSelect={(id) => setTheme({ ...theme, entryAnimationId: id })}
                        isPremiumUser={isPremium}
                        label="Entry Animation"
                        category="entry"
                    />
                    <AnimationSelector
                        selectedId={theme.clickAnimationId}
                        onSelect={(id) => setTheme({ ...theme, clickAnimationId: id })}
                        isPremiumUser={isPremium}
                        label="Click Animation"
                        category="click"
                    />
                    <AnimationSelector
                        selectedId={theme.continuousAnimationId}
                        onSelect={(id) => setTheme({ ...theme, continuousAnimationId: id })}
                        isPremiumUser={isPremium}
                        label="Continuous Animation"
                        category="continuous"
                    />
                </TabsContent>
            </Tabs>

            {/* Premium Upsell */}
            {!isPremium && (
                <div className="mt-8 p-6 bg-gradient-to-r from-violet-50 to-fuchsia-50 border border-violet-200 rounded-lg">
                    <div className="flex items-start gap-4">
                        <Crown className="w-8 h-8 text-violet-600 flex-shrink-0" />
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Unlock Premium Customization
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Get access to 25+ premium color themes, 25+ backgrounds, 8 button styles,
                                25 fonts, and 15 animations. Make your page truly unique!
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
