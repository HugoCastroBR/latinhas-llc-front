import { Box } from "@mui/material";
import React from "react";
import DemandasBody from "../demandasBody";

const Body = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        bgcolor: 'lightgray',
        width: '100%',
        height: '100vh',
        paddingTop: '40px',
      }}
    >
      <DemandasBody />
    </Box>
  )
}

export default Body;