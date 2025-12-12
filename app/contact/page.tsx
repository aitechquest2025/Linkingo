"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageSquare, Send, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "6837ae33-3b82-4b1a-af72-4012c991e42e", // Get free key from web3forms.com
                    from_name: "Linkingo Contact Form",
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    to: "hellolinkingo@gmail.com",
                    redirect: "https://linkingo.in/contact?success=true"
                }),
            });

            const result = await response.json();
            if (result.success) {
                setSent(true);
                setFormData({ name: "", email: "", subject: "", message: "" });
                setTimeout(() => setSent(false), 5000);
            } else {
                throw new Error("Failed to send");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Failed to send message. Please try again.");
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white">
            {/* Header */}
            <header className="border-b border-zinc-200 bg-white">
                <div className="container mx-auto px-4 py-4">
                    <Link href="/" className="text-2xl font-bold text-violet-600">
                        Linkingo
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12 md:py-20">
                <div className="max-w-6xl mx-auto">
                    {/* Page Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                            Get in Touch
                        </h1>
                        <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Contact Form */}
                        <Card className="border-zinc-200 bg-white shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-black">
                                    <MessageSquare className="h-5 w-5 text-violet-600" />
                                    Send us a Message
                                </CardTitle>
                                <CardDescription>
                                    Fill out the form below and we'll get back to you within 24 hours
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-black mb-2 block">
                                            Name
                                        </label>
                                        <Input
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Your name"
                                            className="bg-white border-zinc-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-black mb-2 block">
                                            Email
                                        </label>
                                        <Input
                                            required
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="your@email.com"
                                            className="bg-white border-zinc-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-black mb-2 block">
                                            Subject
                                        </label>
                                        <Input
                                            required
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            placeholder="How can we help?"
                                            className="bg-white border-zinc-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-black mb-2 block">
                                            Message
                                        </label>
                                        <Textarea
                                            required
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            placeholder="Tell us more about your inquiry..."
                                            rows={5}
                                            className="bg-white border-zinc-300 resize-none"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={sending}
                                        className="w-full bg-violet-600 hover:bg-violet-700 text-white"
                                    >
                                        {sending ? (
                                            "Sending..."
                                        ) : sent ? (
                                            "Message Sent!"
                                        ) : (
                                            <>
                                                <Send className="mr-2 h-4 w-4" />
                                                Send Message
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <div className="space-y-6">
                            {/* Email Support */}
                            <Card className="border-zinc-200 bg-white shadow-lg">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-black">
                                        <Mail className="h-5 w-5 text-violet-600" />
                                        Email Support
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-zinc-600 mb-3">
                                        For general inquiries and support
                                    </p>
                                    <a
                                        href="mailto:hellolinkingo@gmail.com"
                                        className="text-violet-600 hover:text-violet-700 font-semibold text-lg"
                                    >
                                        hellolinkingo@gmail.com
                                    </a>
                                    <p className="text-sm text-zinc-500 mt-3">
                                        We typically respond within 24 hours
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Location */}
                            <Card className="border-zinc-200 bg-white shadow-lg">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-black">
                                        <MapPin className="h-5 w-5 text-violet-600" />
                                        Location
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-zinc-600">
                                        Linkingo<br />
                                        India 🇮🇳
                                    </p>
                                    <p className="text-sm text-zinc-500 mt-3">
                                        Serving creators worldwide
                                    </p>
                                </CardContent>
                            </Card>

                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-zinc-200 bg-white mt-20">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-zinc-600 text-sm">
                            © 2025 Linkingo. Built for India with ❤️
                        </p>
                        <div className="flex gap-6 text-sm">
                            <Link href="/privacy" className="text-zinc-600 hover:text-violet-600">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-zinc-600 hover:text-violet-600">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
