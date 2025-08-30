import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstence } from "../utils/axiosInstence.js";
// import { useAuthStore } from "./useAuthStore.jsx";
// const { userData } = useAuthStore();
export const useChatStore = create((set) => ({
    users : [],
    messages : [],
    selectedUser : null,
    setIsUsersLoading : false,
    setIsMessagesLoading: false,

    setSelectedUser : (user) => {
        set({selectedUser : user});
    },
    getUsers : async (userId) => {
        set({setIsUsersLoading : true});
        try {
            const apiRes = await axiosInstence(`/api/chats/contacts/${userId}`);
            set({users : apiRes.data});
            console.log(apiRes.data);
        } catch(error) {
            console.error(error);
            toast.error(error);
        }
        set({setIsUsersLoading : false});
    },
    getMessages : async (userId) => {
        set({setIsUsersLoading : true});
        try {
            const apiRes = await axiosInstence(`/api/chats/messages/${userId}`);
            set({users : apiRes.data});
            console.log(apiRes.data);
        } catch(error) {
            console.error(error);
            toast.error(error);
        }
        set({setIsUsersLoading : false});
    }
}))