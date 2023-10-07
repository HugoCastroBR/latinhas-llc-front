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
import { SetEditDialogOpen, SetLatinhasAddOpen } from '@/app/store/actions';
import { Box, Typography, withStyles } from '@mui/material';
import LatinhasTable from '../LatinhasTable';
import AddButton from '../addButton';


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


const EditDialog = () => {

  const { states, dispatch} = useStore();


  React.useEffect(() => {
    setOpen(states.Demandas.editDialogOpen)
  }, [states.Demandas.editDialogOpen])
  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    dispatch(SetEditDialogOpen(true))
  };

  const handleClose = () => {
    dispatch(SetEditDialogOpen(false))
  };

  const handleSave = () => {
    dispatch(SetEditDialogOpen(false))
  }

  const handleNewLatinha = () => {
    dispatch(SetLatinhasAddOpen(true))  
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
            EDITAR DEMANDAS
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Box>
              <Typography
                sx={{
                  marginTop: '10px',
                  color: 'darkorange',
                  fontWeight: 'bold',
                }}
              >
                Semana X
              </Typography>
              <Typography
                sx={{
                  marginLeft: '10px',
                }}
              >
                23/09/2021 - 30/09/2021
              </Typography>
            </Box>
            <Box>
              <AddButton 
                onClick={handleNewLatinha}
              />
            </Box>
          </Box>
          <LatinhasTable/>
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

export default EditDialog;