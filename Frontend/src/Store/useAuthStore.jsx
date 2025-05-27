import { create } from "zustand";
import { axiosInstence } from "../utils/axiosInstence";

export const useAuthStore = create((set) => ({
    userData: null,
    isCheckingAuth: true,
    isSigningUp: true,

    checkAuth: async () => {
        try {
            await axiosInstence.get("/auth/check")
                .then(res => {
                    console.log(res.data);
                    set({ userData: res.data })
                })
                .catch(err => {
                    console.log(err);
                    set({ userData: null })
                });
        } catch (error) {
            console.log(error);
        }
        finally {
            set({ isCheckingAuth: false })
        }
    }
}))