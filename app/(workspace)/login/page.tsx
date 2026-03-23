"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthModal from "@/features/auth/components/AuthModal";

function LoginContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isModalOpen, setIsModalOpen] = useState(true);
    const error = searchParams.get("error");

    useEffect(() => {
        if (!isModalOpen) {
            router.push("/");
        }
    }, [isModalOpen, router]);

    return (
        <div className="min-h-screen bg-[var(--bg-main)] flex flex-col items-center justify-center p-4">
            {error && (
                <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm font-bold text-center animate-in fade-in slide-in-from-top-2 duration-300">
                    <p>Authentication Error: {error}</p>
                    <p className="mt-1 opacity-70 font-medium italic">Please verify your GitHub/Google Client Secrets in Vercel Dashboard.</p>
                </div>
            )}
            
            <AuthModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
            
            <div className="text-center mt-8">
                <h1 className="text-2xl font-black text-[var(--text-main)] italic tracking-tight uppercase mb-2">d-admin-ai</h1>
                <p className="text-[var(--text-muted)] text-sm font-medium">Redirecting to home page...</p>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
            </div>
        }>
            <LoginContent />
        </Suspense>
    );
}
