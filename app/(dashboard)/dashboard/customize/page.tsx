"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Lock, Crown } from "lucide-react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const THEMES = [
    { id: "default", name: "Default", bg: "bg-white", text: "text-black", accent: "bg-violet-600" },
    { id: "dark", name: "Dark Mode", bg: "bg-zinc-900", text: "text-white", accent: "bg-violet-500" },
    { id: "ocean", name: "Ocean", bg: "bg-blue-50", text: "text-blue-900", accent: "bg-blue-600" },
    { id: "sunset", name: "Sunset", bg: "bg-orange-50", text: "text-orange-900", accent: "bg-orange-600" },
    { id: "forest", name: "Forest", bg: "bg-green-50", text: "text-green-900", accent: "bg-green-600" },
    { id: "lavender", name: "Lavender", bg: "bg-purple-50", text: "text-purple-900", accent: "bg-purple-600" },
];

const BUTTON_STYLES = [
    { id: "rounded", name: "Rounded", class: "rounded-full" },
    { id: "square", name: "Square", class: "rounded-md" },
    { id: "pill", name: "Pill", class: "rounded-3xl" },
];

const BACKGROUND_TYPES = [
    { id: "solid", name: "Solid Color", premium: false },
    { id: "gradient", name: "Gradient", premium: true },
    { id: "image", name: "Background Image", premium: true },
];

const ANIMATIONS = [
    { id: "none", name: "None", premium: false },
    { id: "fade", name: "Fade In", premium: true },
    { id: "slide", name: "Slide Up", premium: true },
    { id: "bounce", name: "Bounce", premium: true },
];

