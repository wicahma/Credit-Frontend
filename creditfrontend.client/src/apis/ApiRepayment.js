export const getDetailRepayment = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`api/repayment/detail-repayment?id=${id}`, {
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