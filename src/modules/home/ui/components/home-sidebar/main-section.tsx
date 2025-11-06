"use client";

import { useAuth, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { HomeIcon, PlaySquareIcon, FlameIcon } from "lucide-react";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

const items = [
    {
        title: "Home",
        url: "/",
        icon: HomeIcon,
    },
    {
        title: "Subscriptions",
        url: "/feed/subscriptions",
        icon: PlaySquareIcon,
        auth: true
    },
    {
        title: "Trending",
        url: "/feed/trending",
        icon: FlameIcon
    },
];

export const MainSection = () => {
    const clerk = useClerk();

    const { isSignedIn } = useAuth();

    return (
        <SidebarGroup>
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