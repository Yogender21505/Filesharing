// src/SettingsPage.js
import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext'; // Import the custom hook

const SettingsPage = () => {
    const { toggleTheme, themeMode } = useTheme(); // Use the custom hook

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2
            }}
        >
            <CssBaseline />

            <BottomNavigation
                showLabels
                component={Paper}
                elevation={3}
                sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}
            >
                <BottomNavigationAction label="Files" />
                <BottomNavigationAction label="Upload" />
                <BottomNavigationAction label="Archive" />
                <BottomNavigationAction label="Notifications" />
            </BottomNavigation>

            <Box
                sx={{
                    marginTop: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <List>
                    <ListItemButton>
                        <ListItemAvatar>
                            {/* Place your avatar or icon here */}
                        </ListItemAvatar>
                    </ListItemButton>
                    {/* Add more settings items if needed */}
                </List>

                <IconButton
                    onClick={toggleTheme}
                    sx={{ marginTop: 2 }}
                >
                    {themeMode === 'light' ? <Brightness4 /> : <Brightness7 />}
                </IconButton>
            </Box>
        </Box>
    );
};

export default SettingsPage;
