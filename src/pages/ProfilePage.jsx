import React from 'react';
import { Box, Typography, Card, CssBaseline } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Import useTheme to get the current theme

const ProfilePage = ({ user }) => {
    const theme = useTheme(); // Access the current theme

    return (
        <>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh', // Full viewport height
                    width: '100vw', // Full viewport width
                    backgroundColor: theme.palette.background.default, // Background color based on the theme
                }}
            >
                <Card
                    sx={{
                        padding: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        boxShadow: 3, // Optional: Add shadow for better visibility
                        borderRadius: 2, // Optional: Rounded corners
                        backgroundColor: theme.palette.background.paper, // Background color based on the theme
                    }}
                >
                    <img
                        src={user.photoURL || 'default-profile.png'}
                        alt="Profile"
                        style={{
                            borderRadius: '50%',
                            width: 100,
                            height: 100,
                            border: `2px solid ${theme.palette.primary.main}`, // Optional: Add border with theme color
                        }}
                    />
                    <Box sx={{ marginTop: 2, textAlign: 'center' }}>
                        <Typography variant="h6" color={theme.palette.text.primary}>
                            Name: {user.displayName || "N/A"}
                        </Typography>
                        <Typography variant="h6" color={theme.palette.text.primary}>
                            Email: {user.email || "N/A"}
                        </Typography>
                    </Box>
                </Card>
            </Box>
        </>
    );
};

export default ProfilePage;
