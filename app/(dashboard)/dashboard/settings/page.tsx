"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Upload, User, Globe, Share2, Crown } from "lucide-react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";

export default function SettingsPage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState<"photo" | "logo" | null>(null);
    const [isPremium, setIsPremium] = useState(false);

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
                setIsPremium(data.subscription?.status === 'active');
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
        if (!user) {
            alert("Please log in to upload images");
            return;
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            alert("File size must be less than 5MB");
            return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert("Please upload an image file");
            return;
        }

        setUploading(type);

        try {
            console.log(`Uploading ${type}:`, file.name, file.size, file.type);

            // Create a reference to the file in Firebase Storage
            const storageRef = ref(storage, `users/${user.uid}/${type}-${Date.now()}.${file.name.split('.').pop()}`);

            console.log("Storage ref created:", storageRef.fullPath);

            // Upload the file
            const uploadResult = await uploadBytes(storageRef, file);
            console.log("Upload successful:", uploadResult);

            // Get the download URL
            const downloadURL = await getDownloadURL(storageRef);
            console.log("Download URL:", downloadURL);

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
        } catch (error: any) {
            console.error("Error uploading image:", error);
            console.error("Error code:", error.code);
            console.error("Error message:", error.message);

            let errorMessage = "Failed to upload image. ";
            if (error.code === 'storage/unauthorized') {
                errorMessage += "You don't have permission to upload. Please check Firebase Storage rules.";
            } else if (error.code === 'storage/canceled') {
                errorMessage += "Upload was canceled.";
            } else if (error.code === 'storage/unknown') {
                errorMessage += "An unknown error occurred. Please try again.";
            } else {
                errorMessage += error.message;
            }

            alert(errorMessage);
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

            {/* Custom Domain - PRO ONLY */}
            <Card className="border-gray-200 bg-white">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-purple-600" />
                            <CardTitle className="text-black">Custom Domain</CardTitle>
                            <Crown className="h-4 w-4 text-yellow-500" />
                        </div>
                        {!isPremium && (
                            <Button
                                size="sm"
                                className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white"
                                onClick={() => window.location.href = '/dashboard/upgrade'}
                            >
                                Upgrade to Pro
                            </Button>
                        )}
                    </div>
                    <CardDescription>
                        Use your own domain (e.g., yourdomain.com) instead of linkingo.in/username
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Domain Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Custom Domain
                        </label>
                        <Input
                            value={profile.customDomain}
                            onChange={(e) => setProfile({ ...profile, customDomain: e.target.value })}
                            placeholder="yourdomain.com"
                            className="bg-white border-zinc-300"
                            disabled={!isPremium}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Enter your domain without http:// or https://
                        </p>
                    </div>

                    {/* Premium Gate for Free Users */}
                    {!isPremium && (
                        <div className="p-4 bg-gradient-to-r from-violet-50 to-fuchsia-50 border border-violet-200 rounded-lg">
                            <div className="flex items-start gap-3">
                                <Crown className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">Pro Feature</h4>
                                    <p className="text-sm text-gray-600 mb-3">
                                        Custom domains are available on the Pro plan. Upgrade to use your own domain and remove Linkingo branding.
                                    </p>
                                    <Button
                                        size="sm"
                                        className="bg-violet-600 hover:bg-violet-700 text-white"
                                        onClick={() => window.location.href = '/dashboard/upgrade'}
                                    >
                                        Upgrade for ₹79/month
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* DNS Setup Guide - Only show for Pro users */}
                    {isPremium && (
                        <div className="space-y-4">
                            {/* Step-by-Step Guide */}
                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <h4 className="font-semibold text-black mb-3 flex items-center gap-2">
                                    <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                                    Buy a Domain (if you don't have one)
                                </h4>
                                <p className="text-sm text-gray-700 mb-2">
                                    We recommend these domain providers:
                                </p>
                                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                                    <li>• <strong>Namecheap.com</strong> - ₹500/year</li>
                                    <li>• <strong>GoDaddy.com</strong> - ₹699/year</li>
                                    <li>• <strong>Hostinger.com</strong> - ₹399/year</li>
                                </ul>
                            </div>

                            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                <h4 className="font-semibold text-black mb-3 flex items-center gap-2">
                                    <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                                    Configure DNS Settings
                                </h4>
                                <p className="text-sm text-gray-700 mb-3">
                                    In your domain provider's dashboard, add this CNAME record:
                                </p>
                                <div className="bg-white p-3 rounded border border-green-300 font-mono text-sm space-y-2">
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="text-gray-600">Type:</div>
                                        <div className="col-span-2 text-black font-semibold">CNAME</div>
                                        <div className="text-gray-600">Name:</div>
                                        <div className="col-span-2 text-black font-semibold">www (or @)</div>
                                        <div className="text-gray-600">Value:</div>
                                        <div className="col-span-2 text-black font-semibold">cname.vercel-dns.com</div>
                                        <div className="text-gray-600">TTL:</div>
                                        <div className="col-span-2 text-black font-semibold">3600 (or Auto)</div>
                                    </div>
                                </div>
                                <details className="mt-3">
                                    <summary className="text-sm font-medium text-blue-600 cursor-pointer hover:text-blue-700">
                                        How to find DNS settings in different providers
                                    </summary>
                                    <div className="mt-2 space-y-2 text-sm text-gray-600">
                                        <p><strong>Namecheap:</strong> Dashboard → Domain List → Manage → Advanced DNS</p>
                                        <p><strong>GoDaddy:</strong> My Products → Domains → DNS → Manage Zones</p>
                                        <p><strong>Hostinger:</strong> Domains → Manage → DNS / Name Servers</p>
                                    </div>
                                </details>
                            </div>

                            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                                <h4 className="font-semibold text-black mb-3 flex items-center gap-2">
                                    <span className="bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
                                    Wait for DNS Propagation
                                </h4>
                                <p className="text-sm text-gray-700">
                                    DNS changes typically take 5-30 minutes, but can take up to 24 hours in some cases.
                                    You can check the status at <a href="https://dnschecker.org" target="_blank" className="text-blue-600 hover:underline">dnschecker.org</a>
                                </p>
                            </div>

                            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                                <h4 className="font-semibold text-black mb-3 flex items-center gap-2">
                                    <span className="bg-orange-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">4</span>
                                    Save Your Domain
                                </h4>
                                <p className="text-sm text-gray-700">
                                    Enter your domain above and click "Save Changes" at the bottom of this page.
                                    Your custom domain will be active once DNS propagation is complete.
                                </p>
                            </div>

                            {/* Help Text */}
                            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                <p className="text-xs text-gray-600">
                                    <strong>Need help?</strong> Contact our support team or check our
                                    <a href="/help/custom-domain" className="text-blue-600 hover:underline ml-1">detailed guide</a>.
                                </p>
                            </div>
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
