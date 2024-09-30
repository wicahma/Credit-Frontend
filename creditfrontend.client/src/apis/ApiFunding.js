import { alertService } from "../utils/alert";

export const getDetailFunding = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`api/funding/detail-funding?id=${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });
        if (response.status === 200) {
            const data = await response.json();
            alertService.success(data.message);
            return data;
        } else {
            const data = await response.json();
            alertService.error(data.message);
            return null;
        }
    } catch (e) {
        console.log(e);
        alertService.error(e.toString());
        return null;
    }
}

export const getHistoryLender = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`api/funding/history-lender`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });
        if (response.status === 200) {
            const data = await response.json();
            alertService.success(data.message);
            return data;
        } else {
            const data = await response.json();
            alertService.error(data.message);
            return null;
        }
    } catch (e) {
        console.log(e);
        alertService.error(e.toString());
        return null;
    }
}