import api from "../../utils/api";

export const Students = {
    async StudentsGet(classesId) {
        const response = await api.get(`/api/v1/getteachers/${classesId}`);
        return response.data;
    },
    async StudentsPost(studentData) {
        const response = await api.post(`/api/v1/addpupil/`, studentData);
        return response.data;
    },
}