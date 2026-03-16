'use client';

import { useState, useRef, useEffect } from 'react';
import { Plus, Image as ImageIcon, FileText, Sparkles } from 'lucide-react';

export default function PlusActionMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-1.5 rounded-full transition-all duration-200 flex items-center justify-center shrink-0 ${isOpen ? 'bg-[#3e3e3e] text-white' : 'text-gray-400 hover:text-gray-200 hover:bg-[#333333]'}`}
                title="Add attachment"
            >
                <Plus
                    size={26}
                    className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}
                    strokeWidth={2}
                />
            </button>

            {isOpen && (
                <div className="absolute bottom-[calc(100%+12px)] left-0 bg-[#2d2d2d] rounded-[16px] p-1.5 shadow-2xl border border-[#3e3e3e] font-sans z-50 w-[200px] animate-in fade-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95">
                    <div className="flex flex-col gap-0.5">
                        <button
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#3e3e3e] transition-colors w-full text-left text-gray-200 cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        >
                            <ImageIcon size={18} className="text-gray-400" strokeWidth={1.5} />
                            <div className="flex flex-col">
                                <span className="text-[14px] font-medium leading-none">Add image</span>
                            </div>
                        </button>
                        <button
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#3e3e3e] transition-colors w-full text-left text-gray-200 cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        >
                            <FileText size={18} className="text-gray-400" strokeWidth={1.5} />
                            <div className="flex flex-col">
                                <span className="text-[14px] font-medium leading-none">Add file</span>
                            </div>
                        </button>
                        <div className="h-px w-full bg-[#3e3e3e] my-1" />
                        <button
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#3e3e3e] transition-colors w-full text-left text-gray-200 cursor-pointer group"
                            onClick={() => setIsOpen(false)}
                        >
                            <Sparkles
                                size={18}
                                className="text-emerald-400 group-hover:text-emerald-300 transition-colors"
                                strokeWidth={1.5}
                            />
                            <div className="flex flex-col">
                                <span className="text-[14px] font-medium leading-none text-emerald-100 group-hover:text-white transition-colors">
                                    Enhance chat
                                </span>
                            </div>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
