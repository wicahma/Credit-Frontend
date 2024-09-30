import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const mode = localStorage.getItem("theme") ?? "light";

    const [theme, setTheme] = useState(mode);

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            if (prevTheme === "light") {
                localStorage.setItem("theme", "dark");
                return "dark"
            } else {
                localStorage.setItem("theme", "light");
                return "light"
            }
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
