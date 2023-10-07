import { Button, Typography } from "@mui/material";
import React from "react";

interface AddButtonProps {
  onClick: () => void;
}
const AddButton = ({ onClick }: AddButtonProps) => {
  return (
    <Button
      onClick={onClick}
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
  )
};

export default AddButton;