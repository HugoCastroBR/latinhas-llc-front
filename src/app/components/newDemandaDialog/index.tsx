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
import { Alert, Typography, withStyles } from '@mui/material';
import DemandaForm from '../demandaForm';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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

const schema = Yup.object().shape({
  DataInicio: Yup.date().required("Campo Obrigatorio"),
  dataFim: Yup.date().required("Campo Obrigatorio"),
  totalPlan: Yup.number().min(1,"O Total Planejado deve ser maior que 0")
  .required("Campo Obrigatorio"),
  totalProd: Yup.number().min(0,"O Total Produzido deve ser maior ou igual a 0")
  .required("Campo Obrigatorio"),
})


const NewDemanda = () => {

  const { states, dispatch } = useStore();


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


  interface demandaInputProps {
    DataInicio: Date;
    dataFim: Date;
    totalPlan: number;
    totalProd: number;
  }



  const { register, handleSubmit,formState,reset } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  })

  const handleSave = (data:demandaInputProps) => {
    console.log("Salvar")
    reset()
    // dispatch(SetNewDialogOpen(false))
  }

  const { errors, isSubmitting,isValid } = formState
  

  const onSubmit = (data: demandaInputProps) => {
    console.log('data')
    console.log(data)
    if(isValid){
      handleSave(data)
    }
  }
  

  const handlerErrorMsg = (field:string) => {
    switch (field) {
      case 'DataInicio':
        return 'Data Inicial é Obrigatorio'
      case 'dataFim':
        return 'Data Final é Obrigatorio'
      case 'totalPlan':
        return 'Total Planejado é Obrigatorio e deve ter valor maior que 0'
      case 'totalProd':
        return 'Total Produzido é Obrigatorio e deve ter valor maior ou igual a 0'
      default:
        return ''
    }
  }



  
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      PaperProps={{
        sx: {
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
      {Object.keys(errors).length > 0 && (
        <Alert severity="error" sx={{ width: '100%' }}>
          {handlerErrorMsg(Object.keys(errors)[0])}
        </Alert>
      )}

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
      <form>
        <DialogContent>
          <DemandaForm
            register={register}
          />
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
          {!isValid
          ? 
          <Button
          onClick={handleSubmit(onSubmit)}
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
          :
          <Button
              onClick={handleSubmit(onSubmit)}
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
        }
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default NewDemanda;