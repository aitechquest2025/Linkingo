"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload, Loader2 } from "lucide-react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function SettingsPage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        displayName: "",
        bio: "",
        photoURL: "",
        coverURL: "",
        socialLinks: {
            twitter: "",
            instagram: "",
            youtube: "",
            tiktok: "",
            linkedin: "",
            telegram: "",
            facebook: "",
            github: ""
        },
        customDomain: ""
    });

    useEffect(() => {
        if (user) {
            loadUserData();
        }
    }, [user]);

    const loadUserData = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const data = userDoc.data();
                setFormData({
                    username: data.username || "",
                    displayName: data.displayName || "",
                    bio: data.bio || "",
                    photoURL: data.photoURL || "",
                    coverURL: data.coverURL || "",
                    socialLinks: data.socialLinks || {
                        twitter: "",
                        instagram: "",
                        youtube: "",
                        tiktok: "",
                        linkedin: "",
                        telegram: "",
                        facebook: "",
                        github: ""
                    },
                    customDomain: data.customDomain || ""
                });
            }
        } catch (error) {
            console.error("Error loading user data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);
        try {
            await updateDoc(doc(db, "users", user.uid), {
                username: formData.username,
                displayName: formData.displayName,
                bio: formData.bio,
                photoURL: formData.photoURL,
                coverURL: formData.coverURL,
                socialLinks: formData.socialLinks,
                customDomain: formData.customDomain
            });
            alert("Settings saved successfully!");
        } catch (error) {
            console.error("Error saving settings:", error);
            alert("Failed to save settings");
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
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-black dark:text-white mb-2">Account Settings</h1>
                <p className="text-zinc-600 dark:text-zinc-400">Manage your profile and preferences</p>
            </div>

            {/* Profile Images */}
            <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <CardHeader>
                    <CardTitle className="text-black dark:text-white">Profile Images</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 block">Profile Picture</label>
                        <div className="flex items-center gap-4">
                            <div className="size-20 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                                {formData.photoURL ? (
                                    <img src={formData.photoURL} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-2xl font-bold text-zinc-500">
                                        {formData.displayName?.[0] || user?.email?.[0].toUpperCase()}
                                    </span>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="border-zinc-300 dark:border-zinc-700">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload
                                </Button>
                                <Button variant="outline" size="sm" className="border-zinc-300 dark:border-zinc-700">
                                    <Camera className="mr-2 h-4 w-4" />
                                    Camera
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 block">Cover Image (Optional)</label>
                        <div className="flex items-center gap-4">
                            <div className="w-32 h-20 rounded-lg bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                                {formData.coverURL && (
                                    <img src={formData.coverURL} alt="Cover" className="w-full h-full object-cover" />
                                )}
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="border-zinc-300 dark:border-zinc-700">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload Cover
                                </Button>
                                <Button variant="outline" size="sm" className="border-zinc-300 dark:border-zinc-700">
                                    <Camera className="mr-2 h-4 w-4" />
                                    Camera
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Basic Information */}
            <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <CardHeader>
                    <CardTitle className="text-black dark:text-white">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 block">Username</label>
                        <Input
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            placeholder="username"
                            className="bg-white dark:bg-black border-zinc-300 dark:border-zinc-700"
                        />
                        <p className="text-xs text-zinc-500 mt-1">Your username cannot be changed</p>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 block">Display Name</label>
                        <Input
                            value={formData.displayName}
                            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                            placeholder="Your Name"
                            className="bg-white dark:bg-black border-zinc-300 dark:border-zinc-700"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 block">Bio</label>
                        <Textarea
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            placeholder="Tell people about yourself..."
                            className="bg-white dark:bg-black border-zinc-300 dark:border-zinc-700 min-h-24"
                            maxLength={80}
                        />
                        <p className="text-xs text-zinc-500 mt-1">{formData.bio.length}/80 characters</p>
                    </div>
                </CardContent>
            </Card>

            {/* Social Media Links */}
            <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <CardHeader>
                    <CardTitle className="text-black dark:text-white">Social Media Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {Object.entries(formData.socialLinks).map(([platform, url]) => (
                        <div key={platform}>
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 block capitalize">{platform}</label>
                            <Input
                                value={url}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    socialLinks: { ...formData.socialLinks, [platform]: e.target.value }
                                })}
                                placeholder={`https://${platform}.com/username`}
                                className="bg-white dark:bg-black border-zinc-300 dark:border-zinc-700"
                            />
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Custom Domain */}
            <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <CardHeader>
                    <CardTitle className="text-black dark:text-white">Custom Domain</CardTitle>
                    <CardDescription>Connect your own domain to your Linkingo page</CardDescription>
                </CardHeader>
                <CardContent>
                    <Input
                        value={formData.customDomain}
                        onChange={(e) => setFormData({ ...formData, customDomain: e.target.value })}
                        placeholder="yourdomain.com"
                        className="bg-white dark:bg-black border-zinc-300 dark:border-zinc-700"
                    />
                </CardContent>
            </Card>

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
                        "Save Changes"
                    )}
                </Button>
            </div>
        </div>
    );
}
