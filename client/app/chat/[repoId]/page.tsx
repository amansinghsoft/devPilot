
"use client";

import { Suspense, use } from "react";

import ChatView from "@/components/chat/chat-view";
import { RequireAuth } from "@/components/providers/require-auth";

type ChatPageProps = {
    params: Promise<{ repoId: string }>;
};

function ChatPageContent({ params }: ChatPageProps) {
    const { repoId } = use(params);

    return (
        <RequireAuth>
            <ChatView repoId={repoId} />
        </RequireAuth>
    );
}

export default function ChatPage({ params }: ChatPageProps) {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
                    Loading chat...
                </div>
            }
        >
            <ChatPageContent params={params} />
        </Suspense>
    );
}
