
'use client'

import { Box, Button, Typography } from "@mui/material";
import React from "react";
import DemandasTable from "../demandasTable";
import useStore from "@/app/hooks/useStore";
import { SetNewDialogOpen } from "@/app/store/actions";
import AddButton from "../addButton";

const DemandasBody = () => {

  const { states, dispatch } = useStore();

  const handleClickOpen = () => {
    
    dispatch(SetNewDialogOpen(true))
  }

  return (
    <Box width={'80%'}>
      <Box>
        <Typography variant="h5" color="black" fontWeight="bold" align="left">
          {'DEMANDAS DE PRODUÇÃO DE LATINHAS'}
        </Typography>
        <AddButton onClick={handleClickOpen} />
      </Box>
      <DemandasTable />
    </Box>
  )
}

export default DemandasBody;