import { create } from "zustand";

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("CHATTY-THEME") || "dark",

    setTheme: (theme) => {
        localStorage.setItem("CHATTY-THEME", theme);
        set({ theme });
    },
    
}));