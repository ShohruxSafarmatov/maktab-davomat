import api from "../../utils/api";

export const Classes = {
    async GetClasses(schoolId) {
        const response = await api.get(`/api/v1/getsinf/${schoolId}`);
        return response.data;
    },
    async AddClasses(schoolId, classeData) {
        const response = await api.post(`/api/v1/addsinf/${schoolId}`, classeData);
        return response.data;
    },
    async PutClasses(body) {
        const response = await api.put(`/api/v1/editsinf/`, body);
        return response.data;
    },
    async DeleteClasses(classesId) {
        const response = await api.delete(`/api/v1/deletesinf/${classesId}/`);
        return response.data;
    }
}