import { useTheme } from "next-themes";

export default function ModeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <button className="app-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
    );
}
