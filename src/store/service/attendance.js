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
}