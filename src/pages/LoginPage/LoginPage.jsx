import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card, Button, Avatar } from '@mui/material';
import { UserCircle } from 'phosphor-react';
import { doSignInWithGoogle } from '../../firebase/auth';
import { useAuth } from '../../context/authContext';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      
      {'Copyright © '}
      <Link color="inherit" href="https://yogender21505.github.io/">
        Yogender
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

const LoginPage = () => {
  const [navigate, setNavigate] = useState(false);

  if (navigate) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSignIn = async () => {
    try {
      await doSignInWithGoogle();
      setNavigate(true);
    } catch (error) {
      console.error('Error during sign in:', error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'light',
            marginTop: 20,
            padding: 3,
          }}
        >
          {/* Add the image here */}
          <Avatar
            src="https://img.icons8.com/external-flat-circle-design-circle/66/external-File-Share-web-and-networking-flat-circle-design-circle.png"
            sx={{ width: 66, height: 66, mb: 2 }} // Set width, height, and margin bottom
          />
          <Typography component="h1" variant="h5">
            Welcome to Sign in Page
          </Typography>
          
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSignIn}
            >
              Sign in with Google
            </Button>
          </Box>
        </Card>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
