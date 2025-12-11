import { getUserByUsername, getUserLinks } from "@/lib/server/user";
import ProfileClient from "@/components/profile/profile-client";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Props {
    params: Promise<{ username: string }>;
}

export async function generateMetadata(
    props: Props
): Promise<Metadata> {
    const params = await props.params;
    const profile = await getUserByUsername(params.username);

    if (!profile) {
        return {
            title: "User Not Found - Linkingo",
        };
    }

    return {
        title: `${profile.displayName || profile.username} | Linkingo`,
        description: profile.bio || `Check out ${profile.username}'s links on Linkingo`,
        openGraph: {
            images: [profile.photoURL || "/icon-512.png"],
        },
    };
}

export default async function ProfilePage(props: Props) {
    const params = await props.params;

    // 1. Fetch User by Username
    const profile = await getUserByUsername(params.username);

    // 2. Handle 404
    if (!profile) {
        notFound();
    }

    // 3. Fetch Links for this User
    const links = await getUserLinks(profile.uid);

    // 4. Render Client Component
    return <ProfileClient profile={profile} links={links} />;
}
