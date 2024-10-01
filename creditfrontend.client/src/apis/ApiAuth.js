import { alertService } from "../utils/alert";

export const login = async ({ email, password }) => {
    try {
        const response = await fetch(`${window.location.origin}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, pass: password })
        });

        console.log(response.status);
        if (response.status === 200) {
            const data = await response.json();
            alertService.success(data.message);
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("role", data.data.role);
            localStorage.setItem("email", data.data.email);
            localStorage.setItem("name", data.data.name);
            localStorage.setItem("balance", data.data.balance);
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

export const register_admin = async ({ name, email, password }) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${window.location.origin}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ email: email, pass: password, name: name })
        });

        const data = await response.json();
        console.log(data)
        if (response.status === 200) {
            return data;
        } else {
            return null;
        }
    } catch (e) {
        console.log(e);
        return null;
    }
}

export const get_user = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${window.location.origin}/api/auth/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });

        const data = await response.json();
        console.log(data)
        if (response.status === 200) {
            localStorage.setItem("balance", data.data.balance);
            return data;
        } else {
            return null;
        }
    } catch (e) {
        console.log(e);
        return null;
    }
}

