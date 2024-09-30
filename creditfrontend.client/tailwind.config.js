/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'selector',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                "slide-in": {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(-10px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                },
                "slide-out": {
                    "0%": { opacity: "1", transform: "translateY(0)" },
                    "100%": {
                        opacity: "0",
                        transform: "translateY(-10px)",
                    },
                },
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                "fade-out": {
                    "0%": { opacity: "1" },
                    "100%": { opacity: "0" },
                },
                "bounce-in": {
                    "0%": { opacity: "0", transform: "translateY(-10px)" },
                    "50%": { opacity: "1", transform: "translateY(5px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "bounce-out": {
                    "0%": { opacity: "1", transform: "translateY(0)" },
                    "50%": { opacity: "1", transform: "translateY(5px)" },
                    "100%": { opacity: "0", transform: "translateY(-10px)" },
                },
            },
            animation: {
                "fade-in": "fade-in 0.3s ease-out forwards",
                "fade-out": "fade-out 0.3s ease-out forwards",
                "slide-in": "slide-in 0.3s ease-out forwards",
                "slide-out": "slide-out 0.3s ease-out forwards",
                "bounce-in": "bounce-in 0.3s ease-out forwards",
                "bounce-out": "bounce-out 0.3s ease-out forwards",
            },
        },
    },
    plugins: [],
}

