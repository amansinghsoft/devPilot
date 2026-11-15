"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Settings } from "lucide-react";

import { DevPilotIcon } from "@/components/icons/devpilot-icon";
import { useCurrentUser, useLogout } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

import {
    dashboardNavGroups,
    isDashboardNavActive,
} from "@/lib/dashboard-nav";
import { Separator } from "@base-ui/react";
import { ModeToggle } from "../ui/mode-toggle";

export function AppShell({
    children,
    title,
    description,
    actions,
    hideHeader = false,
}: {
    children: React.ReactNode;
    title?: string;
    description?: string;
    actions?: React.ReactNode;
    hideHeader?: boolean;
}) {
    const pathname = usePathname();
    const router = useRouter();

    const { data: user } = useCurrentUser();
    const logout = useLogout();

    const displayName =
        user?.displayName || user?.githubUsername || "User";

    const username = user?.githubUsername
        ? `@${user.githubUsername}`
        : "";

    const initials = displayName
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <SidebarProvider>
            <Sidebar
                variant="inset"
                collapsible="icon"
                className="border-r-0"
            >
                {/* Logo and application name */}
                <SidebarHeader className="px-3 pt-4">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                size="lg"
                                render={<Link href="/dashboard" />}
                                tooltip="DevPilot"
                            >
                                <DevPilotIcon className="size-8 rounded-[10px]" />

                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        DevPilot
                                    </span>
                                    
                                    <span className="truncate text-xs text-muted-foreground">
                                        Chat with your code
                                    </span>
                                </div>
                                <ModeToggle />
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>

                {/* Sidebar navigation */}
                <SidebarContent className="px-1 pt-5">
                    {dashboardNavGroups.map((group) => (
                        <SidebarGroup key={group.label}>
                            <SidebarGroupLabel>
                                {group.label}
                            </SidebarGroupLabel>

                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {group.items.map((item) => {
                                        const Icon = item.icon;
                                        const active = isDashboardNavActive(
                                            pathname,
                                            item.href,
                                            item.exact
                                        );

                                        return (
                                            <SidebarMenuItem key={item.href}>
                                                <SidebarMenuButton
                                                    render={
                                                        <Link href={item.href} />
                                                    }
                                                    isActive={active}
                                                    tooltip={item.title}
                                                >
                                                    <Icon className="size-5 shrink-0" />
                                                    <span>{item.title}</span>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        );
                                    })}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    ))}
                </SidebarContent>

                {/* User profile at the bottom */}
                <SidebarFooter className="p-3">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    render={
                                        <SidebarMenuButton
                                            size="lg"
                                            tooltip={displayName}
                                            className="w-full"
                                        />
                                    }
                                >
                                    <Avatar className="size-9 rounded-full">
                                        <AvatarImage
                                            src={user?.avatarUrl ?? ""}
                                            alt={displayName}
                                        />
                                        <AvatarFallback>
                                            {initials || "U"}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">
                                            {displayName}
                                        </span>

                                        <span className="truncate text-xs text-muted-foreground">
                                            {username}
                                        </span>
                                    </div>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent
                                    side="top"
                                    align="start"
                                    className="w-56"
                                >
                                    <DropdownMenuLabel>
                                        My Account
                                    </DropdownMenuLabel>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuGroup>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                router.push("/dashboard/settings")
                                            }
                                        >
                                            <Settings className="mr-2 size-4" />
                                            Settings
                                        </DropdownMenuItem>

                                        <DropdownMenuItem
                                            onClick={() => logout.mutate()}
                                            disabled={logout.isPending}
                                        >
                                            <LogOut className="mr-2 size-4" />
                                            Log out
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>

            <SidebarInset>
                {!hideHeader && (
                    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b">
                        <SidebarTrigger className="-m-1"/>
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
                            <div className="min-w-0">
                                {title &&(
                                    <h1 className="truncate font-heading text-sm font-medium">{title}</h1>
                                )}
                                {description && (
                                    <p className="truncate text-xs text-muted-foreground">
                                        {description}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                {actions}
                                <ModeToggle />
                            </div>
                        </div>
                    </header>
                )}
                <div className="flex flex-1 flex-col">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}

export function BrandMark({ className }: {className?: string}) {
    return (
        <div
            className={cn(
                "flex items-center gap-2.5 font-semibold tracking-tight",
                className
            )}
        >
            <DevPilotIcon  className="size-8 rounded-[10px]"/>
            <span className="font font-heading text-[1.05rem] leading-none">DevPilot</span>
        </div>
    );
}

export function GhostButtonLink({
    href,
    children,
    className,
}: {
    href: string,
    children: React.ReactNode;
    className?: string;
}) {
    return(
    <Button variant="ghost" size="sm" className={className} render={<Link href={href} />}>
        {children}</Button>
    );
}