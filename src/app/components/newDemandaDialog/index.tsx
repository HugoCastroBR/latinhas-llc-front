'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import useStore from '@/app/hooks/useStore';
import { SetNewDialogOpen } from '@/app/store/actions';
import { Typography, withStyles } from '@mui/material';


function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper 
      {...props} 
      />
    </Draggable>
  );
}


const NewDemanda = () => {

  const { states, dispatch} = useStore();


  React.useEffect(() => {
    setOpen(states.Demandas.newDialogOpen)
  }, [states.Demandas.newDialogOpen])
  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    dispatch(SetNewDialogOpen(true))
  };

  const handleClose = () => {
    dispatch(SetNewDialogOpen(false))
  };

  const handleSave = () => {
    dispatch(SetNewDialogOpen(false))
  }


  return (
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        PaperProps={{
          sx:{
            width: '60vw',
            maxWidth: 'none',
          }
        }}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        
      >
        <DialogTitle 
          style={{ cursor: 'move' }}
          id="draggable-dialog-title"
          sx={{
            backgroundColor: 'ThreeDDarkShadow',
            height: '30px',
            display: 'flex',
            padding: '2px',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          >
          <Typography
            sx={{
              color: 'darkorange',
              fontWeight: 'bold',
              marginLeft: '10px',
            }}
          >
            CRIAR DEMANDA
          </Typography>
          <Button 
          onClick={handleClose}
          sx={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '20px',
            
          }}
          >
            X
          </Button>
        </DialogTitle>
        <DialogContent>
          AQUI VAI O FORMULARIO !!
        </DialogContent>
        <DialogActions>
          <Button 
          onClick={handleClose}
          sx={{
            backgroundColor: 'red',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
            width: '120px',
            margin: '5px'
          }}
          >
            Cancelar
          </Button>
          <Button 
          onClick={handleSave}
          sx={{
            backgroundColor: 'green',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
            width: '120px',
            margin: '5px'
          }}
          >
            Salvar
            </Button>
        </DialogActions>
      </Dialog>
  );
}

export default NewDemanda;