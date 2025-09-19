import api from "../../utils/api";

export const AuthAPI = {
    async Login(user) {
        const response = await api.post("/api/v1/api-token-auth/", user);
        return response.data;
    },
}