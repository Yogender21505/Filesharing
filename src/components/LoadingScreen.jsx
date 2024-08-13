import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { CssBaseline } from "@mui/material";

const LoadingScreen = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const ref = React.useRef(null);
  useEffect(() => {
    // Simulate a delay of 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Cleanup the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          pb: 7,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%"
        }}
      >
        
        <CircularProgress />
        <CssBaseline></CssBaseline>
      </Box>
      
    );
  }

  return children;
};

export default LoadingScreen;
