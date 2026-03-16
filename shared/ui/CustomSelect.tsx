'use client';

import { Check, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Option {
    label: string;
    value: string;
}

interface CustomSelectProps {
    value?: string;
    onChange: (value: string) => void;
    options: Option[];
    disabled?: boolean;
    className?: string;
}

export default function CustomSelect({
    value,
    onChange,
    options,
    disabled = false,
    className = '',
}: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value) || options[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <div className={`relative ${className}`} ref={containerRef}>
            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`flex items-center justify-between gap-2 px-4 py-1.5 min-w-[120px] rounded-xl border appearance-none transition-all duration-200 outline-none
                    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-indigo-500/30 active:scale-[0.98]'}
                    bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700
                    text-[13px] font-bold text-slate-700 dark:text-slate-200 shadow-sm`}
            >
                <span>{selectedOption?.label}</span>
                <ChevronDown
                    size={14}
                    className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    strokeWidth={3}
                />
            </button>

            {isOpen && (
                <div className="absolute top-full mt-2 right-0 min-w-full w-max z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                    <div className="p-1 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 shadow-2xl">
                        <div className="flex flex-col gap-0.5">
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={`flex items-center justify-between gap-8 px-3 py-2 rounded-xl transition-all duration-200 text-left
                                        ${value === option.value ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'}`}
                                >
                                    <span className="text-[13px] font-bold whitespace-nowrap">
                                        {option.label}
                                    </span>
                                    {value === option.value && (
                                        <Check size={14} className="shrink-0" strokeWidth={3} />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
