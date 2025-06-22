import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstence } from "../utils/axiosInstence.js";

export const useChatStore = create((set) => ({
    users : [],
    messages : [],
    selectedUser : null,
    setIsUsersLoading : false,
    setIsMessagesLoading: false,

    getUser : async (userId) => {
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