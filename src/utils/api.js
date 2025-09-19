import axios from "axios";
import {
    getLocalStorage
} from "../libs/localStorage";

const getHeaders = () => {
    const token = getLocalStorage("school_token");
    return token ? {
        Authorization: "Token " + token
    } : {};
};

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
    const headers = getHeaders();
    config.headers = {
        ...config.headers,
        ...headers,
    };
    return config;
});

export default api;