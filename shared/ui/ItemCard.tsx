import React, { ReactNode } from 'react';
import { LucideIcon, ExternalLink } from 'lucide-react';

interface ItemCardProps {
    title: string;
    description: string;
    image?: string;
    icon?: LucideIcon;
    badge?: string;
    metaInfo?: string;
    primaryActionText?: string;
    onPrimaryAction?: () => void;
    secondaryAction?: ReactNode;
}

export default function ItemCard({
    title,
    description,
    image,
    icon: Icon,
    badge,
    metaInfo,
    primaryActionText = "Use Item",
    onPrimaryAction,
    secondaryAction,
}: ItemCardProps) {
    return (
        <div className="flex flex-col group cursor-pointer animate-in fade-in zoom-in-95 duration-500">
            <div className="aspect-[16/10] rounded-2xl bg-[#1a1a1a] border border-[#2f2f2f] overflow-hidden relative mb-4 group-hover:border-blue-500/30 transition-all duration-300">
                {image ? (
                    <img 
                        src={image} 
                        alt={title} 
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#242424] group-hover:bg-[#2a2a2a] transition-colors">
                        {Icon && <Icon size={48} className="text-gray-700 group-hover:text-blue-500/20 transition-all duration-500" />}
                    </div>
                )}
                
                {/* Overlay with Action */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            onPrimaryAction?.();
                        }}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-2xl shadow-blue-600/30 translate-y-4 group-hover:translate-y-0 transition-all duration-500 w-full justify-center"
                    >
                        {primaryActionText}
                        <ExternalLink size={14} />
                    </button>
                </div>

                {/* Badge */}
                {badge && (
                    <div className="absolute top-4 left-4">
                        <span className="bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1.5 rounded-lg shadow-xl">
                            {badge}
                        </span>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-1.5 px-0.5">
                <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                        {title}
                    </h3>
                    {secondaryAction && (
                        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {secondaryAction}
                        </div>
                    )}
                </div>
                <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                    {description}
                </p>
                {metaInfo && (
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5">
                        <span className="text-[11px] text-gray-500 font-medium tracking-tight">
                            {metaInfo}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
