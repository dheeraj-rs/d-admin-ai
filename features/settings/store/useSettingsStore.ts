import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ApiKeyState {
    gemini: string[];
    openai: string[];
    claude: string[];
    vercel: string[];
    github: string[];
    currentIndices: {
        gemini: number;
        openai: number;
        claude: number;
        vercel: number;
        github: number;
    };
}

interface SettingsState extends ApiKeyState {
    addApiKey: (provider: keyof ApiKeyState & ('gemini' | 'openai' | 'claude' | 'vercel' | 'github'), key: string) => void;
    removeApiKey: (provider: keyof ApiKeyState & ('gemini' | 'openai' | 'claude' | 'vercel' | 'github'), index: number) => void;
    updateApiKey: (provider: keyof ApiKeyState & ('gemini' | 'openai' | 'claude' | 'vercel' | 'github'), index: number, key: string) => void;
    getNextKey: (provider: keyof ApiKeyState & ('gemini' | 'openai' | 'claude' | 'vercel' | 'github')) => string | null;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set, get) => ({
            gemini: [],
            openai: [],
            claude: [],
            vercel: [],
            github: [],
            currentIndices: {
                gemini: 0,
                openai: 0,
                claude: 0,
                vercel: 0,
                github: 0,
            },

            addApiKey: (provider, key) => {
                set((state) => ({
                    [provider]: [...state[provider], key],
                }));
            },

            removeApiKey: (provider, index) => {
                set((state) => {
                    const newKeys = [...state[provider]];
                    newKeys.splice(index, 1);
                    return {
                        [provider]: newKeys,
                        currentIndices: {
                            ...state.currentIndices,
                            [provider]: 0, // Reset index on removal to be safe
                        },
                    };
                });
            },

            updateApiKey: (provider, index, key) => {
                set((state) => {
                    const newKeys = [...state[provider]];
                    newKeys[index] = key;
                    return { [provider]: newKeys };
                });
            },

            getNextKey: (provider) => {
                const { [provider]: keys, currentIndices } = get();
                if (keys.length === 0) return null;

                const currentIndex = currentIndices[provider];
                const key = keys[currentIndex];

                // Increment and rotate index for next call
                set((state) => ({
                    currentIndices: {
                        ...state.currentIndices,
                        [provider]: (currentIndex + 1) % keys.length,
                    },
                }));

                return key;
            },
        }),
        {
            name: 'd-admin-settings',
        }
    )
);
