import App from "./App";
import ThemeProvider from "./context/ThemeContext";
import { BrowserRouter as Router } from 'react-router-dom';

const ContextWrapper = () => {
    return (
        <Router>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </Router>
    );
};

export default ContextWrapper;
