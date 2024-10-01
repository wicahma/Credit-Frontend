const validateEmail = (val) => {
    if (val.length === 0)
        return { isError: true, message: "Email tidak boleh kosong!" };
    const re = /\S+@\S+\.\S+/g;

    const isError = !re.test(val);

    if (isError) return { isError: isError, message: "Email tidak valid!" };

    return { isError: false, message: "" };
};

const validatePassword = (val) => {
    if (val.length === 0)
        return { isError: true, message: "Password tidak boleh kosong!" };
    const re = /^(?=.*[0-9])(?=.*[A-Za-z]).{5,16}$/g;

    const isError = !re.test(val);

    if (isError)
        return {
            isError: isError,
            message:
                "Password harus mengandung satu digit angka, satu huruf kecil, satu huruf besar, tanpa spasi, dan 5-16 karakter!",
        };

    return { isError: false, message: "" };
};

const validateNumber = (val, accept0) => {
    const checkIsNumber = /^\d+$/;
    const checkIfOnlyZero = /^0+$/;
    if (accept0) {
        const isError = !checkIsNumber.test(Number(val));
        return {
            isError: isError,
            message: isError ? "Input harus angka!" : null
        }
    } else {
        const isError1 = !checkIsNumber.test(Number(val));
        const isError2 = checkIfOnlyZero.test(Number(val));
        if (isError1) return {
            isError: true,
            message: "Input harus angka!"
        }
        if (isError2) return {
            isError: true,
            message: "Input tidak boleh 0!"
        }
    }
    return {
        isError: false,
        message: ""
    }
}

export { validateEmail, validatePassword, validateNumber };
