import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { Navigate, useLocation, useNavigate } from '../node_modules/react-router-dom/dist/index';
import NotFound from './pages/NotFound';
import Admin from './pages/admin/Admin';
import Lender from './pages/lender/Lender';
import IndexLender from './pages/lender/IndexLender';
import HistoryLender from './pages/lender/HistoryLender';
import TopupLender from './pages/lender/TopupLender';
import Borrower from './pages/borrower/Borrower';
import IndexBorrower from './pages/borrower/IndexBorrower';
import HistoryBorrower from './pages/borrower/HistoryBorrower';
import { useContext, useEffect, useState } from 'react';
import './App.css';
import { ThemeContext } from './context/ThemeContext';
import { Alert } from './components/Alert';

function App() {
    const { theme } = useContext(ThemeContext);
    const [role, setRole] = useState(null);
    const [balance, setBalance] = useState(0);
    const [token, setToken] = useState(null);
    const location = useLocation();
    const nav = useNavigate();


    useEffect(() => {
        console.log(location)
        const role = localStorage.getItem('role');
        const token = localStorage.getItem('token');
        const balance = localStorage.getItem('balance');
        if (!role) {
            setRole(null);
            gotoLogin();
        }
        else setRole(role);

        if (!token) {
            setToken(null);
            gotoLogin();
        }
        else setToken(token);

        if (!balance) {
            setBalance(0);
        }
        else setBalance(balance);
    }, [location.pathname]);

    const gotoLogin = () => {
        if (!location.pathname.includes("login")) {
            nav("/login", { replace: true });
        }
    }

    useEffect(() => {
        const root = document.getElementById("root");
        root.classList.add("transition-all", "duration-300");
        if (theme === "light") {
            root.classList.remove("dark");
        } else {
            root.classList.add("dark");
        }
    }, [theme]);


    return (
        <div className="app">
            <div className="fixed top-16 start-3 z-[2000]">
                <Alert />
            </div>
            <Navbar role={role} balance={balance} />
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace={true} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
                {
                    role === "lender" &&
                    (<Route
                        path="/dashboard/*"
                        element={
                            <ProtectedRoute
                                element={<Lender />}
                                isAuthenticated={token !== null}
                            />
                        }>
                        <Route index element={<IndexLender />} />
                        <Route path="history" element={<HistoryLender />} />
                        <Route path="top-up" element={<TopupLender />} />
                    </Route>)
                }
                {
                    role === "borrower" &&
                    (<Route
                        path="/dashboard/*"
                        element={
                            <ProtectedRoute
                                element={<Borrower />}
                                isAuthenticated={token !== null}
                            />
                        }>
                        <Route index element={<IndexBorrower />} />
                        <Route path="history" element={<HistoryBorrower />} />
                    </Route>)
                }
                {role === "admin" &&
                    (<Route
                        path="/admin"
                        element={
                            <ProtectedRoute
                                element={<Admin />}
                                isAuthenticated={token !== null}
                            />
                        }
                    />)
                }
            </Routes>
        </div>
    );
}

export default App;