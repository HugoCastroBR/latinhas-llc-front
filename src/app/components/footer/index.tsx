import { BottomNavigation, BottomNavigationAction, Box, Typography } from "@mui/material";
import React from "react";


const Footer = () => {
  return (
    <BottomNavigation
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'ThreeDDarkShadow',
      }}
    >
      <Box>
        <Typography variant="body2" color="darkorange" align="center">
          {'© SMI - Engenharia '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    </BottomNavigation>
  )
}

export default Footer;