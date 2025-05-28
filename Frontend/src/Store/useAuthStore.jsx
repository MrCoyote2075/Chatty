import { create } from "zustand";
import { axiosInstence } from "../utils/axiosInstence";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    userData: null,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            set({ isCheckingAuth: true });
            const apiRes = await axiosInstence.get("/auth/check");
            set({ userData: apiRes.data });

        } catch (error) {
            let err = error.response ?
                error.response.data.error :
                "Error: Server is Down"

            console.error(err);
            set({ userData: null });

        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signUp: async (userData) => {
        try {
            // set({ isCheckingAuth: true });
            const apiRes = await axiosInstence.post("/auth/signup", userData);
            set({ userData: apiRes.data });
            toast.success("Account Created Successfull");

        } catch (error) {
            let err = error.response ?
                error.response.data.error :
                "Error: Server is Down"

            console.error(err);
            toast.error(err);
            set({ userData: null });

        } finally {
            set({ isCheckingAuth: false });
        }
    },

    login: async (userData) => {
        try {
            // set({ isCheckingAuth: true });
            const apiRes = await axiosInstence.post("/auth/signup", userData);
            set({ userData: apiRes.data });
            toast.success("Account Created Successfull");

        } catch (error) {
            let err = error.response ?
                error.response.data.error :
                "Error: Server is Down"

            console.error(err);
            toast.error(err);
            set({ userData: null });

        } finally {
            set({ isCheckingAuth: false });
        }
    }
}))