import api from "../../utils/api";

export const Attendance = {
    async HeaderChart(date) {
        const response = await api.post("/api/v1/headerchart/", date);
        return response.data;
    },
    async AttendanceResp(date) {
        const response = await api.post("/api/v1/davomatresp/", date);
        return response.data;
    },
    async AttendanceMonth(data) {
        const response = await api.post("/api/v1/davomatsinfmonth/", data);
        return response.data;
    },
    async AttendanceSchoolSmena(data) {
        const response = await api.post("/api/v1/davomatmaktabsmena/", data);
        return response.data;
    },
    async AttendanceSchoolClasses(data) {
        const response = await api.post("/api/v1/davomatsinf/", data);
        return response.data;
    },
    async AttendanceSchoolNew(data) {
        const response = await api.post("/api/v1/davomatmaktabnew/", data);
        return response.data;
    },
}