import { ThumbsUp, ThumbsDown } from 'lucide-react';

export default function RightPanel() {
    return (
        <div className="h-full bg-[#212121] flex flex-col shadow-[-4px_0_24px_rgba(0,0,0,0.2)]">
            {/* Content Area */}
            <div className="flex-1 overflow-hidden flex flex-col relative w-full h-full bg-[#212121]">
                <div className="flex-1 bg-white overflow-y-auto w-full h-full">
                    {/* Mocked Portfolio Preview */}
                    <div className="w-full min-h-full flex flex-col relative text-black">
                        {/* Header / Navbar mock */}
                        <header className="bg-white flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
                            <h1 className="text-xl font-bold text-gray-800 font-sans">Dheeraj</h1>
                            <div className="flex gap-4 text-sm font-medium text-gray-600">
                                <span className="cursor-pointer hover:text-blue-500">About</span>
                                <span className="cursor-pointer hover:text-blue-500">Projects</span>
                                <span className="cursor-pointer hover:text-blue-500">Contact</span>
                            </div>
                        </header>

                        {/* Hero Section */}
                        <div className="bg-blue-600 text-white flex flex-col items-center justify-center py-24 px-6 text-center">
                            <h2 className="text-4xl font-bold mb-4 tracking-tight">Hi, I'm Dheeraj</h2>
                            <p className="text-lg text-blue-100 mb-8 max-w-md">Software Developer | Next.js | React</p>
                            <button className="bg-white text-blue-600 px-6 py-2.5 rounded hover:bg-gray-50 font-semibold shadow-sm transition-all">
                                View My Work
                            </button>
                        </div>

                        {/* About Section */}
                        <div className="p-8 pb-10">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">About Me</h3>
                            <p className="text-gray-600 leading-relaxed max-w-prose">
                                I'm a software developer who enjoys building web applications. I work with technologies
                                like React, Next.js, Node.js, and modern frontend tools. I like creating fast and clean
                                user experiences.
                            </p>
                        </div>

                        {/* Projects mock end */}
                        <div className="px-8 pb-10 flex flex-col items-center">
                            <h3 className="text-xl font-bold text-gray-800">Projects</h3>
                        </div>
                    </div>
                </div>

                {/* Feedback Bottom Bar */}
                <div className="absolute bottom-4 right-4 flex gap-1 bg-[#2f2f2f]/80 backdrop-blur-md border border-[#3e3e3e] rounded-full p-1 shadow-lg z-10">
                    <button className="p-1.5 rounded-full hover:bg-[#3e3e3e] text-gray-400 hover:text-white transition-colors">
                        <ThumbsUp size={14} />
                    </button>
                    <button className="p-1.5 rounded-full hover:bg-[#3e3e3e] text-gray-400 hover:text-white transition-colors">
                        <ThumbsDown size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}
