import { Avatar, IconButton } from '@mui/material';
import React from 'react';

const ProfileImage = ({image}) => {
  return (

        <IconButton><Avatar src={image} 
        alt="Profile" style={{margin: 7 ,height: 70,width:70}}/></IconButton>

  );
}

export default ProfileImage;

