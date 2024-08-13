import React, { useState, Suspense, lazy } from "react";
import { Box, IconButton, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ProfileImage from "../../components/ProfileImage";
import { Profile_Menu } from "../../data";
import LoadingScreen from "../../components/LoadingScreen";
import { doSignOut } from "../../firebase/auth"; // Import the signOut function from your auth setup
import { useAuth } from "../../context/authContext"; // Assuming you have an Auth Context

// Loadable HOC for lazy loading components
const Loadable = (Component) => (props) => (
  <LoadingScreen>
    <Suspense fallback={<>Loading...</>}>
      <Component {...props} />
    </Suspense>
  </LoadingScreen>
);

const DashBoard = () => {
  const theme = useTheme();
  const [selected, setSelected] = useState("Upload");
  const { currentUser } = useAuth(); // Use the current user from context
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await doSignOut(); // Sign out the user
      navigate("/"); // Redirect to the login page
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getPage = (selected) => {
    if (selected === "Upload") {
      return <UploadP />;
    }
    if (selected === "Folder") {
      return <FolderP />;
    }
    if (selected === "Settings") {
      return <SettingP />;
    }
    if (selected === "Profile") {
      return <ProfileP user={currentUser} />;
    }
  };

  return (
    <>
      <Stack direction={"row"}>
        <Stack>
          <Box
            p={2}
            sx={{
              backgroundColor: theme.palette.background.paper,
              boxShadow: "0px 0px 1px rgba(0,0,0,0.25)",
              height: "100%",
              width: 100,
              position: "fixed", // Fixes the Dashboard position
              top: 0,
              left: 0,
            }}
          >
            <Stack
              direction="column"
              alignItems={"center"}
              justifyContent="space-between"
              sx={{ height: "100%", width: "100%" }}
            >
              {currentUser ? (
                <ProfileImage
                  image={currentUser.photoURL} // User profile image URL
                  name={currentUser.displayName} // User name
                  email={currentUser.email} // User email
                />
              ) : (
                <ProfileImage
                  image="" // Default or placeholder image
                  name="Guest"
                  email=""
                />
              )}

              <Stack sx={{ margin: theme.spacing(3) }}>
                {Profile_Menu.map((elem) =>
                  elem.title === selected ? (
                    <Box
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: 1.5,
                        margin: theme.spacing(2),
                      }}
                      key={elem.index}
                    >
                      <IconButton
                        sx={{
                          width: "max-content",
                          color: theme.palette.getContrastText(theme.palette.primary.main), // Ensure icon color contrasts with background
                        }}
                        onClick={() => setSelected(elem.title)}
                      >
                        {elem.icon}
                      </IconButton>
                    </Box>
                  ) : elem.title === "Signout" ? (
                    <IconButton
                      onClick={handleSignOut} // Directly call the sign-out function
                      sx={{
                        margin: theme.spacing(2),
                        width: "max-content",
                        color: theme.palette.text.primary, // Use text color for sign out
                      }}
                      key={elem.index}
                    >
                      {elem.icon}
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => setSelected(elem.title)}
                      sx={{
                        margin: theme.spacing(2),
                        width: "max-content",
                        color: theme.palette.text.primary, // Use text color for other items
                      }}
                      key={elem.index}
                    >
                      {elem.icon}
                    </IconButton>
                  )
                )}
              </Stack>
            </Stack>
          </Box>
        </Stack>
        <Stack direction={"column"} sx={{ marginLeft: "100px", width: "calc(100% - 100px)" }}>
          <Box
            sx={{
              height: "100vh",
              overflowY: "auto", // Enables scrolling within this area
              backgroundColor: theme.palette.background.default, // Set the background color for the main content area
              color: theme.palette.text.primary, // Set the text color for the main content area
            }}
          >
            {getPage(selected)}
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

const UploadP = Loadable(lazy(() => import("../UploadPage")));
const SettingP = Loadable(lazy(() => import("../SettingsPage")));
const FolderP = Loadable(lazy(() => import("../GeneralApp")));
const ProfileP = Loadable(lazy(() => import("../ProfilePage")));

export default DashBoard;
