import { Box, Button, Typography } from "@mui/material";
import React from "react";
import DemandasTable from "../demandasTable";

const DemandasBody = () => {
  return (
    <Box>
      <Box
      >
        <Typography variant="h5" color="black" fontWeight="bold" align="left">
          {'DEMANDAS DE PRODUÇÃO DE LATINHAS'}
        </Typography>
        <Button
          sx={{
            marginTop: '10px',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            bgcolor: 'darkorange',
            color: 'white',
            width: '120px',
            height: '40px',
          }}
        >
          <Typography variant="body2"
            sx={{
              fontWeight: 'bold',
              fontSize: '20px',
            }}
          >
            +
          </Typography>
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: '12px',
              marginTop: '2px',
            }}
          >
            Adicionar
          </Typography>
        </Button>
      </Box>
      <DemandasTable />
    </Box>
  )
}

export default DemandasBody;