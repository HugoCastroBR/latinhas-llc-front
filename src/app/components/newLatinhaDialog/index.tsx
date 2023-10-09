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
import useStore from '../../hooks/useStore';
import { SetLatinhasAddOpen, SetNewDialogOpen } from '../../store/actions';
import { Typography, withStyles } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import LatinhaForm from '../latinhaForm';
import { Alert } from '@mui/material';
import { createLatinha } from '../../api';

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
  Sku: Yup.number().min(0, "O Sku deve ser mair ou igual a 0").required("Campo Obrigatorio"),
  descricao: Yup.string().required("Campo Obrigatorio"),
  TotalPlan: Yup.number().min(1, "O Total Planejado deve ser maior que 0")
    .required("Campo Obrigatorio"),
})





const NewLatinha = () => {

  const { states, dispatch } = useStore();
  const [demandId, setDemandId] = React
    .useState<number>(states.Demandas.editingDemanda.id)

  React.useEffect(() => {
    setDemandId(states.Demandas.editingDemanda.id)
    reset()
  }, [states.Demandas.editingDemanda])

  React.useEffect(() => {
    setOpen(states.Latinhas.newDialogOpen)
    reset()
  }, [states.Latinhas.newDialogOpen])

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    dispatch(SetLatinhasAddOpen(false))
  };

  interface latinhaInputProps {
    Sku: number;
    descricao: string;
    TotalPlan: number;
  }

  const { register, handleSubmit, formState, reset } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  })

  React.useEffect(() => {
    reset()
  }, [])
  const handleSave = (data: latinhaInputProps) => {
    createLatinha(demandId, data)
    dispatch(SetLatinhasAddOpen(false))
  }

  const { errors, isSubmitting, isValid } = formState

  const onSubmit = (data: latinhaInputProps) => {
    if (isValid) {
      handleSave(data)
    }
  }

  const handlerErrorMsg = (field: string) => {
    switch (field) {
      case 'totalPlan':
        return 'Total Planejado é Obrigatorio e deve ter valor maior que 0'
      case 'descricao':
        return 'Descrição é Obrigatorio'
      case 'Sku':
        return 'Sku é Obrigatorio e deve ter valor maior ou igual a 0'
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
          CRIAR LATINHA
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
        <LatinhaForm
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
    </Dialog>
  );
}

export default NewLatinha;