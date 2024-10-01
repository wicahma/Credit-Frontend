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

const addMonthsToDate = (dateString, month) => {
    let date = new Date(dateString);
    date.setMonth(date.getMonth() + month);

    return dateTimeFormatter(date);
}

export { dateTimeFormatter, currencyFormatter, addMonthsToDate };
