import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                rickGreen: "#82cd47",
                rickGreenDark: "#65b741",
                rickYellow: "#ffd700",
                rickBlue: "#4a90e2",
                rickBlueDark: "#3a7bc8",
                rickPurple: "#9b59b6",
                rickPurpleDark: "#8b4fa8",
                rickDark: "#0f3460",
                rickDarker: "#1a2847",
            },
            fontFamily: {
                sans: [
                    "-apple-system",
                    "BlinkMacSystemFont",
                    '"Segoe UI"',
                    "Roboto",
                    '"Helvetica Neue"',
                    "Arial",
                    "sans-serif",
                ],
            },
        },
    },
    plugins: [],
};

export default config;
