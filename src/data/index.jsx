import{
    ChatCircleDots,
    Gear,
    GearSix,
    Phone,
    SignOut,
    User,
    Users,
    ToggleLeft,
    Folder,
    UploadSimple,
}from "phosphor-react";

const Profile_Menu=[
    {
        title: "Upload",
        icon:<UploadSimple/>,
    },
    {
        title: "Folder",
        icon:<Folder/>,
    },
    {
        title: "Profile",
        icon:<User/>,
    },
    {
        title: "Settings",
        icon:<Gear/>,
    },
    {
        title: "Signout",
        icon:<SignOut/>,
    },
];



const Below_Buttons=[
    {
       index: 0,
       icon: <ToggleLeft/>
    },
];


const NavigationPages=[
    {
        title: "Upload"
    },
    {
        title: "Folder"
    },
    {
        title: "Profile"
    },
    {
        title: "Settings"
    },
    {
        title: "Signout"
    },
];
export {
    Profile_Menu,
    Below_Buttons,
    NavigationPages
  };