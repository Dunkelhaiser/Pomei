/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";

type Theme = "dark" | "light" | "system";

interface IThemeContext {
    theme: Theme | null;
    isSystem: boolean;
    setThemeDark: () => void;
    setThemeLight: () => void;
    setThemeSystem: () => void;
    changeTheme: (selectedTheme: Theme) => void;
}

const ThemeContextState = {
    theme: null,
    isSystem: false,
    setThemeDark: () => {},
    setThemeLight: () => {},
    setThemeSystem: () => {},
    changeTheme: () => {},
};

export const ThemeContext = createContext<IThemeContext>(ThemeContextState);

const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const localTheme = localStorage.getItem("theme");
    const initTheme = localTheme ? (JSON.parse(localTheme) as Theme) : "system";

    const [theme, setTheme] = useState<Theme>(initTheme);
    const [isSystem, setIsSystem] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);

    const darkColor = "#111112";
    const lightColor = "#f9fafb";
    const body = document.querySelector("body");
    const colorMeta = document.querySelector('meta[name="theme-color"]');

    const setThemeHandler = (selectedTheme: Theme) => {
        setTheme(selectedTheme);
        document
            .querySelector('meta[name="theme-color"]')
            ?.setAttribute("content", selectedTheme === "dark" ? darkColor : lightColor);
        localStorage.setItem("theme", JSON.stringify(selectedTheme));
    };

    const setThemeDark = useCallback(() => {
        setThemeHandler("dark");
        setIsSystem(false);
    }, []);

    const setThemeLight = useCallback(() => {
        setThemeHandler("light");
        setIsSystem(false);
    }, []);

    const setThemeSystem = useCallback(() => {
        setThemeHandler("system");
        setIsSystem(true);
    }, []);

    const changeTheme = useCallback(
        (selectedTheme: Theme) => {
            if (selectedTheme === "light") setThemeLight();
            if (selectedTheme === "dark") setThemeDark();
            if (selectedTheme === "system") setThemeSystem();
        },
        [setThemeDark, setThemeLight, setThemeSystem]
    );

    useEffect(() => {
        if (theme === "dark") {
            colorMeta?.setAttribute("content", darkColor);
            body?.classList.add("dark");
        } else if (theme === "light") {
            colorMeta?.setAttribute("content", lightColor);
            body?.classList.remove("dark");
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark");
            setIsSystem(true);
            body?.classList.add("dark");
            colorMeta?.setAttribute("content", darkColor);
        } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
            setTheme("light");
            setIsSystem(true);
            body?.classList.remove("dark");
            colorMeta?.setAttribute("content", lightColor);
        }
        setIsLoading(false);
    }, [body?.classList, colorMeta, theme]);

    const values = useMemo(
        () => ({
            theme,
            isSystem,
            setThemeDark,
            setThemeLight,
            setThemeSystem,
            changeTheme,
        }),
        [theme, isSystem, setThemeDark, setThemeLight, setThemeSystem, changeTheme]
    );
    return <ThemeContext.Provider value={values}>{!isLoading && children}</ThemeContext.Provider>;
};

export default ThemeContextProvider;
