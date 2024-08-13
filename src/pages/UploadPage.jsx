
import CssBaseline from '@mui/material/CssBaseline';
import React, { Suspense, lazy } from "react";
import { Folder, UploadSimple, Archive, Bell, Stack } from "phosphor-react";
import {useState } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { Box } from '@mui/material';

const storage = getStorage(); // Ensure `storage` is properly initialized

const UploadPage = () => {
    const [loading, setLoading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleFileUpload = (event) => {
        setLoading(true);
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const storageRef = ref(storage, `uploads/${uuidv4()}_${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed', 
                (snapshot) => {
                    // Observe progress here
                }, 
                (error) => {
                    console.error("Upload failed:", error);
                    setLoading(false);
                }, 
                () => {
                    // Handle successful uploads
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setUploadedFile(downloadURL); // Store the file URL
                        setLoading(false);
                        alert(`File ${file.name} uploaded successfully!`);
                    });
                }
            );
        } else {
            setLoading(false);
        }
    };

    const handleClick = () => {
        document.getElementById('fileInput').click(); // Trigger file input click
    };

    return (
        <Box 
            sx={{
                pb: 7, 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                height: "100vh"
            }} 
            onClick={handleClick}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
                e.preventDefault();
                handleFileUpload({ target: { files: e.dataTransfer.files } });
            }}
        >
            <CssBaseline />
            <input
                id="fileInput"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
            />
            {loading ? (
                <LoadingScreen /> // Ensure LoadingScreen component is imported and used correctly
            ) : (
               <Box sx={{display: "flex", 
                justifyContent: "center", 
                alignItems: "center",
                border: "2px dashed grey"}}>
                    <UploadSimple size={"10%"} /> 
                    <h3>Click/Drag file</h3>
               </Box> 
            )}
        </Box>
    );
};

export default UploadPage;
