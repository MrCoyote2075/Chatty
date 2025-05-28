import { create } from "zustand";
import { axiosInstence } from "../utils/axiosInstence";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    userData: null,
    isAuthenticated: false,
    isCheckingAuth: false,
    isSigningIn: false,
    isLogingIn: false,

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const apiRes = await axiosInstence.get("/auth/check");
            set({ userData: apiRes.data, isAuthenticated: true });

        } catch (error) {
            let err = error.response ?
                error.response.data :
                "Error: Server is Down"

            console.log(err);
            set({ userData: null, isAuthenticated: false });

        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signUp: async (userData) => {
        set({ isSigningIn: true });
        try {
            const apiRes = await axiosInstence.post("/auth/signup", userData);
            toast.success("Account Created Successfull");
            set({ userData: apiRes.data, isAuthenticated: true });

        } catch (error) {
            let err = error.response ?
                error.response.data :
                "Error: Server is Down"

            console.error(err);
            toast.error(err);
            set({ userData: null, isAuthenticated: false });
        }
        finally {
            set({ isSigningIn: false });
        }
    },

    login: async (logData) => {
        set({ isLogingIn: true });
        try {
            const apiRes = await axiosInstence.post("/auth/login", logData);
            toast.success(`Welcome Back, ${apiRes.data.fullname}`);
            set({ userData: apiRes.data, isAuthenticated: true });

        } catch (error) {
            let err = error.response ?
                error.response.data :
                "Error: Server is Down"

            console.error(error);
            toast.error(err);
            set({ userData: null, isAuthenticated: false });

        } finally {
            set({ isLogingIn: false });
        }
    },

    logout: async () => {
        set({ isCheckingAuth: true });
        try {
            const apiRes = await axiosInstence.post("/auth/logout");
            toast.success(apiRes.data);
            set({ userData: null, isAuthenticated: false });

        } catch (error) {
            const err = error.response ?
                error.response.data :
                "Server is Down";

            console.error(err);
            toast.error(err);

        } finally {
            setTimeout(()=> {
                set({ isCheckingAuth: false });
            },500)
        }
    }
}))