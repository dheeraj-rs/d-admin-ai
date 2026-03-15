import { ThumbsUp, ThumbsDown } from 'lucide-react';

export default function RightPanel() {
    return (
        <div className="flex-1 overflow-hidden flex flex-col relative w-full h-full bg-white">
            <div className="flex-1 overflow-y-auto w-full h-full">
                {/* RightPanel content (Hero + Info) */}
                <div className="w-full min-h-full flex flex-col relative text-black bg-white">
                    {/* Header / Navbar mock */}
                    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-8 py-4 border-b border-gray-100 shrink-0">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">D</div>
                            <h1 className="text-xl font-bold text-gray-900 font-sans tracking-tight">Dheeraj.dev</h1>
                        </div>
                        <div className="flex gap-6 text-sm font-semibold text-gray-600">
                            <span className="cursor-pointer hover:text-blue-600 transition-colors">About</span>
                            <span className="cursor-pointer hover:text-blue-600 transition-colors">Work</span>
                            <span className="cursor-pointer hover:text-blue-600 transition-colors underline decoration-blue-600 underline-offset-4">Contact</span>
                        </div>
                    </header>

                    {/* Hero Section */}
                    <div className="relative w-full h-[360px] flex items-center justify-center overflow-hidden">
                        <img 
                            src="file:///Users/dheeraj/.gemini/antigravity/brain/19613f8f-3fde-4030-86a7-ff20d56f609a/portfolio_hero_mock_1773577167315.png" 
                            alt="Hero background"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-blue-900/40" />
                        <div className="relative z-10 text-center text-white px-6">
                            <h2 className="text-5xl font-extrabold mb-4 tracking-tighter drop-shadow-lg">Hello, I'm Dheeraj</h2>
                            <p className="text-xl text-blue-50 text-medium mb-8 max-w-xl mx-auto drop-shadow-md">
                                Crafting high-performance web applications with Next.js and React.
                            </p>
                            <div className="flex items-center justify-center gap-4">
                                <button className="bg-white text-blue-600 px-8 py-3 rounded-xl hover:bg-gray-100 font-bold shadow-xl transition-all hover:scale-105 active:scale-95">
                                    Browse Projects
                                </button>
                                <button className="bg-transparent border-2 border-white/50 text-white px-8 py-3 rounded-xl hover:bg-white/10 font-bold backdrop-blur-sm transition-all">
                                    Contact Me
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Stats section to make it look real */}
                    <div className="bg-gray-50 py-12 px-8 grid grid-cols-4 gap-8 border-b border-gray-100">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">5+</div>
                            <div className="text-xs uppercase tracking-widest text-gray-400 font-bold mt-1">Years Experience</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">50+</div>
                            <div className="text-xs uppercase tracking-widest text-gray-400 font-bold mt-1">Projects Done</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">30+</div>
                            <div className="text-xs uppercase tracking-widest text-gray-400 font-bold mt-1">Happy Clients</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">99%</div>
                            <div className="text-xs uppercase tracking-widest text-gray-400 font-bold mt-1">Quality Score</div>
                        </div>
                    </div>

                    {/* About Section */}
                    <div className="p-12">
                        <div className="max-w-4xl mx-auto">
                            <h3 className="text-3xl font-bold text-gray-900 mb-6">About My Journey</h3>
                            <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                I'm a passionate software developer specializing in the JavaScript ecosystem. My goal is to build digital products that are not only powerful but also intuitive and accessible.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Framer Motion'].map(skill => (
                                    <span key={skill} className="px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-bold rounded-full border border-blue-100">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
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
    );
}
