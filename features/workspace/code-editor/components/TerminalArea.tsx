'use client';

import { TerminalSquare } from 'lucide-react';

export const TerminalArea = () => {
    return (
        <div className="h-48 bg-[#0B0B0D] border-t border-[#2A2A2C] flex flex-col font-mono text-[12px]">
            <div className="h-8 flex items-center px-4 bg-[#1A1A1C] border-b border-[#2A2A2C] text-gray-400">
                <TerminalSquare size={14} className="mr-2" />
                <span>TERMINAL</span>
            </div>
            <div className="flex-1 p-4 overflow-y-auto text-green-500/80">
                <div className="mb-1">$ npm install</div>
                <div className="mb-1 text-gray-400">added 42 packages in 2s</div>
                <div className="mb-1">$ npm run dev</div>
                <div className="text-cyan-400">ready - started server on 0.0.0.0:3000, url: http://localhost:3000</div>
            </div>
        </div>
    );
};
