import axios from "axios";

export const axiosInstence = axios.create({
    baseURL:"http://localhost:1247/api",
    withCredentials: true
})