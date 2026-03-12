import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ApiKeyState {
    gemini: string[];
    openai: string[];
    claude: string[];
    // Track current index for rotation
    currentIndices: {
        gemini: number;
        openai: number;
        claude: number;
    };
}

interface SettingsState extends ApiKeyState {
    addApiKey: (provider: keyof ApiKeyState & ('gemini' | 'openai' | 'claude'), key: string) => void;
    removeApiKey: (provider: keyof ApiKeyState & ('gemini' | 'openai' | 'claude'), index: number) => void;
    updateApiKey: (provider: keyof ApiKeyState & ('gemini' | 'openai' | 'claude'), index: number, key: string) => void;
    getNextKey: (provider: keyof ApiKeyState & ('gemini' | 'openai' | 'claude')) => string | null;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set, get) => ({
            gemini: [],
            openai: [],
            claude: [],
            currentIndices: {
                gemini: 0,
                openai: 0,
                claude: 0,
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
