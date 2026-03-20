"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { Icon } from '@iconify/react';
import { X } from 'lucide-react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const { status } = useSession();

    useEffect(() => {
        if (status === "authenticated" && isOpen) {
            onClose();
        }
    }, [status, isOpen, onClose]);

    const handleLogin = async (provider: 'google' | 'github') => {
        try {
            const result = await signIn(provider, {
                redirect: false,
                callbackUrl: window.location.pathname,
            });
            
            if (result?.ok) {
                onClose();
                // Refresh session
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else if (result?.error) {
                console.error('Sign in error:', result.error);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    if (!isOpen) return null;
    if (status === "loading" || status === "authenticated") return null;

    return (
        <div
            className="fixed inset-0 bg-slate-950/60 z-[100] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => onClose()}
        >
            <div
                className="bg-slate-900/90 dark:bg-[#0B0B0D]/90 w-full max-w-[420px] max-h-[90dvh] rounded-[28px] shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col animate-in zoom-in-95 duration-200 border border-white/10 dark:border-indigo-500/20 backdrop-blur-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-end p-4 pb-0 shrink-0">
                    <button
                        onClick={() => onClose()}
                        className="text-slate-400 hover:text-white transition-all rounded-lg p-2 hover:bg-white/5 border border-transparent hover:border-white/10 active:scale-95"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="px-8 pb-10 flex flex-col items-center overflow-y-auto custom-scrollbar flex-1">
                    <div className="rounded-full bg-indigo-500/10 p-4 mb-6 ring-1 ring-indigo-500/20">
                         <Icon icon="ph:user-circle-plus-duotone" className="text-4xl text-indigo-400" />
                    </div>
                    
                    <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tightest">Welcome Prompt</h2>
                    <p className="text-[14px] text-slate-400 mb-8 text-center font-medium">
                        Choose an account to continue to d-admin-ai.
                    </p>

                    <div className="w-full flex flex-col gap-3">
                        <button
                            onClick={() => handleLogin("github")}
                            className="w-full h-12 min-h-[48px] flex items-center justify-center gap-3 bg-[#24292F] text-white hover:bg-[#24292F]/90 rounded-xl font-bold transition-all transform active:scale-95 shadow-lg shadow-black/20"
                        >
                            <Icon icon="ph:github-logo-fill" className="text-xl" />
                            Continue with GitHub
                        </button>

                        <button
                            onClick={() => handleLogin("google")}
                            className="w-full h-12 min-h-[48px] flex items-center justify-center gap-3 bg-white text-black hover:bg-gray-100 rounded-xl font-bold transition-all transform active:scale-95 shadow-lg shadow-black/10"
                        >
                            <Icon icon="logos:google-icon" className="text-lg" />
                            Continue with Google
                        </button>

                        <div className="mt-6 pt-6 border-t border-white/5 w-full">
                            <p className="text-[11px] text-slate-500 text-center font-medium leading-relaxed">
                                By continuing, you agree to our Terms of Service and Privacy Policy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
