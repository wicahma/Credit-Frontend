const dateTimeFormatter = (date) => {
    return new Intl.DateTimeFormat("id", {
        dateStyle: "medium",
    }).format(new Date(date));
};

const currencyFormatter = (amount) => {
    return new Intl.NumberFormat("id", {
        style: "currency",
        currency: "IDR",
    }).format(amount);
};

export { dateTimeFormatter, currencyFormatter };
