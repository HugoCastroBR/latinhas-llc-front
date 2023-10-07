import { Box } from "@mui/material";
import React from "react";
import DemandasBody from "../demandasBody";
import EditDialog from "../editarDialog";
import NewDemanda from "../newDemandaDialog";
import NewLatinha from "../newLatinhaDialog";

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
      <NewLatinha />
      <EditDialog />
      <NewDemanda />
      <DemandasBody />
    </Box>
  )
}

export default Body;