import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "../../../node_modules/react-router-dom/dist/index";
import { validateEmail, validatePassword } from "../../utils/validator";
import { login } from "../../apis/ApiAuth";
import { alertService } from "../../utils/alert";

function Login() {
    const [isFormInitCheck, setIsFormInitCheck] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState({});
    const nav = useNavigate();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) navigator()
    }, [])

    const handleLogin = async () => {
        setLoading(true);
        const isValidated = validateLogin();
        if (isValidated) {
            const res = await login(form);
            setLoading(false)
            if (res !== null) navigator()
        } else {
            setLoading(false)
            setIsLogin(false);
        }
    };

    const navigator = () => {
        const role = localStorage.getItem("role")
        switch (role) {
            case "admin":
                nav("/admin", { replace: true })
                break;
            case "lender":
                nav("/dashboard", { replace: true })
                break;
            case "borrower":
                nav("/dashboard", { replace: true })
                break;
            default:
                alertService.error("Failed to login!")
                break;
        }
    }

    const validateLogin = () => {
        const resValidateEmail = validateEmail(form.email);
        const resValidatePass = validatePassword(form.password);

        setIsFormInitCheck(false);

        if (resValidateEmail.isError) {
            setError((prev) => ({
                ...prev,
                email: resValidateEmail.message,
            }));
        } else {
            const newError = error
            delete newError.email
            setError(newError);
        }
        if (resValidatePass.isError) {
            setError((prev) => ({
                ...prev,
                password: resValidatePass.message,
            }));
        } else {
            const newError = error
            delete newError.password
            setError(newError);
        }
        if (resValidateEmail.isError || resValidatePass.isError) {
            return false;
        }
        setError({});
        return true;
    };


    return (
        <>
            <div className="h-screen">
                <div className="fixed right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 inline-block px-3 max-w-[400px]">
                    <div className="bg-gray-50 rounded-lg px-3 py-2 border-gray-800 border base-shadow min-w-fit w-fit dark:text-gray-300 dark:bg-gray-600">
                        <h1 className="text-4xl font-bold text-start">Login</h1>
                        <form>
                            <div className="flex flex-col gap-y-3 mt-6">
                                <div className="space-y-1">
                                    <label
                                        className={`${error.email ? "text-red-400" : ""
                                            } flex gap-2 text-lg items-center`}
                                    >
                                        Email
                                        <input
                                            value={form.email}
                                            onChange={(e) => {
                                                if (!isFormInitCheck) {
                                                    validateLogin();
                                                }
                                                setForm((prev) => ({ ...prev, email: e.target.value }));
                                            }}
                                            type="email"
                                            placeholder="Masukkan email anda"
                                            className={`grow dark:bg-gray-400 placeholder:text-gray-500 text-lg dark:text-gray-900 ${error.email ? "error" : ""
                                                }`}
                                        />
                                    </label>
                                    <p className="text-red-400 text-sm font-medium">
                                        {error.email}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <label
                                        className={`${error.password ? "text-red-400" : ""
                                            } flex gap-2 text-lg items-center justify-center`}
                                    >
                                        Password
                                        <input
                                            value={form.password}
                                            onChange={(e) => {
                                                if (!isFormInitCheck) {
                                                    validateLogin();
                                                }
                                                setForm((prev) => ({ ...prev, password: e.target.value }));
                                            }}
                                            placeholder="Masukkan password anda"
                                            type={showPassword ? "text" : "password"}
                                            className={`grow dark:bg-gray-400 placeholder:text-gray-500 dark:text-gray-900 ${error.password ? "error" : ""
                                                }`}
                                        />
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                setShowPassword((prev) => (!prev));
                                            }}
                                            type="button"
                                            className="aspect-square h-11 p-2"
                                        >
                                            {showPassword ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z" clipRule="evenodd" />
                                                <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
                                            </svg>
                                                : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                                    <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" />
                                                </svg>
                                            }
                                        </button>
                                    </label>
                                    <p className="text-red-400 text-sm font-medium break-words">
                                        {error.password}
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleLogin}
                                className="bg-blue-400 font-medium flex gap-3 items-center justify-center text-blue-950 hover:bg-blue-500 hover:text-white w-full mt-6 h-11 text-lg"
                            >
                                {
                                    loading &&
                                    <div className="loader" />
                                }
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {isLogin && <Navigate to="/" replace={true} />}
        </>
    );
}

export default Login;