import { Search, LucideIcon, ArrowLeft, PanelLeft } from 'lucide-react';

interface PageHeaderProps {
    title: string;
    highlight?: string;
    description: string;
    icon?: LucideIcon;
    searchValue: string;
    onSearchChange: (value: string) => void;
    searchPlaceholder?: string;
    onBack?: () => void;
    onToggleSidebar?: () => void;
}

export default function PageHeader({
    title,
    highlight,
    description,
    icon: Icon,
    searchValue,
    onSearchChange,
    searchPlaceholder = "Search...",
    onBack,
    onToggleSidebar,
}: PageHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 w-full animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex flex-col gap-4">
                {onBack && (
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={onBack}
                            className="flex items-center gap-2 text-gray-400 hover:text-white transition-all w-fit group bg-[#2a2a2a] border border-[#3e3e3e] px-3 py-1.5 rounded-lg active:scale-95 shadow-sm"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="text-xs font-semibold">Back to AI Builder</span>
                        </button>
                    </div>
                )}
                <div className="flex items-center gap-3">
                    {onToggleSidebar && (
                        <button 
                            onClick={onToggleSidebar}
                            className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg transition-colors shrink-0 focus:outline-none focus:ring-0 active:bg-transparent -ml-2"
                        >
                            <PanelLeft size={24} />
                        </button>
                    )}
                    {Icon && (
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                            <Icon size={24} />
                        </div>
                    )}
                    <h1 className="text-3xl md:text-5xl 2xl:text-6xl 3xl:text-8xl font-bold text-white tracking-tight leading-tight">
                        {title} {highlight && <span className="text-blue-400 underline decoration-blue-500/30 underline-offset-8">{highlight}</span>}
                    </h1>
                </div>
                <p className="text-gray-400 text-lg 2xl:text-2xl 3xl:text-3xl max-w-2xl 2xl:max-w-4xl">
                    {description}
                </p>
            </div>

            <div className="relative group min-w-[280px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors 2xl:w-6 2xl:h-6 2xl:left-4" size={18} />
                <input 
                    type="text" 
                    placeholder={searchPlaceholder}
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="bg-[#2a2a2a] border border-[#3e3e3e] rounded-xl pl-10 2xl:pl-14 pr-4 py-3 2xl:py-5 3xl:py-6 w-full text-sm 2xl:text-lg 3xl:text-xl focus:outline-none focus:border-blue-500/50 transition-all text-gray-200 placeholder:text-gray-500 shadow-sm"
                />
            </div>
        </div>
    );
}
