import api from "../../utils/api";

export const Teachers = {
    async TeachersGet(userId) {
        const response = await api.get(`/api/v1/getteachers/${userId}`);
        return response.data;
    },
    async TeachersPost(userId, userData) {
        const response = await api.post(`/api/v1/addteacher/${userId}`, userData);
        return response.data;
    },
    async TeachersEdit(userData) {
        const response = await api.put(`/api/v1/editteacher/`, userData);
        return response.data;
    },
    async TeachersEditImage({
        id,
        userData
    }) {
        const response = await api.put(`/api/v1/addteacherimage/`, userData);
        return response.data;
    },
    async TeachersDelete(userId) {
        const response = await api.delete(`/api/v1/deleteteacher/${userId}/`);
        return response.data;
    },
}