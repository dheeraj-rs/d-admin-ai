'use client';

export const CodeEditorMock = () => {
    return (
        <div className="flex-1 p-6 overflow-y-auto font-mono text-[14px] leading-relaxed text-gray-400">
            <div className="flex gap-4">
                <span className="text-gray-600 select-none w-5 text-right">1</span>
                <div className="flex gap-2">
                    <span className="text-[#C678DD]">import</span>
                    <span className="text-gray-200">React</span>
                    <span className="text-[#C678DD]">from</span>
                    <span className="text-[#98C379]">'react'</span>
                    <span className="text-gray-200">;</span>
                </div>
            </div>
            <div className="flex gap-4">
                <span className="text-gray-600 select-none w-5 text-right">2</span>
                <div className="flex gap-2">
                    <span className="text-[#61AFEF]">export default function</span>
                    <span className="text-[#61AFEF] ml-1">App</span>
                    <span className="text-gray-200">() {'{'}</span>
                </div>
            </div>
            <div className="flex gap-4">
                <span className="text-gray-600 select-none w-5 text-right">3</span>
                <div className="flex gap-2 pl-4">
                    <span className="text-[#C678DD]">return (</span>
                </div>
            </div>
            <div className="flex gap-4">
                <span className="text-gray-600 select-none w-5 text-right">4</span>
                <div className="flex gap-2 pl-8">
                    <span className="text-gray-500">&lt;div className="min-h-screen ..."&gt;</span>
                </div>
            </div>
            <div className="flex gap-4">
                <span className="text-gray-600 select-none w-5 text-right">5</span>
                <div className="flex gap-2 pl-8">
                    <span className="text-gray-500">&lt;/div&gt;</span>
                </div>
            </div>
            <div className="flex gap-4">
                <span className="text-gray-600 select-none w-5 text-right">6</span>
                <div className="flex gap-2 pl-4">
                    <span className="text-[#C678DD]">);</span>
                </div>
            </div>
            <div className="flex gap-4">
                <span className="text-gray-600 select-none w-5 text-right">7</span>
                <div className="flex gap-2">
                    <span className="text-gray-200">{'}'}</span>
                </div>
            </div>
        </div>
    );
};
