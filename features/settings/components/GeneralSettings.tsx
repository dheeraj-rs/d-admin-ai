import { ChevronDown } from 'lucide-react';

interface GeneralSettingsProps {
    theme: string;
    setTheme: (val: string) => void;
    language: string;
    setLanguage: (val: string) => void;
}

export default function GeneralSettings({ theme, setTheme, language, setLanguage }: GeneralSettingsProps) {
    return (
        <>
            <h2 className="text-lg font-medium text-gray-100 mb-6">General</h2>
            <div className="flex flex-col">
                <div className="flex items-center justify-between py-4 border-b border-[#2f2f2f]/60">
                    <span className="text-[15px] text-gray-200">Appearance</span>
                    <div className="relative">
                        <select
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            className="appearance-none bg-transparent text-[15px] text-gray-300 hover:text-white transition-colors cursor-pointer outline-none pr-6 font-medium"
                        >
                            <option value="System" className="bg-[#2a2a2a] text-gray-200">
                                System
                            </option>
                            <option value="Light" className="bg-[#2a2a2a] text-gray-200">
                                Light
                            </option>
                            <option value="Dark" className="bg-[#2a2a2a] text-gray-200">
                                Dark
                            </option>
                        </select>
                        <ChevronDown
                            size={16}
                            className="text-gray-500 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between py-4 border-b border-[#2f2f2f]/60">
                    <span className="text-[15px] text-gray-200">Language</span>
                    <div className="relative">
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="appearance-none bg-transparent text-[15px] text-gray-300 hover:text-white transition-colors cursor-pointer outline-none pr-6 font-medium"
                        >
                            <option value="English" className="bg-[#2a2a2a] text-gray-200">
                                English
                            </option>
                            <option value="Hindi" className="bg-[#2a2a2a] text-gray-200">
                                Hindi
                            </option>
                        </select>
                        <ChevronDown
                            size={16}
                            className="text-gray-500 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
