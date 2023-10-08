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
import { SetEditDialogOpen, SetLatinhasAddOpen, SetMaxProd } from '@/app/store/actions';
import { Alert, Box, Input, InputLabel, Typography, withStyles } from '@mui/material';
import AddButton from '../addButton';
import { Demanda } from '@/app/types/demandas';
import calcWeek from './../../utils/calcSemana';
import convertDatesToPeriod from '@/app/utils/convertDatesToPeriod';
import { updateTotalProd } from '@/app/api';
import LatinhasTable from '@/app/components/latinhasTable';


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

  const { states, dispatch } = useStore();

  const [currentDemanda, setCurrentDemanda] = React.useState<Demanda>(states.Demandas.editingDemanda)
  const [periodo, setPeriodo] = React.useState<string>('')
  const [totalProd, setTotalProd] = React.useState<number>(currentDemanda.totalProd)



  React.useEffect(() => {
    setPeriodo(convertDatesToPeriod({
      dataInicio: currentDemanda.dataInicio,
      dataFim: currentDemanda.dataFim
    }))
    setCurrentDemanda(states.Demandas.editingDemanda)
    setTotalProd(states.Demandas.editingDemanda.totalProd)
  }, [currentDemanda.dataFim, currentDemanda.dataInicio, states.Demandas.editingDemanda])



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


  const UpdateTotalProdDeDemanda = async () => {
    await updateTotalProd(currentDemanda.id, totalProd)
  }

  const handleSave = () => {
    UpdateTotalProdDeDemanda()
    dispatch(SetEditDialogOpen(false))
  }

  const handleNewLatinha = () => {
    dispatch(SetLatinhasAddOpen(true))
  }

  const [isTotalProdValid, setIsTotalProdValid] = React.useState<boolean>(true)
  const [errorMsg, setErrorMsg] = React.useState<string>('')

  const handleChangeTotalProd = (value: number) => {

    if (value >= 0) {
      if (value > currentDemanda.totalPlan) {
        setErrorMsg('Total Prod. deve ser menor ou igual ao Total Plan.')
        setIsTotalProdValid(false)
        return
      }
      setIsTotalProdValid(true)
      setTotalProd(value)
    } else {
      setErrorMsg('Total Prod. deve ser maior ou igual a 0')
      setIsTotalProdValid(false)
    }
  }

  React.useEffect(() => {
    handleChangeTotalProd(currentDemanda.totalProd)
  }, [currentDemanda.totalProd])

  React.useEffect(() => {
    handleChangeTotalProd(currentDemanda.totalProd)
  }, [states.Latinhas.newDialogOpen])


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      PaperProps={{
        sx: {
          width: '70vw',
          maxWidth: 'none',
        }
      }}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}

    >
      {
        !isTotalProdValid && (
          <Alert
            severity="error"
            sx={{
              width: '100%',
              marginBottom: '10px'
            }}
          >
            {errorMsg}
          </Alert>
        )
      }
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
              Semana {calcWeek(periodo)}
            </Typography>
            <Typography
              sx={{
                marginLeft: '10px',
              }}
            >
              {periodo}
            </Typography>
          </Box>
          <Box
            sx={{
              marginTop: '10px',
            }}
          >
            <InputLabel>
              Total Prod.(Tons)
            </InputLabel>
            <Input
              type="number"
              defaultValue={currentDemanda.totalProd}
              placeholder='Total Prod.(Tons)'
              onChange={(e) => {
                handleChangeTotalProd(Number(e.target.value))
              }}
            />
          </Box>
          <Box>

            <AddButton
              onClick={handleNewLatinha}
            />
          </Box>
        </Box>
        <LatinhasTable />
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
        {isTotalProdValid
          ?
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
          :
          <Button
            onClick={handleSave}
            sx={{
              backgroundColor: 'gray',
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
        }

      </DialogActions>
    </Dialog>
  );
}

export default EditDialog;