export const deleteLoan = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`api/loan/delete?id=${id}`, {
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

export const createLoan = async ({ amount, interest, duration }) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`api/loan/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                amount: amount,
                interest: interest,
                duration: duration,
            })
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

export const payLoan = async (month, id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`api/loan/paythebill?id=${id}`, {
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
        const response = await fetch(`api/loan/history-borrower?type=${type}`, {
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
        const response = await fetch(`api/loan/acc-mhanx?id=${id}`, {
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
        const response = await fetch(`api/loan/rikwes-peminjam`, {
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