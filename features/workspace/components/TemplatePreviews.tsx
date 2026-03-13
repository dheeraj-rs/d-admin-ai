'use client';

import { useRouter } from 'next/navigation';

const SHOWCASES = [
    {
        id: 'show-ecommerce', label: 'E-commerce Store',
        img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=400&auto=format&fit=crop',
        query: 'ecommerce store',
    },
    {
        id: 'show-portfolio', label: 'Creative Portfolio',
        img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
        query: 'creative portfolio',
    },
    {
        id: 'show-saas', label: 'SaaS Landing',
        img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop',
        query: 'saas landing',
    },
    {
        id: 'show-blog', label: 'Modern Blog',
        img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=400&auto=format&fit=crop',
        query: 'blog',
    },
    {
        id: 'show-agency', label: 'Digital Agency',
        img: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=400&auto=format&fit=crop',
        query: 'agency',
    },
    {
        id: 'show-app', label: 'App Showcase',
        img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=400&auto=format&fit=crop',
        query: 'mobile app',
    },
];

export default function TemplatePreviews() {
    const router = useRouter();
    const go = (q: string) => router.push(`/templates?search=${encodeURIComponent(q)}`);

    return (
        <div className="flex flex-col gap-4 lg:gap-6">
            {/* Showcase grid — Responsive columns */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
                {SHOWCASES.map((s) => (
                    <button
                        key={s.id} id={s.id}
                        onClick={() => go(s.query)}
                        className="group relative flex flex-col bg-[#13131E] rounded-2xl overflow-hidden border border-white/5 hover:border-white/15 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:-translate-y-1 h-[140px] sm:h-[160px]"
                    >
                        <div className="absolute inset-0 w-full h-full overflow-hidden">
                            <img 
                                src={s.img} 
                                alt={s.label} 
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-all duration-500" />
                        </div>

                        {/* Overlaid content */}
                        <div className="relative mt-auto p-4 text-center">
                            <p className="text-[13px] font-black text-white tracking-wide group-hover:scale-105 transition-transform duration-300 drop-shadow-md">
                                {s.label}
                            </p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
