// src/ThemeContext.js
import React, { createContext, useState, useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a context for the theme
const ThemeContext = createContext();

export const ThemeProviderComponent = ({ children }) => {
    // State to manage the current theme mode
    const [themeMode, setThemeMode] = useState('light');

    // Create a theme object based on the current theme mode
    const theme = createTheme({
        palette: {
            mode: themeMode,
        },
    });

    // Function to toggle between light and dark mode
    const toggleTheme = () => {
        setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ toggleTheme, themeMode }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);
