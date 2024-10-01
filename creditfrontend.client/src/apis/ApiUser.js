import { alertService } from "../utils/alert";

export const getAllUser = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${window.location.origin}/api/user/get-users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });

        if (response.status === 200) {
            const data = await response.json();
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

export const updateUser = async ({ name, balance, role }, id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${window.location.origin}/api/user/update-user?id=${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name: name, role: role, balance: balance })
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

export const createUser = async ({ name, email, pass, role }) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${window.location.origin}/api/user/create-user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name: name, role: role, email: email, pass: pass })
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

export const deleteUser = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${window.location.origin}/api/user/delete-user?id=${id}`, {
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

export const updateBalanceLender = async (amount) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${window.location.origin}/api/user/update-balance?balance=${amount}`, {
            method: "POST",
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

