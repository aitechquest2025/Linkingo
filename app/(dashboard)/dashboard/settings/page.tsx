"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Upload, User, Globe, Share2 } from "lucide-react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";

export default function SettingsPage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState<"photo" | "logo" | null>(null);

    const [profile, setProfile] = useState({
        username: "",
        displayName: "",
        bio: "",
        photoURL: "",
        coverURL: "",
        customDomain: "",
        socialLinks: {
            twitter: "",
            instagram: "",
            youtube: "",
            tiktok: "",
            linkedin: "",
            telegram: "",
            facebook: "",
            github: ""
        }
    });

    useEffect(() => {
        if (user) {
            loadProfile();
        }
    }, [user]);

    const loadProfile = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const data = userDoc.data();
                setProfile({
                    username: data.username || "",
                    displayName: data.displayName || "",
                    bio: data.bio || "",
                    photoURL: data.photoURL || "",
                    coverURL: data.coverURL || "",
                    customDomain: data.customDomain || "",
                    socialLinks: data.socialLinks || {
                        twitter: "",
                        instagram: "",
                        youtube: "",
                        tiktok: "",
                        linkedin: "",
                        telegram: "",
                        facebook: "",
                        github: ""
                    }
                });
            }
        } catch (error) {
            console.error("Error loading profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (file: File, type: "photo" | "logo") => {
        if (!user) return;
        setUploading(type);

        try {
            // Create a reference to the file in Firebase Storage
            const storageRef = ref(storage, `users/${user.uid}/${type}-${Date.now()}.${file.name.split('.').pop()}`);

            // Upload the file
            await uploadBytes(storageRef, file);

            // Get the download URL
            const downloadURL = await getDownloadURL(storageRef);

            // Update profile state
            if (type === "photo") {
                setProfile(prev => ({ ...prev, photoURL: downloadURL }));
            } else {
                setProfile(prev => ({ ...prev, coverURL: downloadURL }));
            }

            // Save to Firestore
            await updateDoc(doc(db, "users", user.uid), {
                [type === "photo" ? "photoURL" : "coverURL"]: downloadURL
            });

            alert(`${type === "photo" ? "Profile picture" : "Cover image"} uploaded successfully!`);
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image");
        } finally {
            setUploading(null);
        }
    };

    const triggerFileInput = (type: "photo" | "logo") => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                handleImageUpload(file, type);
            }
        };
        input.click();
    };

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);
        try {
            await updateDoc(doc(db, "users", user.uid), profile);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error saving profile:", error);
            alert("Failed to save profile");
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
                <h1 className="text-3xl font-bold text-black mb-2">Settings</h1>
                <p className="text-zinc-600">Manage your profile and account settings</p>
            </div>

            {/* Profile Information */}
            <Card className="border-gray-200 bg-white">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-purple-600" />
                        <CardTitle className="text-black">Profile Information</CardTitle>
                    </div>
                    <CardDescription>Update your public profile details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Profile Images */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-zinc-700 mb-2 block">Profile Picture</label>
                            <div className="flex items-center gap-4">
                                {profile.photoURL ? (
                                    <img src={profile.photoURL} alt="Profile" className="w-16 h-16 rounded-full object-cover border-2 border-zinc-200" />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white text-xl font-bold">
                                        {profile.displayName?.charAt(0) || "?"}
                                    </div>
                                )}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-zinc-300"
                                    onClick={() => triggerFileInput("photo")}
                                    disabled={uploading === "photo"}
                                >
                                    {uploading === "photo" ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Upload className="mr-2 h-4 w-4" />
                                    )}
                                    {uploading === "photo" ? "Uploading..." : "Upload"}
                                </Button>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-zinc-700 mb-2 block">Cover Image</label>
                            <div className="flex items-center gap-4">
                                {profile.coverURL ? (
                                    <img src={profile.coverURL} alt="Cover" className="w-24 h-16 rounded-lg object-cover border-2 border-zinc-200" />
                                ) : (
                                    <div className="w-24 h-16 rounded-lg bg-zinc-100 border-2 border-dashed border-zinc-300" />
                                )}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-zinc-300"
                                    onClick={() => triggerFileInput("logo")}
                                    disabled={uploading === "logo"}
                                >
                                    {uploading === "logo" ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Upload className="mr-2 h-4 w-4" />
                                    )}
                                    {uploading === "logo" ? "Uploading..." : "Upload"}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-zinc-700 mb-2 block">Username</label>
                            <Input
                                value={profile.username}
                                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                                placeholder="your-username"
                                className="bg-white border-zinc-300"
                            />
                            <p className="text-xs text-zinc-500 mt-1">linkingo.in/{profile.username}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-zinc-700 mb-2 block">Display Name</label>
                            <Input
                                value={profile.displayName}
                                onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                                placeholder="Your Name"
                                className="bg-white border-zinc-300"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-zinc-700 mb-2 block">Bio</label>
                        <Textarea
                            value={profile.bio}
                            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                            placeholder="Tell people about yourself..."
                            className="bg-white border-zinc-300 min-h-24"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="border-gray-200 bg-white">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Share2 className="h-5 w-5 text-purple-600" />
                        <CardTitle className="text-black">Social Links</CardTitle>
                    </div>
                    <CardDescription>Connect your social media accounts</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                        {Object.entries(profile.socialLinks).map(([platform, value]) => (
                            <div key={platform}>
                                <label className="text-sm font-medium text-zinc-700 mb-2 block capitalize">{platform}</label>
                                <Input
                                    value={value}
                                    onChange={(e) => setProfile({
                                        ...profile,
                                        socialLinks: { ...profile.socialLinks, [platform]: e.target.value }
                                    })}
                                    placeholder={`@${platform}`}
                                    className="bg-white border-zinc-300"
                                />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Custom Domain */}
            <Card className="border-gray-200 bg-white">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-purple-600" />
                        <CardTitle className="text-black">Custom Domain</CardTitle>
                    </div>
                    <CardDescription>Use your own domain for your Linkingo page</CardDescription>
                </CardHeader>
                <CardContent>
                    <Input
                        value={profile.customDomain}
                        onChange={(e) => setProfile({ ...profile, customDomain: e.target.value })}
                        placeholder="yourdomain.com"
                        className="bg-white border-zinc-300"
                    />
                    {profile.customDomain && (
                        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h4 className="font-semibold text-black mb-2">DNS Configuration</h4>
                            <p className="text-sm text-zinc-700 mb-3">
                                Add this CNAME record at your domain provider:
                            </p>
                            <div className="bg-white p-3 rounded border border-blue-300 font-mono text-sm">
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="text-zinc-600">Type:</div>
                                    <div className="text-black font-semibold">CNAME</div>
                                    <div className="text-zinc-600">Name:</div>
                                    <div className="text-black font-semibold">@ or www</div>
                                    <div className="text-zinc-600">Value:</div>
                                    <div className="text-black font-semibold">{profile.username}.linkingo.in</div>
                                </div>
                            </div>
                            <p className="text-xs text-zinc-500 mt-2">
                                DNS changes may take up to 24 hours to propagate
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end gap-3">
                <Button variant="outline" className="border-zinc-300">
                    Cancel
                </Button>
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
                        "Save Changes"
                    )}
                </Button>
            </div>
        </div>
    );
}
