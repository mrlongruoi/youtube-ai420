"use client";

import { useAuth, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { HistoryIcon, ListVideoIcon, ThumbsUpIcon } from "lucide-react";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

const items = [
    {
        title: "History",
        url: "/play/history",
        icon: HistoryIcon,
        auth: true
    },
    {
        title: "Liked videos",
        url: "/playlist/liked",
        icon: ThumbsUpIcon,
        auth: true
    },
    {
        title: "All playlists",
        url: "/playlists",
        icon: ListVideoIcon
    },
];

export const PersonalSection = () => {
    const clerk = useClerk();

    const { isSignedIn } = useAuth();

    return (
        <SidebarGroup>
            <SidebarGroupLabel>You</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => {
                        const Icon = item.icon;
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    tooltip={item.title}
                                    asChild
                                    isActive={false}
                                    onClick={(e) => {
                                        if (!isSignedIn && item.auth) {
                                            e.preventDefault();
                                            return clerk.openSignIn();
                                        }
                                    }}
                                >
                                    <Link
                                        href={item.url}
                                        className="flex items-center gap-4"
                                    >
                                        <Icon className="h-5 w-5" />
                                        <span className="text-sm">{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}