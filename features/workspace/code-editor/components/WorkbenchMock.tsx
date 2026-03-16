'use client';

import { useState } from 'react';
import type { ActiveTab } from '@/features/workspace';
import { CodeEditorMock } from './CodeEditorMock';
import { FileSidebar } from './FileSidebar';
import RightPanel from './RightPanel';
import { TerminalArea } from './TerminalArea';
import { WorkbenchHeader } from './WorkbenchHeader';

import { useWorkspace } from '@/features/workspace';

export default function WorkbenchMock() {
    const { state } = useWorkspace();
    const { activeTab, showTerminal } = state;
    const [showFiles, setShowFiles] = useState(false);

    return (
        <div className="w-full h-full bg-[#0B0B0D] flex flex-col text-gray-300 font-sans relative overflow-hidden p-0.5 sm:p-2.5 lg:p-3.5 max-w-full">
            <div className="flex-1 flex flex-col relative h-full min-h-0 bg-[#151517] rounded-lg sm:rounded-2xl border border-[#2A2A2C] overflow-hidden shadow-2xl max-w-full">
                <WorkbenchHeader
                    showFiles={showFiles}
                    setShowFiles={setShowFiles}
                />

                <div className="flex-1 flex flex-row relative min-h-0">
                    {activeTab === 'code' && (
                        <FileSidebar
                            showFiles={showFiles}
                            onFileClick={() => setShowFiles(false)}
                        />
                    )}

                    <div className="flex-1 h-full flex flex-col relative min-w-0">
                        <div className="flex-1 relative flex flex-col bg-[#0B0B0D] overflow-hidden">
                            {activeTab === 'code' ? (
                                <CodeEditorMock />
                            ) : (
                                <div className="flex-1 bg-white overflow-auto flex flex-col relative">
                                    <RightPanel />
                                </div>
                            )}
                        </div>

                        {showTerminal && <TerminalArea />}
                    </div>
                </div>
            </div>
        </div>
    );
}
