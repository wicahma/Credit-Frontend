import { useContext, useState } from "react";
import { Link, useNavigate } from "../../node_modules/react-router-dom/dist/index";
import { ThemeContext } from "../context/ThemeContext";
import { currencyFormatter } from "../utils/formatter";

function Navbar({ role, balance }) {
    const nav = useNavigate();
    const { theme, toggleTheme } = useContext(ThemeContext);

    const handleLogout = () => {
        const theme = localStorage.getItem("theme");
        localStorage.clear();
        localStorage.setItem("theme", theme);
        nav(0);
    }



    return role !== null ? (
        <nav className="bg-gray-300 dark:bg-gray-800 h-15 w-full px-3 py-2 flex gap-5 justify-between pt-4">
            <div className="flex justify-center items-center px-3 h-full rounded-lg bg-gray-200 dark:bg-gray-700">
                <a className="text-xl ">Kledit Ooo</a>
            </div>
            {role === "lender" && (
                <div className="flex gap-3 grow">
                    <Link to="dashboard" className="hover:underline decoration-2 font-medium">Dashboard</Link>
                    <Link to="dashboard/history" className="hover:underline decoration-2 font-medium">History</Link>
                    <Link to="dashboard/top-up" className="hover:underline decoration-2 font-medium">Top Up</Link>
                </div>
            )}

            {role === "borrower" && (
                <div className="flex gap-3 grow">
                    <Link to="dashboard" className="hover:underline decoration-2 font-medium">Dashboard</Link>
                    <Link to="dashboard/history" className="hover:underline decoration-2 font-medium">History</Link>
                </div>
            )}

            {role === "admin" && (
                <div className="flex gap-3 grow">
                    <Link to="admin" className="hover:underline decoration-2 font-medium">Admin</Link>
                </div>
            )}
            <div className="flex items-center justify-center gap-3">
                <div className="base-shadow border border-gray-900 px-2 h-9 flex items-center justify-center translate-y-[-5px] uppercase font-bold">Balance {currencyFormatter(balance)}</div>
                <div className="base-shadow border border-gray-900 px-2 h-9 flex items-center justify-center translate-y-[-5px] uppercase font-bold">{role}</div>
                <button onClick={handleLogout} className="bg-red-500 px-4 flex items-center justify-center font-semibold text-red-200 h-9">
                    <p>Logout</p>
                </button>
                <button onClick={toggleTheme} className={`${theme === "light" ? "bg-gray-800 text-white" : "bg-yellow-400 text-yellow-800"} aspect-square h-9`}>
                    {theme === "light" ?
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.455 2.004a.75.75 0 0 1 .26.77 7 7 0 0 0 9.958 7.967.75.75 0 0 1 1.067.853A8.5 8.5 0 1 1 6.647 1.921a.75.75 0 0 1 .808.083Z" clipRule="evenodd" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2ZM10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15ZM10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM15.657 5.404a.75.75 0 1 0-1.06-1.06l-1.061 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM6.464 14.596a.75.75 0 1 0-1.06-1.06l-1.06 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM18 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 18 10ZM5 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 5 10ZM14.596 15.657a.75.75 0 0 0 1.06-1.06l-1.06-1.061a.75.75 0 1 0-1.06 1.06l1.06 1.06ZM5.404 6.464a.75.75 0 0 0 1.06-1.06l-1.06-1.06a.75.75 0 1 0-1.061 1.06l1.06 1.06Z" />
                        </svg>
                    }

                </button>
            </div>
        </nav>
    ) : null;
}

export default Navbar;