export default function CustomizePage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isPremium, setIsPremium] = useState(false);

    const [theme, setTheme] = useState({
        colorTheme: "default",
        buttonStyle: "rounded",
        fontFamily: "inter",
        backgroundType: "solid",
        customColor: "#ffffff",
        gradientStart: "#8b5cf6",
        gradientEnd: "#ec4899",
        backgroundImage: "",
        animation: "none",
        shadowStyle: "none"
    });

    useEffect(() => {
        if (user) {
            loadTheme();
        }
    }, [user]);

    const loadTheme = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const data = userDoc.data();
                setIsPremium(data.subscriptionStatus === 'premium');
                if (data.theme) {
                    setTheme({ ...theme, ...data.theme });
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
                theme: theme
            });
            alert("Theme saved successfully!");
        } catch (error) {
            console.error("Error saving theme:", error);
            alert("Failed to save theme");
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

    const selectedTheme = THEMES.find(t => t.id === theme.colorTheme) || THEMES[0];

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-black mb-2">Customize</h1>
                    <p className="text-zinc-600">Personalize your Linkingo page appearance</p>
                </div>
                {!isPremium && (
                    <Button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white">
                        <Crown className="mr-2 h-4 w-4" />
                        Upgrade for More
                    </Button>
                )}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Customization Options */}
                <div className="space-y-6">
                    {/* Color Theme */}
                    <Card className="border-zinc-200 bg-white">
                        <CardHeader>
                            <CardTitle className="text-black">Color Theme</CardTitle>
                            <CardDescription>Choose a color scheme for your page</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-3">
                                {THEMES.map(t => (
                                    <button
                                        key={t.id}
                                        onClick={() => {
                                            // Map theme colors to actual background colors
                                            const themeColors: Record<string, string> = {
                                                'default': '#ffffff',
                                                'dark': '#18181b',
                                                'ocean': '#eff6ff',
                                                'sunset': '#7f1d1d', // Dark red/maroon
                                                'forest': '#f0fdf4',
                                                'lavender': '#faf5ff'
                                            };
                                            setTheme({
                                                ...theme,
                                                colorTheme: t.id,
                                                customColor: themeColors[t.id] || '#ffffff'
                                            });
                                        }}
                                        className={`p-4 rounded-lg border-2 transition-all ${theme.colorTheme === t.id
                                            ? "border-violet-600 ring-2 ring-violet-200"
                                            : "border-zinc-200 hover:border-zinc-400"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full ${t.accent}`} />
                                            <span className="text-sm font-medium text-black">{t.name}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Background Type - PREMIUM */}
                    <Card className="border-zinc-200 bg-white">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-black">Background Style</CardTitle>
                                    <CardDescription>Advanced background options</CardDescription>
                                </div>
                                {!isPremium && <Crown className="h-5 w-5 text-amber-500" />}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                {BACKGROUND_TYPES.map(bg => (
                                    <button
                                        key={bg.id}
                                        onClick={() => {
                                            if (bg.premium && !isPremium) {
                                                alert("Upgrade to Premium to unlock this feature!");
                                                return;
                                            }
                                            setTheme({ ...theme, backgroundType: bg.id });
                                        }}
                                        disabled={bg.premium && !isPremium}
                                        className={`w-full p-3 text-left rounded-lg border transition-all flex items-center justify-between ${theme.backgroundType === bg.id
                                            ? "border-violet-600 bg-violet-50"
                                            : "border-zinc-200 hover:border-zinc-400"
                                            } ${bg.premium && !isPremium ? "opacity-60" : ""}`}
                                    >
                                        <span className="text-sm font-medium text-black">{bg.name}</span>
                                        {bg.premium && !isPremium && <Lock className="h-4 w-4 text-zinc-400" />}
                                    </button>
                                ))}
                            </div>

                            {theme.backgroundType === "solid" && (
                                <div>
                                    <label className="text-sm font-medium text-zinc-700 mb-2 block">Custom Color</label>
                                    <Input
                                        type="color"
                                        value={theme.customColor}
                                        onChange={(e) => setTheme({ ...theme, customColor: e.target.value })}
                                        className="h-12 w-full"
                                    />
                                </div>
                            )}

                            {theme.backgroundType === "gradient" && isPremium && (
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-sm font-medium text-zinc-700 mb-2 block">Start Color</label>
                                        <Input
                                            type="color"
                                            value={theme.gradientStart}
                                            onChange={(e) => setTheme({ ...theme, gradientStart: e.target.value })}
                                            className="h-12 w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-zinc-700 mb-2 block">End Color</label>
                                        <Input
                                            type="color"
                                            value={theme.gradientEnd}
                                            onChange={(e) => setTheme({ ...theme, gradientEnd: e.target.value })}
                                            className="h-12 w-full"
                                        />
                                    </div>
                                </div>
                            )}

                            {theme.backgroundType === "image" && isPremium && (
                                <div>
                                    <label className="text-sm font-medium text-zinc-700 mb-2 block">Image URL</label>
                                    <Input
                                        value={theme.backgroundImage}
                                        onChange={(e) => setTheme({ ...theme, backgroundImage: e.target.value })}
                                        placeholder="https://example.com/image.jpg"
                                        className="bg-white border-zinc-300"
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Button Style */}
                    <Card className="border-zinc-200 bg-white">
                        <CardHeader>
                            <CardTitle className="text-black">Button Style</CardTitle>
                            <CardDescription>Choose how your link buttons look</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {BUTTON_STYLES.map(style => (
                                    <button
                                        key={style.id}
                                        onClick={() => setTheme({ ...theme, buttonStyle: style.id })}
                                        className={`w-full p-4 border-2 transition-all ${theme.buttonStyle === style.id
                                            ? "border-violet-600 bg-violet-50"
                                            : "border-zinc-200 hover:border-zinc-400"
                                            } ${style.class}`}
                                    >
                                        <span className="text-sm font-medium text-black">{style.name}</span>
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Animations - PREMIUM */}
                    <Card className="border-zinc-200 bg-white">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-black">Link Animations</CardTitle>
                                    <CardDescription>Add motion to your links</CardDescription>
                                </div>
                                {!isPremium && <Crown className="h-5 w-5 text-amber-500" />}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {ANIMATIONS.map(anim => (
                                    <button
                                        key={anim.id}
                                        onClick={() => {
                                            if (anim.premium && !isPremium) {
                                                alert("Upgrade to Premium to unlock animations!");
                                                return;
                                            }
                                            setTheme({ ...theme, animation: anim.id });
                                        }}
                                        disabled={anim.premium && !isPremium}
                                        className={`w-full p-3 text-left rounded-lg border transition-all flex items-center justify-between ${theme.animation === anim.id
                                            ? "border-violet-600 bg-violet-50"
                                            : "border-zinc-200 hover:border-zinc-400"
                                            } ${anim.premium && !isPremium ? "opacity-60" : ""}`}
                                    >
                                        <span className="text-sm font-medium text-black">{anim.name}</span>
                                        {anim.premium && !isPremium && <Lock className="h-4 w-4 text-zinc-400" />}
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Font Family */}
                    <Card className="border-zinc-200 bg-white">
                        <CardHeader>
                            <CardTitle className="text-black">Font</CardTitle>
                            <CardDescription>Select your preferred font</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {["inter", "poppins", "roboto", "montserrat"].map(font => (
                                    <button
                                        key={font}
                                        onClick={() => setTheme({ ...theme, fontFamily: font })}
                                        className={`w-full p-3 text-left rounded-lg border transition-all ${theme.fontFamily === font
                                            ? "border-violet-600 bg-violet-50"
                                            : "border-zinc-200 hover:border-zinc-400"
                                            }`}
                                    >
                                        <span className="text-sm font-medium text-black capitalize">{font}</span>
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Preview */}
                <div className="lg:sticky lg:top-8 h-fit">
                    <Card className="border-zinc-200 bg-white">
                        <CardHeader>
                            <CardTitle className="text-black">Preview</CardTitle>
                            <CardDescription>See how your page will look</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div
                                className={`${selectedTheme.bg} ${selectedTheme.text} p-8 rounded-lg min-h-96 flex flex-col items-center justify-center space-y-4 relative overflow-hidden`}
                                style={{
                                    background: theme.backgroundType === "gradient" && isPremium
                                        ? `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`
                                        : theme.backgroundType === "image" && isPremium && theme.backgroundImage
                                            ? `url(${theme.backgroundImage}) center/cover`
                                            : theme.backgroundType === "solid"
                                                ? theme.customColor
                                                : undefined
                                }}
                            >
                                <div className="w-20 h-20 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                                <h3 className="text-xl font-bold">@{user?.email?.split('@')[0]}</h3>
                                <p className="text-sm text-center opacity-70">Your bio will appear here</p>
                                <div className="w-full max-w-xs space-y-3 mt-6">
                                    {[1, 2, 3].map(i => (
                                        <div
                                            key={i}
                                            className={`${selectedTheme.accent} text-white p-3 text-center font-medium ${BUTTON_STYLES.find(s => s.id === theme.buttonStyle)?.class
                                                } transition-transform ${theme.animation === 'bounce' && isPremium ? 'hover:scale-105' : ''}`}
                                        >
                                            Link {i}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-violet-600 hover:bg-violet-700 text-white"
                >
                    {saving ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        "Save Theme"
                    )}
                </Button>
            </div>
        </div>
    );
}
