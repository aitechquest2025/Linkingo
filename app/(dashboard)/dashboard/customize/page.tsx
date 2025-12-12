"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
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

export default function CustomizePage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [theme, setTheme] = useState({
        colorTheme: "default",
        buttonStyle: "rounded",
        fontFamily: "inter"
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
            if (userDoc.exists() && userDoc.data().theme) {
                setTheme(userDoc.data().theme);
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
            <div>
                <h1 className="text-3xl font-bold text-black dark:text-white mb-2">Customize</h1>
                <p className="text-zinc-600 dark:text-zinc-400">Personalize your Linkingo page appearance</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Customization Options */}
                <div className="space-y-6">
                    {/* Color Theme */}
                    <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                        <CardHeader>
                            <CardTitle className="text-black dark:text-white">Color Theme</CardTitle>
                            <CardDescription>Choose a color scheme for your page</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-3">
                                {THEMES.map(t => (
                                    <button
                                        key={t.id}
                                        onClick={() => setTheme({ ...theme, colorTheme: t.id })}
                                        className={`p-4 rounded-lg border-2 transition-all ${theme.colorTheme === t.id
                                                ? "border-violet-600 ring-2 ring-violet-200"
                                                : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-400"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full ${t.accent}`} />
                                            <span className="text-sm font-medium text-black dark:text-white">{t.name}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Button Style */}
                    <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                        <CardHeader>
                            <CardTitle className="text-black dark:text-white">Button Style</CardTitle>
                            <CardDescription>Choose how your link buttons look</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {BUTTON_STYLES.map(style => (
                                    <button
                                        key={style.id}
                                        onClick={() => setTheme({ ...theme, buttonStyle: style.id })}
                                        className={`w-full p-4 border-2 transition-all ${theme.buttonStyle === style.id
                                                ? "border-violet-600 bg-violet-50 dark:bg-violet-950/30"
                                                : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-400"
                                            } ${style.class}`}
                                    >
                                        <span className="text-sm font-medium text-black dark:text-white">{style.name}</span>
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Font Family */}
                    <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                        <CardHeader>
                            <CardTitle className="text-black dark:text-white">Font</CardTitle>
                            <CardDescription>Select your preferred font</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {["inter", "poppins", "roboto", "montserrat"].map(font => (
                                    <button
                                        key={font}
                                        onClick={() => setTheme({ ...theme, fontFamily: font })}
                                        className={`w-full p-3 text-left rounded-lg border transition-all ${theme.fontFamily === font
                                                ? "border-violet-600 bg-violet-50 dark:bg-violet-950/30"
                                                : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-400"
                                            }`}
                                    >
                                        <span className="text-sm font-medium text-black dark:text-white capitalize">{font}</span>
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Preview */}
                <div className="lg:sticky lg:top-8 h-fit">
                    <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                        <CardHeader>
                            <CardTitle className="text-black dark:text-white">Preview</CardTitle>
                            <CardDescription>See how your page will look</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className={`${selectedTheme.bg} ${selectedTheme.text} p-8 rounded-lg min-h-96 flex flex-col items-center justify-center space-y-4`}>
                                <div className="w-20 h-20 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                                <h3 className="text-xl font-bold">@{user?.email?.split('@')[0]}</h3>
                                <p className="text-sm text-center opacity-70">Your bio will appear here</p>
                                <div className="w-full max-w-xs space-y-3 mt-6">
                                    {[1, 2, 3].map(i => (
                                        <div
                                            key={i}
                                            className={`${selectedTheme.accent} text-white p-3 text-center font-medium ${BUTTON_STYLES.find(s => s.id === theme.buttonStyle)?.class
                                                }`}
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
