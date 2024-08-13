import React, { useState, useEffect, useRef } from 'react';
import { getStorage, ref as storageRef, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { Box, CssBaseline, Grid, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { Folder, Download, Delete } from '@mui/icons-material'; // Import Folder, Download, and Delete icons from Material UI
import { useTheme } from '@mui/material/styles'; // Import useTheme to get current theme
import LoadingScreen from '../components/LoadingScreen'; // Import your LoadingScreen component

const GeneralApp = () => {
    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading
    const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility
    const [password, setPassword] = useState(''); // State to manage password input
    const [selectedFolder, setSelectedFolder] = useState(null); // State to manage selected folder
    const [selectedFileToDelete, setSelectedFileToDelete] = useState(null); // State to manage selected file for deletion
    const ref = useRef(null); // Ensure this ref is used correctly or remove if unnecessary
    const theme = useTheme(); // Access the current theme
    const envPassword = import.meta.env.VITE_SECRET_PASSWORD;

    useEffect(() => {
        const fetchFiles = async () => {
            const storage = getStorage();
            const listRef = storageRef(storage, 'uploads/');
            try {
                const res = await listAll(listRef);
                const files = await Promise.all(res.items.map(async (itemRef) => {
                    const url = await getDownloadURL(itemRef);
                    const fileName = itemRef.name.split('_').slice(1).join('_'); // Assuming the file name starts after the first underscore
                    return { name: fileName, url, ref: itemRef };
                }));
                setFolders(files);
            } catch (error) {
                console.error("Error fetching files:", error);
            } finally {
                setLoading(false); // Set loading to false once the data is fetched
            }
        };

        fetchFiles();
    }, []);

    // Function to handle file download in a new tab
    const handleDownload = (url) => {
        setSelectedFolder(url);
        setOpenDialog(true); // Open password dialog
    };

    // Function to handle password submission
    const handlePasswordSubmit = () => {
        // Access the password from .env
        if (password === envPassword) {
            // If password is correct, download the file
            window.open(selectedFolder, '_blank');
        } else {
            console.log('Incorrect password. Access denied.');
        }
        setOpenDialog(false); // Close the password dialog
        setPassword(''); // Clear the password field
    };

    // Function to handle file deletion
    const handleDelete = async (fileRef) => {
        try {
            await deleteObject(fileRef);
            // Remove the file from state
            setFolders((prevFolders) => prevFolders.filter(folder => folder.ref !== fileRef));
        } catch (error) {
            console.error("Error deleting file:", error);
        }
    };

    return (
        <Box
            sx={{
                height: "100vh", // Full viewport height
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                pb: 7,
                backgroundColor: theme.palette.background.default, // Background color based on the theme
                color: theme.palette.text.primary // Text color based on the theme
            }}
            ref={ref}
        >
            <CssBaseline />

            {loading ? (
                <LoadingScreen /> // Display loading screen while fetching data
            ) : (
                <Grid container spacing={1} justifyContent="center" alignItems="flex-start">
                    {folders.length > 0 ? (
                        folders.map(({ name, url, ref }, index) => (
                            <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: 2,
                                        border: `1px solid ${theme.palette.divider}`, // Border color based on the theme
                                        borderRadius: 2,
                                        textAlign: "center",
                                        backgroundColor: theme.palette.background.paper, // Background color based on the theme
                                        cursor: "pointer",
                                        '&:hover': {
                                            backgroundColor: theme.palette.action.hover // Hover color based on the theme
                                        }
                                    }}
                                >
                                    <IconButton onClick={() => handleFolderClick({ name, url })}>
                                        <Folder sx={{ fontSize: 50, color: theme.palette.text.primary }} /> {/* Adjust icon color */}
                                    </IconButton>
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        {name}
                                    </Typography>
                                    <IconButton
                                        onClick={() => handleDownload(url)}
                                        sx={{ mt: 1, color: theme.palette.primary.main }} // Set color for download button
                                    >
                                        <Download />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleDelete(ref)}
                                        sx={{ mt: 1, color: theme.palette.error.main }} // Set color for delete button
                                    >
                                        <Delete />
                                    </IconButton>
                                </Box>
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="body2" sx={{ textAlign: "center", width: '100%' }}>
                            No files found
                        </Typography>
                    )}
                </Grid>
            )}

            {/* Password Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Enter Password</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">Cancel</Button>
                    <Button onClick={handlePasswordSubmit} color="primary">Submit</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default GeneralApp;
