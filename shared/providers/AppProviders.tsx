"use client";

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from './ThemeProvider';
import { useBuilderStore } from '@/features/builder/store/builder-store';

interface AppProvidersProps {
  children: ReactNode;
}

function HydrationGuard({ children }: { children: ReactNode }) {
  const isHydrated = useBuilderStore((state) => state.isHydrated);
  
  if (!isHydrated) {
    return (
      <div className="d-splash-root">
        {/* Ambient glow orbs */}
        <div className="d-splash-orb d-splash-orb-1" />
        <div className="d-splash-orb d-splash-orb-2" />
        <div className="d-splash-orb d-splash-orb-3" />

        {/* Subtle dot grid */}
        <div className="d-splash-grid" />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`d-splash-particle d-splash-particle-${i + 1}`}
          />
        ))}

        {/* Main content */}
        <div className="d-splash-content">
          {/* Logo with rings */}
          <div className="d-splash-logo-wrap">
            <div className="d-splash-ring d-splash-ring-outer" />
            <div className="d-splash-ring d-splash-ring-mid" />
            <div className="d-splash-logo-box">
              <img
                src="/icons/icon-512x512.png"
                alt="D-Admin-AI"
                className="d-splash-logo-img"
              />
            </div>
          </div>

          {/* App name */}
          <div className="d-splash-text">
            <h1 className="d-splash-title italic uppercase tracking-tighter">D-Admin-AI</h1>
            <p className="d-splash-subtitle">Expert Website Builder</p>
          </div>

          {/* Progress bar */}
          <div className="d-splash-bar-track">
            <div className="d-splash-bar-fill" />
          </div>

          {/* Dots indicator */}
          <div className="d-splash-dots">
            <span className="d-splash-dot d-splash-dot-1" />
            <span className="d-splash-dot d-splash-dot-2" />
            <span className="d-splash-dot d-splash-dot-3" />
          </div>
        </div>

        <style>{`
          /* ── Root ── */
          .d-splash-root {
            width: 100dvw;
            height: 100dvh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: #050505;
            position: relative;
            overflow: hidden;
            font-family: 'Inter', sans-serif;
          }

          /* ── Orbs ── */
          .d-splash-orb {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
          }
          .d-splash-orb-1 {
            width: 520px; height: 520px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, transparent 70%);
            top: -160px; left: -160px;
            animation: dSplashOrb1 9s ease-in-out infinite;
          }
          .d-splash-orb-2 {
            width: 420px; height: 420px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.14) 0%, transparent 70%);
            bottom: -120px; right: -120px;
            animation: dSplashOrb2 11s ease-in-out infinite;
          }
          .d-splash-orb-3 {
            width: 280px; height: 280px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
            top: 55%; left: 65%;
            animation: dSplashOrb3 13s ease-in-out infinite;
          }

          /* ── Grid ── */
          .d-splash-grid {
            position: absolute;
            inset: 0;
            background-image:
              linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px);
            background-size: 44px 44px;
            pointer-events: none;
          }

          /* ── Particles ── */
          .d-splash-particle {
            position: absolute;
            width: 4px; height: 4px;
            border-radius: 50%;
            background: rgba(99, 102, 241, 0.5);
            pointer-events: none;
          }
          .d-splash-particle-1  { top: 15%; left: 10%; animation: dSplashFloat 6s 0.0s ease-in-out infinite; }
          .d-splash-particle-2  { top: 25%; left: 85%; animation: dSplashFloat 7s 0.5s ease-in-out infinite; }
          .d-splash-particle-3  { top: 70%; left: 20%; animation: dSplashFloat 5s 1.0s ease-in-out infinite; }
          .d-splash-particle-4  { top: 80%; left: 75%; animation: dSplashFloat 8s 0.3s ease-in-out infinite; }
          .d-splash-particle-5  { top: 40%; left: 5%;  animation: dSplashFloat 6s 1.5s ease-in-out infinite; }
          .d-splash-particle-6  { top: 55%; left: 92%; animation: dSplashFloat 7s 0.8s ease-in-out infinite; }
          .d-splash-particle-7  { top: 10%; left: 55%; animation: dSplashFloat 9s 0.2s ease-in-out infinite; }
          .d-splash-particle-8  { top: 88%; left: 45%; animation: dSplashFloat 5s 1.2s ease-in-out infinite; }
          .d-splash-particle-9  { top: 32%; left: 70%; animation: dSplashFloat 6s 0.7s ease-in-out infinite; width: 6px; height: 6px; }
          .d-splash-particle-10 { top: 65%; left: 38%; animation: dSplashFloat 8s 1.8s ease-in-out infinite; width: 3px; height: 3px; }
          .d-splash-particle-11 { top: 20%; left: 30%; animation: dSplashFloat 7s 0.4s ease-in-out infinite; width: 5px; height: 5px; }
          .d-splash-particle-12 { top: 75%; left: 60%; animation: dSplashFloat 6s 1.1s ease-in-out infinite; width: 3px; height: 3px; }

          /* ── Content ── */
          .d-splash-content {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 28px;
            animation: dSplashFadeIn 0.6s ease-out both;
          }

          /* ── Logo ── */
          .d-splash-logo-wrap {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 120px;
            height: 120px;
          }
          .d-splash-ring {
            position: absolute;
            border-radius: 26px;
            border: 1.5px solid rgba(99, 102, 241, 0.35);
          }
          .d-splash-ring-outer {
            width: 116px; height: 116px;
            animation: dSplashRing 2.4s ease-in-out infinite;
          }
          .d-splash-ring-mid {
            width: 96px; height: 96px;
            border-color: rgba(99, 102, 241, 0.2);
            animation: dSplashRing 2.4s 0.5s ease-in-out infinite;
          }
          .d-splash-logo-box {
            width: 76px; height: 76px;
            border-radius: 20px;
            background: #131417;
            border: 1.5px solid rgba(99, 102, 241, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow:
              0 0 0 1px rgba(99, 102, 241, 0.15),
              0 0 32px rgba(99, 102, 241, 0.3),
              0 8px 32px rgba(0,0,0,0.3),
              inset 0 1px 0 rgba(255,255,255,0.08);
            animation: dSplashLogoFloat 3.2s ease-in-out infinite;
            backdrop-filter: blur(12px);
          }
          .d-splash-logo-img {
            width: 50px; height: 50px;
            object-fit: contain;
            border-radius: 10px;
          }

          /* ── Text ── */
          .d-splash-text { text-align: center; }
          .d-splash-title {
            margin: 0;
            font-size: 26px;
            font-weight: 700;
            letter-spacing: -0.5px;
            color: #e3e3e3;
            background: linear-gradient(
              135deg,
              #e3e3e3 0%,
              #6366f1 50%,
              #e3e3e3 100%
            );
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: dSplashTextShimmer 3s linear infinite;
          }
          .d-splash-subtitle {
            margin: 6px 0 0;
            font-size: 12px;
            font-weight: 400;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: #b1b1b1;
            opacity: 0.6;
          }

          /* ── Progress bar ── */
          .d-splash-bar-track {
            width: 140px; height: 2px;
            border-radius: 2px;
            background: #2B2B2B;
            overflow: hidden;
          }
          .d-splash-bar-fill {
            height: 100%;
            border-radius: 2px;
            background: linear-gradient(
              90deg,
              transparent,
              #6366f1,
              #fff,
              #6366f1,
              transparent
            );
            background-size: 300% 100%;
            animation: dSplashBarSweep 1.8s ease-in-out infinite;
          }

          /* ── Dot indicators ── */
          .d-splash-dots {
            display: flex;
            gap: 6px;
            align-items: center;
          }
          .d-splash-dot {
            display: block;
            width: 5px; height: 5px;
            border-radius: 50%;
            background: #6366f1;
            opacity: 0.3;
          }
          .d-splash-dot-1 { animation: dSplashDotPulse 1.4s 0.0s ease-in-out infinite; }
          .d-splash-dot-2 { animation: dSplashDotPulse 1.4s 0.2s ease-in-out infinite; }
          .d-splash-dot-3 { animation: dSplashDotPulse 1.4s 0.4s ease-in-out infinite; }

          /* ── Keyframes ── */
          @keyframes dSplashFadeIn {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes dSplashOrb1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50%       { transform: translate(40px, 30px) scale(1.12); }
          }
          @keyframes dSplashOrb2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50%       { transform: translate(-30px, -40px) scale(1.08); }
          }
          @keyframes dSplashOrb3 {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            50%       { transform: translate(-50%, -50%) scale(1.2); }
          }
          @keyframes dSplashFloat {
            0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
            50%       { transform: translateY(-18px) scale(1.3); opacity: 1; }
          }
          @keyframes dSplashRing {
            0%, 100% { transform: scale(0.92); opacity: 0.7; }
            50%       { transform: scale(1.04); opacity: 0.25; }
          }
          @keyframes dSplashLogoFloat {
            0%, 100% { transform: translateY(0px); }
            50%       { transform: translateY(-7px); }
          }
          @keyframes dSplashTextShimmer {
            0%   { background-position: 200% center; }
            100% { background-position: -200% center; }
          }
          @keyframes dSplashBarSweep {
            0%   { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
          @keyframes dSplashDotPulse {
            0%, 100% { opacity: 0.25; transform: scale(1); }
            50%       { opacity: 1;    transform: scale(1.4); }
          }
        `}</style>
      </div>
    );
  }

  return <>{children}</>;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <SessionProvider>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <HydrationGuard>
                {children}
            </HydrationGuard>
        </ThemeProvider>
    </SessionProvider>
  );
}
