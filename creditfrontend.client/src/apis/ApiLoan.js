import { alertService } from "../utils/alert";

export const deleteLoan = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${window.location.origin}/api/loan/delete?id=${id}`, {
            method: "DELETE",
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

export const createLoan = async ({ amount, interest }) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${window.location.origin}/api/loan/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                amount: amount,
                interest: interest,
                duration: 12,
            })
        });
        if (response.status === 200) {
            const data = await response.json();
            alertService.success(data.message);
            return data;
        } else {
            const data = await response.json();
            if (data.title) { alertService.error(data.title); return null; }
            alertService.error(data.message);
            return null;
        }
    } catch (e) {
        console.log(e);
        alertService.error(e.toString());
        return null;
    }
}

export const payLoan = async (month, id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${window.location.origin}/api/loan/paythebill?id=${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                monthPaid: month,
            })
        });
        if (response.status === 200) {
            const data = await response.json();
            alertService.success(data.message);
            return data;
        } else {
            const data = await response.json();
            if (data.title) { alertService.error(data.title); return null; }
            alertService.error(data.message);
            return null;
        }
    } catch (e) {
        console.log(e);
        alertService.error(e.toString());
        return null;
    }
}

export const getHistoryBorrower = async (type) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${window.location.origin}/api/loan/history-borrower?type=${type}`, {
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

export const acceptLoan = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${window.location.origin}/api/loan/acc-mhanx?id=${id}`, {
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

export const getListRequestedLoan = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${window.location.origin}/api/loan/rikwes-peminjam`, {
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